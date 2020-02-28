'use strict'

const express = require('express');
const BalanceController = require('../controllers/balance');
const router = express.Router();

router.post('/saveBalance', BalanceController.saveBalance);
router.get('/balance/:id', BalanceController.getBalance);
router.get('/balances', BalanceController.getBalances);
router.put('/balance/:id', BalanceController.updateBalance);
router.delete('/balance/:id', BalanceController.deleteBalance);

module.exports = router;
