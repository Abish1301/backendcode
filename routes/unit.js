const express = require('express');
const router = express.Router();
const { Unit } = require('../models');
const crudController = require('../controllers/crudController');
const { unitAttributes } = require('../utils');

const searchableFields = ['name','code'];
const field = ['code'];

router.route('/')
  .post(crudController.getAllByCondition(Unit, searchableFields, unitAttributes))
  .put(crudController.updateByID(Unit,field, unitAttributes))
  .delete(crudController.deleteRecord(Unit));

router.post("/createUnit", crudController.createWODuplicates(Unit, field, unitAttributes));

module.exports = router;
