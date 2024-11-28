const express = require('express');
const router = express.Router();
const { ExpenseHead } = require('../models');
const crudController = require('../controllers/crudController');
const { expenseHeadAttributes } = require('../utils');

const searchableFields = ['name'];
const field = ['name'];

router.route('/')
  .post(crudController.getAllByCondition(ExpenseHead, searchableFields, expenseHeadAttributes))
  .put(crudController.updateByID(ExpenseHead,field, expenseHeadAttributes))
  .delete(crudController.deleteRecord(ExpenseHead));

router.post("/create", crudController.createWODuplicates(ExpenseHead, field, expenseHeadAttributes));

module.exports = router;
