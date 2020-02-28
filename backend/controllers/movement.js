'use strict'

const Movement = require('../models/movement');

const controller = {

	saveMovement: (req, res) => {
		let movement = new Movement();
		movement.accountId = req.body.accountId;
		movement.subaccountId = req.body.subaccountId;
		movement.year = req.body.year;
		movement.month = req.body.month;
		movement.description = req.body.description;
		movement.type = req.body.type;
		movement.state = req.body.state;
		movement.amount = req.body.amount;

		// Añadimos la fecha actual
		const today = new Date();
		const day = today.getDate();
		const monthOfToday = today.getMonth();
		const yearOfToday = today.getFullYear()
		
		movement.movementDate = (day.length == 1 ? '0' + day : day) + '-' +
					    (monthOfToday < 9 ? '0' + monthOfToday : monthOfToday) + '-' + 
					    yearOfToday;

		movement.save((err, movementStored) => {
			if (err) return res.status(500).send({message: 'Error al guardar el movimiento'});
			if (!movementStored) return res.status(404).send({message: 'No se ha podido guardar el registro'});

			return res.status(200).send({movement: movementStored});
		});
	},

	getMovement: (req, res) => {
		const movementId = req.params.id;
		
		Movement.findById(movementId, (err, movement) => {
			if(err) return res.status(500).send({message: 'Error al recuperar el movimiento'});
			if(!movement) return res.status(404).send({message: 'El movimiento no existe'});

			return res.status(200).send({movement});
		});
	},

	getMovements: (req, res) => {
		// Parámetros del filtro
		let filter = {};
		if (req.query.accountId != null) filter.accountId = req.query.accountId;
		if (req.query.subaccountId != null) filter.subaccountId = req.query.subaccountId;
		if (req.query.year != null) filter.year = req.query.year;
		if (req.query.month != null) filter.month = req.query.month;
		if (req.query.movementDate != null) filter.movementDate = req.query.movementDate;
		if (req.query.description != null) filter.description = req.query.description;
		if (req.query.type != null) filter.type = req.query.type;
		if (req.query.state != null) filter.state = req.query.state;
		if (req.query.amount != null) filter.amount = req.query.amount;

		//return res.status(200).send(req.query);

		Movement.find(filter).exec((err, movements) => {
			if(err) return res.status(500).send({message: 'Error al recuperar los movimientos'});
			if(!movements) return res.status(404).send({message: 'No hay movimientos para mostrar'});

			return res.status(200).send({movements});
		});
	},

	updateMovement: (req, res) => {
		const movementId = req.params.id;
		const update = req.body; // Objeto a modificar

		Movement.findByIdAndUpdate(movementId, update, {new: true}, (err, movementUpdated) => {
			if (err) return res.status(500).send({message: 'Error al actualizar el movimiento'});
			if (!movementUpdated) return res.status(404).send({message: 'El movimiento no existe'});

			return res.status(200).send({movement: movementUpdated});
		});
	},

	deleteMovement: (req, res) => {
		const movementId = req.params.id;

		Movement.findByIdAndRemove(movementId, (err, movementRemoved) => {
			if (err) return res.status(500).send({message: 'Error al eliminar el movimiento'});
			if (!movementRemoved) return res.status(404).send({message: 'El movimiento no existe'});

			return res.status(200).send({movement: movementRemoved});
		});
	}
}

module.exports = controller;