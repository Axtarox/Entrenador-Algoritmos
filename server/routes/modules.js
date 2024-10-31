const express = require('express');
const modulesController = require('../controllers/modules');
const router = express.Router();

router.get('/progress', modulesController.getModulesProgress);

module.exports = router;
