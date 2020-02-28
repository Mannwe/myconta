'use strict'

const express = require('express');
const BudgetController = require('../controllers/budget');
const router = express.Router();

router.post('/saveBudget', BudgetController.saveBudget);
router.get('/budget/:id', BudgetController.getBudget);
router.get('/budgets', BudgetController.getBudgets);
router.put('/budget/:id', BudgetController.updateBudget);
router.delete('/budget/:id', BudgetController.deleteBudget);

module.exports = router;