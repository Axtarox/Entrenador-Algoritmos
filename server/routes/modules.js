const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/modules');

router.get('/:nivel', moduleController.getModulesByLevel);

module.exports = router;
