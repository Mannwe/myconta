'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TransferSchema = Schema({
	originAccountId: String,
	destAccountId: String,
	year: Number,
	month: Number,
	amount: Number
});

module.exports = mongoose.model('Transfer', TransferSchema); // Genera una colección llamada transfers