import { Request, Response } from 'express';
import { cardsService } from "../service"
import { createHttpError } from "../helpers/httpError";
import { HttpCodes } from "../constants";

const getById = async (req: Request, res: Response) => {
    const { id } = req.params
      const result = await cardsService.getCardById(id)
      if(!result) throw createHttpError(HttpCodes.NOT_FOUND, `Not found card id: ${id}`)
        res.json({
          status: 'success',
          code: HttpCodes.OK,
          data: { card: result },
        })
  }
  
  const create = async (req: Request, res: Response) => {
    const { title, description, column, boardId } = req.body

      const result = await cardsService.createCard({ title, description, column, boardId })
  
      res.status(HttpCodes.CREATED).json({
        status: 'success',
        code: HttpCodes.CREATED,
        data: { card: result },
      })
  }
  
  const remove = async (req: Request, res: Response) => {
    const { id } = req.params

      const result = await cardsService.removeCard(id)
      if(!result) throw createHttpError(HttpCodes.NOT_FOUND, `Not found card id: ${id}`)
        res.json({
          status: 'success',
          code: HttpCodes.OK,
          data: { card: result },
        })
  }
  
  const update = async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, description } = req.body;
      const result =  await cardsService.updateCard(id, { title, description })
      if(!result) throw createHttpError(HttpCodes.NOT_FOUND, `Not found card id: ${id}`)
        res.json({
          status: 'success',
          code: HttpCodes.OK,
          data: { card: result },
        })
  }
  
  const updateStatus = async (req: Request, res: Response) => {
    const { boardId, cardId } = req.params;
    const { newStatus } = req.body;
  
    if (!['To Do', 'In Progress', 'Done'].includes(newStatus)) {
      throw createHttpError(HttpCodes.BAD_REQUEST, `Invalid status: ${newStatus}`);
    }
  
    const result = await cardsService.updateCardStatus(boardId, cardId, newStatus);
    res.json({
      status: 'success',
      code: HttpCodes.OK,
      data: result,
    });
  }
  
  

  export { getById, create, remove, update, updateStatus }
  