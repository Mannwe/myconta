'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BudgetSchema = Schema({
	year: Number,
	month: Number,
	amount: Number
});

module.exports = mongoose.model('Budget', BudgetSchema); // Genera una colección llamada budgets