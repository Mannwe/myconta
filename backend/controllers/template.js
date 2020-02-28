'use strict'

const Template = require('../models/template');

const controller = {
	saveTemplate: (req, res) => {
		const template = new Template();
		template.subaccountId = req.body.subaccountId;
		template.amount = req.body.amount;

		//return res.status(200).send(template);

		template.save((err, templateStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar la plantilla'});
			if(!templateStored) return res.status(404).send({message: 'No se ha podido guardar el registro'});

			return res.status(200).send({template: templateStored});
		});
	},

	getTemplate: (req, res) => {
		const templateId = req.params.id;

		Template.findById(templateId, (err, template) => {
			if(err) return res.status(500).send({message: 'Error al recuperar la plantilla'});
			if(!template) return res.status(404).send({message: 'No existe la plantilla'});

			return res.status(200).send({template});
		});
	},

	getTemplates: (req, res) => {
		let filter = {};
		if(req.query.subaccountId != null) filter.subaccountId = req.query.subaccountId;
		if(req.query.amount != null) filter.amount = req.query.amount;

		Template.find(filter).exec((err, templates) => {
			if(err) return res.status(500).send({message: 'Error al recuperar las plantillas'});
			if(!templates) return res.status(404).send({message: 'No hay plantillas para mostrar'});

			return res.status(200).send({templates});
		});
	},

	updateTemplate: (req, res) => {
		const templateId = req.params.id;
		const update = req.body;
        
		//return res.status(200).send(req.body);

		Template.findByIdAndUpdate(templateId, update, {new: true}, (err, templateUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar la plantilla'});
			if(!templateUpdated) return res.status(404).send({message: 'No existe la plantilla'});

			return res.status(200).send({template: templateUpdated});
		});
	},

	deleteTemplate: (req, res) => {
		const templateId = req.params.id;

		Template.findByIdAndRemove(templateId, (err, templateRemoved) => {
			if(err) return res.status(500).send({message: 'Error al eliminar la plantilla'});
			if(!templateRemoved) return res.status(404).send({message: 'No existe la plantilla'});

			return res.status(200).send({template: templateRemoved});
		});
	}
}

module.exports = controller;