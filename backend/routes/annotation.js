'use strict'

const express = require('express');
const AnnotationController = require('../controllers/annotation');
const router = express.Router();

router.post('/saveAnnotation', AnnotationController.saveAnnotation);
router.get('/annotation/:id', AnnotationController.getAnnotation);
router.get('/annotations', AnnotationController.getAnnotations);
router.put('/annotation/:id', AnnotationController.updateAnnotation);
router.delete('/annotation/:id', AnnotationController.deleteAnnotation);

module.exports = router;