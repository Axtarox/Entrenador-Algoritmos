const express = require('express');
const router = express.Router();
const moduleDetailController = require('../controllers/moduleDetail');

router.get('/:id', moduleDetailController.getModuleDetailById);

module.exports = router;
