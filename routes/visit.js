const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router()
const visitController = require('../controllers/visit');

// Get
router.get('/', visitController.getAll)

// Get One
router.get('/:id', auth(), visitController.getOne)

// Register
router.post('/', auth(), visitController.add)

// Update
router.put('/:id', auth(), visitController.update)

// Delete
router.delete('/:id', auth(), visitController.deleteVisit)

module.exports = router
