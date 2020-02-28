'use strict'

const express = require('express');
const TransferController = require('../controllers/transfer');
const router = express.Router();

router.post('/saveTransfer', TransferController.saveTransfer);
router.get('/transfer/:id', TransferController.getTransfer);
router.get('/transfers', TransferController.getTransfers);
router.put('/transfer/:id', TransferController.updateTransfer);
router.delete('/transfer/:id', TransferController.deleteTransfer);

module.exports = router;
