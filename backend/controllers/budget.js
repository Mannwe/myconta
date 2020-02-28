'use strict'

const Budget = require('../models/budget');

const controller = {
	saveBudget: (req, res) => {
		const budget = new Budget();
		budget.year = req.body.year;
		budget.month = req.body.month;
		budget.amount = req.body.amount;

		budget.save((err, budgetStored) => {
			if(err) return res.status(500).send({message: 'Error al guardar la previsión'});
			if(!budgetStored) return res.status(404).send({message: 'No se ha podido guardar el registro'});

			return res.status(200).send({budget: budgetStored});
		});
	},

	getBudget: (req, res) => {
		const budgetId = req.params.id;

		Budget.findById(budgetId, (err, budget) => {
			if(err) return res.status(500).send({message: 'Error al recuperar la previsión'});
			if(!budget) return res.status(404).send({message: 'No existe la previsión'});

			return res.status(200).send({budget});
		});
	},

	getBudgets: (req, res) => {
		let filter = {};
		if(req.query.year != null) filter.year = req.query.year;
		if(req.query.month != null) filter.month = req.query.month;
		if(req.query.amount != null) filter.amount = req.query.amount;

		Budget.find(filter).exec((err, budgets) => {
			if(err) return res.status(500).send({message: 'Error al recuperar las previsiones'});
			if(!budgets) return res.status(404).send({message: 'No hay previsiones para mostrar'});

			return res.status(200).send({budgets});
		});
	},

	updateBudget: (req, res) => {
		const budgetId = req.params.id;
		const update = req.body;

		Budget.findByIdAndUpdate(budgetId, update, {new: true}, (err, budgetUpdated) => {
			if(err) return res.status(500).send({message: 'Error al actualizar la previsión'});
			if(!budgetUpdated) return res.status(404).send({message: 'No existe la previsión'});

			return res.status(200).send({budget: budgetUpdated});
		});
	},

	deleteBudget: (req, res) => {
		const budgetId = req.params.id;

		Budget.findByIdAndRemove(budgetId, (err, budgetRemoved) => {
			if(err) return res.status(500).send({message: 'Error al eliminar la previsión'});
			if(!budgetRemoved) return res.status(404).send({message: 'No existe la previsión'});

			return res.status(200).send({budget: budgetRemoved});
		});
	}

}

module.exports = controller;