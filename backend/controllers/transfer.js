'use strict'

const Transfer = require('../models/transfer');

const controller = {
	saveTransfer: (req, res) => {
		let transfer = new Transfer();
		transfer.originAccountId = req.body.originAccountId;
		transfer.destAccountId = req.body.destAccountId;
		transfer.year = req.body.year;
		transfer.month = req.body.month;
		transfer.amount = req.body.amount;

		transfer.save((err, transferStored) => {
			if (err) return res.status(500).send({message: 'Error al guardar la transferencia'});
			if (!transferStored) return res.status(404).send({message: 'No se ha podido guardar el registro'});

			return res.status(200).send({transfer: transferStored});
		});
	},

	getTransfer: (req, res) => {
		const transferId = req.params.id;
		
		Movement.findById(transferId, (err, transfer) => {
			if(err) return res.status(500).send({message: 'Error al recuperar la transferencia'});
			if(!transfer) return res.status(404).send({message: 'La transferencia no existe'});

			return res.status(200).send({transfer});
		});
	},

	getTransfers: (req, res) => {
		// Parámetros del filtro
		let filter = {};
		if (req.query.originAccountId != null) filter.originAccountId = req.query.originAccountId;
		if (req.query.destAccountId != null) filter.subaccountId = req.query.destAccountId;
		if (req.query.year != null) filter.year = req.query.year;
		if (req.query.month != null) filter.month = req.query.month;
		if (req.query.amount != null) filter.amount = req.query.amount;

		//return res.status(200).send(req.query);

		Transfer.find(filter).exec((err, transfers) => {
			if(err) return res.status(500).send({message: 'Error al recuperar las transferencias'});
			if(!transfers) return res.status(404).send({message: 'No hay transferencias para mostrar'});

			return res.status(200).send({transfers});
		});
	},

	updateTransfer: (req, res) => {
		const transfersId = req.params.id;
		const update = req.body; // Objeto a modificar

		Transfer.findByIdAndUpdate(transferId, update, {new: true}, (err, transferUpdated) => {
			if (err) return res.status(500).send({message: 'Error al actualizar la transferencia'});
			if (!transferUpdated) return res.status(404).send({message: 'La transferencia no existe'});

			return res.status(200).send({transfers: transferUpdated});
		});
	},

	deleteTransfer: (req, res) => {
		const transfersId = req.params.id;

		Movement.findByIdAndRemove(transfersId, (err, transferRemoved) => {
			if (err) return res.status(500).send({message: 'Error al eliminar el movimiento'});
			if (!transferRemoved) return res.status(404).send({message: 'El movimiento no existe'});

			return res.status(200).send({transfers: transferRemoved});
		});
	}
}

module.exports = controller;