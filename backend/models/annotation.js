'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AnnotationSchema = Schema({
	year: Number,
	description: String,
	remarks: String			// Observaciones adicionales
});

module.exports = mongoose.model('Annotation', AnnotationSchema); // Genera una colección llamada annotations