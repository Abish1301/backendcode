const express = require('express');
const router = express.Router();
const { WorkCategory } = require('../models');
const crudController = require('../controllers/crudController');
const { workCategoryAttributes } = require('../utils');

const searchableFields = ['name'];
const field = ['name'];

router.route('/')
  .post(crudController.getAllByCondition(WorkCategory, searchableFields, workCategoryAttributes,includeModels = [], filter={ type: '1' }))
  .put(crudController.updateByID(WorkCategory, field, workCategoryAttributes))
  .delete(crudController.deleteRecord(WorkCategory));
router.post("/task", crudController.getAllByCondition(WorkCategory, searchableFields, workCategoryAttributes, includeModels = [], filter={ type: '2' }))

router.post("/create", crudController.createWODuplicates(WorkCategory, field, workCategoryAttributes));
router.post("/getById", crudController.getAllById(WorkCategory, workCategoryAttributes));

module.exports = router;
