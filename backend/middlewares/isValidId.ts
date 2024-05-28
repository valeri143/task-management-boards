import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from "mongoose"
import { createHttpError } from "../helpers/httpError"
import { HttpCodes } from "../constants"

export const isValidId = (req: Request, res: Response, next: NextFunction):void =>{
    const {id, boardId, cardId} = req.params
    if(id && !isValidObjectId(id)){
        next(createHttpError(HttpCodes.BAD_REQUEST, `this id :${id} is not valid`))
        return;
    }

    if(boardId &&!isValidObjectId(boardId)){
        next(createHttpError(HttpCodes.BAD_REQUEST, `this id :${boardId} is not valid`))
        return;
    }

    if(cardId && !isValidObjectId(cardId)){
        next(createHttpError(HttpCodes.BAD_REQUEST, `this id :${cardId} is not valid`))
        return;
    }
    
    next()
}
