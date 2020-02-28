'use strict'

const express = require('express');
const SubaccountController = require('../controllers/subaccount');
const router = express.Router();

router.post('/saveSubaccount', SubaccountController.saveSubaccount);
router.get('/subaccount/:id', SubaccountController.getSubaccount);
router.get('/subaccounts', SubaccountController.getSubaccounts);
router.put('/subaccount/:id', SubaccountController.updateSubaccount);
router.delete('/subaccount/:id', SubaccountController.deleteSubaccount);

module.exports = router;