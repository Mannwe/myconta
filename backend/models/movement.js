'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MovementSchema = Schema({
	accountId: String,
	subaccountId: String,
	year: Number,
	month: Number,
	movementDate: String,
	description: String,
	type: String, 			/* I = Saldo Inicial, M = Modificación, C = Cierre */
	amount: Number,
});

module.exports = mongoose.model('Movement', MovementSchema); // Genera una colección llamada movements

