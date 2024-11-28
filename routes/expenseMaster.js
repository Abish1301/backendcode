const express = require('express');
const router = express.Router();
const { Expense } = require('../models');
const crudController = require('../controllers/crudController');
const { expenseMasterAttributes } = require('../utils');

const searchableFields = ['name'];
const field = [];

router.route('/')
  .post(crudController.getAllByCondition(Expense, searchableFields, expenseMasterAttributes))
  .put(crudController.updateByID(Expense,field, expenseMasterAttributes))
  .delete(crudController.deleteRecord(Expense));

router.post("/create", crudController.createWODuplicates(Expense, field, expenseMasterAttributes));

module.exports = router;
