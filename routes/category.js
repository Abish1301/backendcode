const express = require('express');
const router = express.Router();
const { Category } = require('../models');
const crudController = require('../controllers/crudController');

const searchableFields = ['name'];
router.route('/')
  .get(crudController.getAll(Category, searchableFields)) 
  .post(crudController.create(Category))
  .put(crudController.update(Category))
  .delete(crudController.deleteRecord(Category));

module.exports = router;
