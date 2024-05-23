import express, { Router } from 'express';
import { ctrlBoard } from '../controller';
import { isValidId, tryCatch } from '../middlewares';
import { EndPoints } from '../constants';

const boardRouter: Router = express.Router()

boardRouter.get(EndPoints.root, tryCatch(ctrlBoard.get))

boardRouter.get(EndPoints.dynamicId, isValidId, tryCatch(ctrlBoard.getById))

boardRouter.post(EndPoints.root, tryCatch(ctrlBoard.create))

boardRouter.put(EndPoints.dynamicId, isValidId, tryCatch(ctrlBoard.update))

// boardRouter.patch('/boards/:id/status', ctrlBoard.updateStatus)

boardRouter.delete(EndPoints.dynamicId, isValidId, tryCatch(ctrlBoard.remove))

export default boardRouter