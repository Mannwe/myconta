'use strict'

const Balance = require('../models/balance');

const controller = {
	saveBalance: (req, res) => {
		const balance = new Balance();
		balance.accountId = req.body.accountId;
		balance.subaccountId = req.body.subaccountId;
		balance.accountName = req.body.accountName;
		balance.subaccountName = req.body.subaccountName;
		balance.year = req.body.year;
		balance.month = req.body.month;
		balance.amount = req.body.amount;

		balance.save((err, balanceStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar el saldo'});
			if(!balanceStored) return res.status(404).send({message: 'No se ha podido guardar el registro'});

			return res.status(200).send({balance: balanceStored});
		});
	},

	getBalance: (req, res) => {
		const balanceId = req.params.id;

		Balance.findById(balanceId, (err, balance) => {
			if(err) return res.status(500).send({message: 'Error al recuperar el saldo'});
			if(!balance) return res.status(404).send({message: 'No existe el saldo'});

			return res.status(200).send({balance});
		});
	},

	getBalances: (req, res) => {
		let filter = {};
		if(req.query.accountId != null) filter.accountId = req.query.accountId;
		if(req.query.subaccountId != null) filter.subaccountId = req.query.subaccountId;
		if(req.query.accountName != null) filter.accountName = req.query.accountName;
		if(req.query.subaccountName != null) filter.subaccountName = req.query.subaccountName;
		if(req.query.year != null) filter.year = req.query.year;
		if(req.query.month != null) filter.month = req.query.month;
		if(req.query.amount != null) filter.amount = req.query.amount;

		//return res.status(200).send(req.query);

		Balance.find(filter).exec((err, balances) => {
			if(err) return res.status(500).send({message: 'Error al recuperar los saldos'});
			if(!balances) return res.status(404).send({message: 'No hay saldos para mostrar'});

			return res.status(200).send({balances});
		});
	},

	updateBalance: (req, res) => {
		const balanceId = req.params.id;
		const update = req.body; // Objeto a modificar

		Balance.findByIdAndUpdate(balanceId, update, {new: true}, (err, balanceUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar el saldo'});
			if(!balanceUpdated) return res.status(404).send({message: 'No existe la subcuenta'});

			return res.status(200).send({balance: balanceUpdated});
		});
	},

	deleteBalance: (req, res) => {
		const balanceId = req.params.id;

		Balance.findByIdAndRemove(balanceId, (err, balanceRemoved) => {
			if(err) return res.status(500).send({message: 'Error al eliminar el saldo'});
			if(!balanceRemoved) return res.status(404).send({message: 'No existe el saldo'});

			return res.status(200).send({balance: balanceRemoved});
		});
	}
}

module.exports = controller;