const Board = require('./schemas/board')
const Card = require('./schemas/card')

// boards
const getAlltasks = async () => {
  return Board.find()
}

const getBoardById = (id) => {
  return Board.findOne({ _id: id })
}

const createTask = ({ title, text }) => {
  return Board.create({ title, text })
}

const updateTask = (id, fields) => {
  return Board.findByIdAndUpdate({ _id: id }, fields, { new: true })
}

const removeTask = (id) => {
  return Board.findByIdAndRemove({ _id: id })
}

// cards
const getCardById = (id) => {
  return Card.findOne({ _id: id })
}

module.exports = {
  getAlltasks,
  getBoardById,
  createTask,
  updateTask,
  removeTask,
  getCardById
}