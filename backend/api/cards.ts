import express, { Router } from 'express';
import { ctrlCard } from '../controller';
import { isValidId, tryCatch } from '../middlewares';
import { EndPoints } from '../constants';

const cardRouter: Router = express.Router()

cardRouter.get(EndPoints.dynamicId, isValidId, tryCatch(ctrlCard.getById))

cardRouter.post(EndPoints.root, tryCatch(ctrlCard.create))

cardRouter.delete(EndPoints.dynamicId, isValidId, tryCatch(ctrlCard.remove))

cardRouter.put(EndPoints.dynamicId, isValidId, tryCatch(ctrlCard.update))

export default cardRouter