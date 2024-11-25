const express = require('express');
const router = express.Router();
const { Unit } = require('../models');
const crudController = require('../controllers/crudController');
const { unitAttributes } = require('../utils');

const searchableFields = ['name']; 
router.route('/')
  .post(crudController.getAllByCondition(Unit, searchableFields,unitAttributes))
  .post(crudController.create(Unit))
  .put(crudController.update(Unit))
  .delete(crudController.deleteRecord(Unit));

module.exports = router;
