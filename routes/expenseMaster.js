const express = require('express');
const router = express.Router();
const { Expense ,ExpenseHead, Site, Task} = require('../models');
const crudController = require('../controllers/crudController');
const { expenseMasterAttributes, siteMasterAttributes, taskMasterAttributes, expenseHeadAttributes } = require('../utils');

const searchableFields = ['name'];
const field = [];
const includeModels = [
  {
    model: ExpenseHead,
    as: 'ExpenseHead',
    attributes: expenseHeadAttributes,
  },
  {
    model: Site,
    as: 'Site',
    attributes: siteMasterAttributes,
  },
  {
    model: Task,
    as: 'Task',
    attributes: taskMasterAttributes,
  },

];
router.route('/')
  .post(crudController.getAllByCondition(Expense, searchableFields, expenseMasterAttributes, includeModels))
  .put(crudController.updateByID(Expense,field, expenseMasterAttributes))
  .delete(crudController.deleteRecord(Expense));

router.post("/create", crudController.createWODuplicates(Expense, field, expenseMasterAttributes));
router.post("/getById", crudController.getAllById(Expense, expenseMasterAttributes, includeModels));

module.exports = router;
