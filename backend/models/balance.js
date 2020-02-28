'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BalanceSchema = Schema({
	accountId: String,
	accountName: String,
	subaccountId: String,
	subaccountName: String,
	year: Number,
	month: Number,
	amount: Number
});

module.exports = mongoose.model('Balance', BalanceSchema);