import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from "mongoose"
import { createHttpError } from "../helpers/httpError"
import { HttpCodes } from "../constants"

export const isValidId = (req: Request, res: Response, next: NextFunction):void =>{
    const {id} = req.params
    if(!isValidObjectId(id)){
        next(createHttpError(HttpCodes.BAD_REQUEST, `this id :${id} is not valid`))
        return;
    }
    next()
}
