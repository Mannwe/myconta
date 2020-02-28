'use strict'

const express = require('express');
const TemplateController = require('../controllers/template');
const router = express.Router();

router.post('/saveTemplate', TemplateController.saveTemplate);
router.get('/template/:id', TemplateController.getTemplate);
router.get('/templates', TemplateController.getTemplates);
router.put('/template/:id', TemplateController.updateTemplate);
router.delete('/template/:id', TemplateController.deleteTemplate);

module.exports = router;