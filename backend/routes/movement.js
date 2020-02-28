'use strict'

const express = require('express');
const MovementController = require('../controllers/movement');
const router = express.Router();

router.post('/saveMovement', MovementController.saveMovement);
router.get('/movement/:id', MovementController.getMovement);
router.get('/movements', MovementController.getMovements);
router.put('/movement/:id', MovementController.updateMovement);
router.delete('/movement/:id', MovementController.deleteMovement);

module.exports = router;