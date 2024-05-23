import { Request, Response } from 'express';
import { boardsService } from "../service";
import { createHttpError } from "../helpers/httpError";
import { HttpCodes } from "../constants";

const get = async (_, res: Response) => {
      const results = await boardsService.getAllBoards()
      res.json({
        status: 'success',
        code: HttpCodes.OK,
        data: {
          boards: results,
        },
      }) 
  }

  const getById = async (req: Request, res: Response) => {
      const { id } = req.params

      const result = await boardsService.getBoardById(id)
      if(!result) throw createHttpError(HttpCodes.NOT_FOUND, `Not found board id: ${id}`)
        res.json({
          status: 'success',
          code: HttpCodes.OK,
          data: { board: result },
        })
  }
  
  const create = async (req: Request, res: Response) => {
       const { name } = req.body

      const result = await boardsService.createBoard({ name })
      res.status(HttpCodes.CREATED).json({
        status: 'success',
        code: HttpCodes.CREATED,
        data: { board: result },
      })
  }
  
  const update = async (req: Request, res: Response) => {
    const { id } = req.params
    const { name } = req.body
      const result = await boardsService.updateBoard(id, { name })
      if(!result) throw createHttpError(HttpCodes.NOT_FOUND, `Not found board id: ${id}`)
        res.json({
          status: 'success',
          code: HttpCodes.OK,
          data: { board: result },
        })
  }
  
  const remove = async (req: Request, res: Response) => {
    const { id } = req.params
  
      const result = await boardsService.removeBoard(id)
      if(!result) throw createHttpError(HttpCodes.NOT_FOUND, `Not found board id: ${id}`)
        res.json({
          status: 'success',
          code: HttpCodes.OK,
          data: { board: result },
        })
  }

export { get, getById, create, update, remove }