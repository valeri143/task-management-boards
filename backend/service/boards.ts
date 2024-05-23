import { Types } from 'mongoose';
import Board, { IBoard } from './schemas/board';
import Card from "./schemas/card";

const getAllBoards = (): Promise<IBoard[]>  => {
    return Board.find().exec()
  }
  
  const getBoardById = (id: Types.ObjectId | string): Promise<IBoard | null> => {
    return Board.findOne({ _id: id })
  }
  
  const createBoard = ({ name }: { name: string }): Promise<IBoard> => {
    return Board.create({ name });
  }
  
  const updateBoard = (id: Types.ObjectId | string, fields: Partial<IBoard>): Promise<IBoard | null> => {
    return Board.findByIdAndUpdate({ _id: id }, fields, { new: true })
  }
  
  const removeBoard = async (id: Types.ObjectId | string): Promise<IBoard | null> => {
    await Card.deleteMany({ boardId: id })
    return Board.findByIdAndDelete({ _id: id })
  }

export { getAllBoards, getBoardById, createBoard, updateBoard, removeBoard }