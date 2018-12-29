'use strict'

const express = require('express');
const multiparty = require('connect-multiparty');

const ProjectController = require('../controllers/project');

const router = express.Router();

router.post('/save', ProjectController.saveProject);
router.get('/get/:id?', ProjectController.getProject);
router.get('/get-all', ProjectController.getAllProjects);
router.put('/update/:id', ProjectController.updateProject);
router.delete('/delete/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', multiparty({ uploadDir: './uploads' }), ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);

module.exports = router;
