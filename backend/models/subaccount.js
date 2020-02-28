'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SubaccountSchema = Schema({
	accountId: String,
	accountName: String,
	name: String,
	type: String, 		// Ingreso - Gasto
});

module.exports = mongoose.model('Subaccount', SubaccountSchema); // Genera una colección llamada subaccounts