const Board = require('./schemas/board')
const Card = require('./schemas/card')

// boards
const getAlltasks = async () => {
  return Board.find()
}

const getBoardById = (id) => {
  return Board.findOne({ _id: id })
}

const createBoard = ({ name }) => {
  return Board.create({ name })
}

const updateBoard = (id, fields) => {
  return Board.findByIdAndUpdate({ _id: id }, fields, { new: true })
}

const removeBoard = (id) => {
  return Board.findByIdAndDelete({ _id: id })
}

// cards
const getCardById = (id) => {
  return Card.findOne({ _id: id })
}

const createCard = async({ title, description, column, boardId }) => {
  const newCard = await Card.create({ title, description, column, boardId })

  await Board.updateOne({ _id: boardId }, { $push: { ToDo: newCard._id } });

  return newCard;
}

const removeCard = async (id: string) => {
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

const updateCard = (id: string,  updateData: { title: string; description: string }) => {
  return Card.findByIdAndUpdate(id, updateData, { new: true })
}

module.exports = {
  getAlltasks,
  getBoardById,
  createBoard,
  updateBoard,
  removeBoard,
  getCardById,
  createCard,
  removeCard,
  updateCard
}