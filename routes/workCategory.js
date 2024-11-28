const express = require('express');
const router = express.Router();
const { WorkCategory } = require('../models');
const crudController = require('../controllers/crudController');
const { workCategoryAttributes } = require('../utils');

const searchableFields = ['name'];
const field = ['name'];

router.route('/')
  .post(crudController.getAllByCondition(WorkCategory, searchableFields, workCategoryAttributes))
  .put(crudController.updateByID(WorkCategory,field, workCategoryAttributes))
  .delete(crudController.deleteRecord(WorkCategory));

router.post("/create", crudController.createWODuplicates(WorkCategory, field, workCategoryAttributes));

module.exports = router;
