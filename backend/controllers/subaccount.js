'use strict'

// Cargamos el modelo
const Subaccount = require('../models/subaccount');

const controller = {
	saveSubaccount: (req, res) => {
		const subaccount = new Subaccount();
		subaccount.accountId = req.body.accountId;
		subaccount.accountName = req.body.accountName;
		subaccount.name = req.body.name;
		subaccount.type = req.body.type;

		subaccount.save((err, subaccountStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar la subcuenta'});
			if(!subaccountStored) return res.status(404).send({message: 'No se ha podido guardar el registro'})

			return res.status(200).send({subaccount: subaccountStored});
		});
	},

	getSubaccount: (req, res) => {
		const subaccountId = req.params.id;

		Subaccount.findById(subaccountId, (err, subaccount) => {
			if (err) return res.status(500).send({message: 'Error al recuperar la subcuenta'});
			if (!subaccount) return res.status(404).send({message: 'No existe la subcuenta'});

			return res.status(200).send({subaccount});
		});
	},

	getSubaccounts: (req, res) => {
		let filter = {};
		if(req.query.accountId != null) filter.accountId = req.query.accountId;
		if(req.query.accountName != null) filter.accountName = req.query.accountName;
		if(req.query.name != null) filter.name = req.query.name;
		if(req.query.type != null) filter.type = req.query.type;

		Subaccount.find(filter).exec((err, subaccounts) => {
			if(err) return res.status(500).send({message: 'Error al recuperar las subcuentas'});
			if(!subaccounts) return res.status(404).send({message: 'No hay subcuentas para mostrar'});

			return res.status(200).send({subaccounts});
		});
	},

	updateSubaccount: (req, res) => {
		const subaccountId = req.params.id;
		const update = req.body; // Objeto a modificar

		Subaccount.findByIdAndUpdate(subaccountId, update, {new: true}, (err, subaccountUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar la subcuenta'});
			if(!subaccountUpdated) return res.status(404).send({message: 'No existe la subcuenta'});

			return res.status(200).send({subaccount: subaccountUpdated});
		});
	},

	deleteSubaccount: (req, res) => {
		const subaccountId = req.params.id;

		Subaccount.findByIdAndRemove(subaccountId, (err, subaccountRemoved) => {
			if(err) return res.status(500).send({message: 'Error al eliminar la subcuenta'});
			if(!subaccountRemoved) return res.status(404).send({message: 'No existe la subcuenta a eliminar'});

			return res.status(200).send({subaccount: subaccountRemoved});
		});
	}
}

module.exports = controller;