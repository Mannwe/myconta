'use strict'

// Cargamos el modelo
const Account = require('../models/account');

const controller = {
	saveAccount: (req, res) => {
		let account = new Account();
		account.name = req.body.name;
		account.initialAmount = req.body.initialAmount;

		account.save((err, accountStored) =>{
			if(err) return res.status(500).send({message: 'Error al guardar la cuenta' });
			if(!accountStored) return res.status(404).send({message: 'No se ha podido guardar el registro'});

			return res.status(200).send({account: accountStored});
		});
	},

	getAccount: (req, res) =>{
		const accountId = req.params.id;

		Account.findById(accountId, (err, account) =>{
			if(err) return res.status(500).send({message: 'Error al recuperar la cuenta'});
			if(!account) return res.status(404).send({message: 'La cuenta no existe'});

			return res.status(200).send({account});
		});
	},

	getAccounts: (req, res) => {
		// Parámetros del filtro
		const name = req.query.name;

		Account.find(name).exec((err, accounts) => {
			if(err) return res.status(500).send({message: 'Error al recuperar las cuentas'});
			if(!accounts) return res.status(404).send({message: 'No hay cuentas para mostrar'});

			return res.status(200).send({accounts});
		});
	},

	updateAccount: (req, res) => {
		const accountId = req.params.id;
		const update = req.body; // Objeto a modificar

		Account.findByIdAndUpdate(accountId, update, {new: true}, (err, accountUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar la cuenta'});
			if(!accountUpdated) return res.status(404).send({message: 'No existe la cuenta a actualizar'});

			return res.status(200).send({account: accountUpdated});
		});
	},

	deleteAccount: (req, res) => {
		const accountId = req.params.id;

		Account.findByIdAndRemove(accountId, (err, accountRemoved) => {
			if(err) return res.status(500).send({message: 'Error al eliminar la cuenta'});
			if(!accountRemoved) return res.status(404).send({message: 'No existe la cuenta a eliminar'});

			return res.status(200).send({account: accountRemoved});
		});
	}

}

module.exports = controller;