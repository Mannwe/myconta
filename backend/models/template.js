'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TemplateSchema = Schema({
	subaccountId: String,
	amount: Number
});

module.exports = mongoose.model('Template', TemplateSchema); // Genera una colección llamada templates