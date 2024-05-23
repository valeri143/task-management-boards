import { Types } from 'mongoose';
import Card, { ICard } from "./schemas/card";
import Board, { IBoard } from './schemas/board';

const getCardById = (id: Types.ObjectId | string): Promise<ICard | null> => {
    return Card.findOne({ _id: id })
  }
  
  const createCard = async ({ title, description, column, boardId }: { title: string, description: string, column: string, boardId: string }): Promise<ICard> => {
    const newCard = await Card.create({ title, description, column, boardId })
  
    await Board.updateOne({ _id: boardId }, { $push: { ToDo: newCard._id } });
  
    return newCard;
  }
  
  const removeCard = async (id: Types.ObjectId | string): Promise<ICard | null> => {
    const card = await Card.findByIdAndDelete(id);
    if (!card) {
      throw new Error(`Card with id ${id} not found`);
    }
    
    if (card) {
      let updateField: string;
      if (card.column === 'To Do') {
        updateField = 'ToDo';
      } else if (card.column === 'In Progress') {
        updateField = 'InProgress';
      } else if (card.column === 'Done') {
        updateField = 'Done';
      } else {
        throw new Error('Invalid column');
      }
      await Board.updateOne({ [updateField]: id }, { $pull: { [updateField]: id } });
    }
  
    return card;
  }
  
  const updateCard = (id: Types.ObjectId | string, updateData: Partial<Omit<ICard, '_id'>>): Promise<ICard | null> => {
    return Card.findByIdAndUpdate(id, updateData, { new: true })
  }
  

  export { getCardById, createCard, removeCard, updateCard }