import { Types } from 'mongoose';
import Card, { ICard } from "./schemas/card";
import Board from './schemas/board';

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
  
  export const updateCardStatus = async (boardId: string, cardId: Types.ObjectId | string, newStatus: 'To Do' | 'In Progress' | 'Done') => {

      const card = await Card.findByIdAndUpdate(cardId, { column: newStatus }, { new: true });
      if (!card) {
        throw new Error('Card not found');
      }
      const board = await Board.findById(boardId)
      if (!board) {
        throw new Error('Board not found');
      }

      const cardObjectId = new Types.ObjectId(cardId);

      board.ToDo = board.ToDo.filter(id => !id.equals(cardObjectId));
      board.InProgress = board.InProgress.filter(id => !id.equals(cardObjectId));
      board.Done = board.Done.filter(id => !id.equals(cardObjectId));
  
      if (newStatus === 'To Do') {
        board.ToDo.push(cardObjectId);
      } else if (newStatus === 'In Progress') {
        board.InProgress.push(cardObjectId);
      } else if (newStatus === 'Done') {
        board.Done.push(cardObjectId);
      }

      await board.save();
  
      return {card, board };
  };
  

  export { getCardById, createCard, removeCard, updateCard }