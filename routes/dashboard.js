const express = require('express');
const router = express.Router();
const crudController = require('../controllers/crudController');

router.route('/').post(crudController.getDashboardData())

module.exports = router;
