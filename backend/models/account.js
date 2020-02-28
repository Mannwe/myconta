'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AccountSchema = Schema({
	name: String,
	initialAmount: Number
});

module.exports = mongoose.model('Account', AccountSchema); // Genera una colección llamada accounts