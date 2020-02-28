'use strict'

const Annotation = require('../models/annotation');

const controller = {
	saveAnnotation: (req, res) => {

		const annotation = new Annotation();
		annotation.year = req.body.year;
		annotation.description = req.body.description;
		annotation.remarks = req.body.remarks;

		annotation.save((err, annotationStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar la anotación'});
			if(!annotationStored) return res.status(404).send({message: 'No se ha podido guardar el registro'});

			return res.status(200).send({annotation: annotationStored});
		});
	},

	getAnnotation: (req, res) => {
		const annotationId = req.params.id;

		Annotation.findById(annotationId, (err, annotation) => {
			if(err) return res.status(500).send({message: 'Error al recuperar la anotación'});
			if(!annotation) return res.status(404).send({message: 'No existe la anotación'});

			return res.status(200).send({annotation});
		});
	},

	getAnnotations: (req, res) => {
		let filter = {};
		if(req.query.year != null) filter.year = req.query.year;
		if(req.query.description != null) filter.description = req.query.description;
		if(req.query.type != null) filter.type = req.query.type;
		if(req.query.remarks != null) filter.remarks = req.query.remarks;

		Annotation.find(filter).exec((err, annotations) => {
			if(err) return res.status(500).send({message: 'Error al recuperar las anotaciones'});
			if(!annotations) return res.status(404).send({message: 'No hay anotaciones para mostrar'});

			return res.status(200).send({annotations});
		});
	},

	updateAnnotation: (req, res) => {
		const annotationId = req.params.id;
		const update = req.body; // Objeto a modificar

		Annotation.findByIdAndUpdate(annotationId, update, {new: true}, (err, annotationUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar la anotación'});
			if(!annotationUpdated) return res.status(404).send({message: 'No existe la anotación'});

			return res.status(200).send({annotation: annotationUpdated});
		});
	},

	deleteAnnotation: (req, res) => {
		const annotationId = req.params.id;

		Annotation.findByIdAndRemove(annotationId, (err, annotationRemoved) => {
			if(err) return res.status(500).send({message: 'Error al eliminar la anotación'});
			if(!annotationRemoved) return res.status(404).send({message: 'No existe la anotación'});

			return res.status(200).send({annotation: annotationRemoved});
		});
	}
}

module.exports = controller;