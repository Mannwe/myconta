'use strict'

const express = require('express');
const AccountController = require('../controllers/account');
const router = express.Router();

router.post('/saveAccount', AccountController.saveAccount);
router.get('/account/:id', AccountController.getAccount);
router.get('/accounts', AccountController.getAccounts);
router.put('/account/:id', AccountController.updateAccount);
router.delete('/account/:id', AccountController.deleteAccount);

module.exports = router;