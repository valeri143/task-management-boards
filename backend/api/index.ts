import express from 'express';
const router = express.Router()
const ctrlBoard = require('../controller')

// boards
router.get('/boards', ctrlBoard.get)

router.get('/boards/:id', ctrlBoard.getById)

router.post('/boards', ctrlBoard.create)

router.put('/boards/:id', ctrlBoard.update)

router.patch('/boards/:id/status', ctrlBoard.updateStatus)

router.delete('/boards/:id', ctrlBoard.remove)

// cards
router.get('/cards/:id', ctrlBoard.getCardsById)

module.exports = router