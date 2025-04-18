const express = require('express');
const router = express.Router();
const { MaterialCategory } = require('../models');
const crudController = require('../controllers/crudController');
const { materialCategoryAttributes } = require('../utils');

const searchableFields = ['name','code'];
const field = ['code'];

router.route('/')
  .post(crudController.getAllByCondition(MaterialCategory, searchableFields, materialCategoryAttributes))
  .put(crudController.updateByID(MaterialCategory,field, materialCategoryAttributes))
  .delete(crudController.deleteRecord(MaterialCategory));

  router.post("/create", crudController.createWODuplicates(MaterialCategory, field, materialCategoryAttributes));
  router.post("/getById", crudController.getAllById(MaterialCategory, materialCategoryAttributes));

module.exports = router;
