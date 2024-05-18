const express = require("express");
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();


const app = express();
// app.get("/api", (req, res) => {
//   res.json({
//       message: "Hello from backend!"
//   })
// })

// parse application/json
app.use(express.json())
// cors
app.use(cors())

const routerApi = require('./api/index')
app.use('/api', routerApi)

app.use((_, res, __) => {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Use api on routes: /api/boards',
      data: 'Not found',
    })
  })
  
  app.use((err, _, res, __) => {
    console.log(err.stack)
    res.status(500).json({
      status: 'fail',
      code: 500,
      message: err.message,
      data: 'Internal Server Error',
    })
  })

const { PORT } = process.env || 3001;
const uriDB = process.env.DB_HOST

mongoose.connect(uriDB)
.then(() =>{
  console.log("Database connection successful")
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})
.catch((err) =>{
  console.log(`Server is not running. Error message: ${err.message}`),
process.exit(1)
})
