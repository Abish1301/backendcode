const express = require('express');
const router = express.Router();
const { Tax } = require('../models');
const crudController = require('../controllers/crudController');
const { taxAttributes } = require('../utils');

const searchableFields = ['name'];
const field = ['name'];

router.route('/')
  .post(crudController.getAllByCondition(Tax, searchableFields, taxAttributes))
  .put(crudController.updateByID(Tax,field, taxAttributes))
  .delete(crudController.deleteRecord(Tax));

router.post("/create", crudController.createWODuplicates(Tax, field, taxAttributes));

module.exports = router;
