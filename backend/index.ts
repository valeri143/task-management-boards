import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { boardRouter, cardRouter } from './api';
import { EndPoints, ErrorMessages, HttpCodes } from './constants';

require('dotenv').config();


const app: Application = express();

// parse application/json
app.use(express.json())
// cors
app.use(cors())

// routes
app.use(EndPoints.boards, boardRouter)
app.use(EndPoints.cards, cardRouter)

// handle 404 errors
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(HttpCodes.NOT_FOUND).json({
      status: 'error',
      code: HttpCodes.NOT_FOUND,
      message: `Use api on routes: /${EndPoints.boards} or /${EndPoints.cards}`,
      data: ErrorMessages.NOT_FOUND,
    })
  })
  
  // error handling middleware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack)
    res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({
      status: 'fail',
      code: HttpCodes.INTERNAL_SERVER_ERROR,
      message: err.message,
      data: ErrorMessages.INTERNAL_SERVER_ERROR,
    })
  })

const { PORT } = process.env || 3001;
const uriDB: string | undefined = process.env.DB_HOST

if (typeof uriDB === 'string') {
  mongoose.connect(uriDB)
      .then(() => {
          console.log("Database connection successful");
          app.listen(PORT, () => {
              console.log(`Server is running on port ${PORT}`);
          });
      })
      .catch((err) => {
          console.log(`Server is not running. Error message: ${err.message}`);
          process.exit(1);
      });
} else {
  console.log("URI DB is not defined");
  process.exit(1);
}

