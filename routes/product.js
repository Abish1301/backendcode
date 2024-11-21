const express = require('express');
const router = express.Router();
const { Product,Category } = require('../models');
const crudController = require('../controllers/crudController');

const searchableFields = ['name']; 
router.route('/')
  .get(crudController.getAll(Product, searchableFields,[{ model: Category, as: 'category' }]))
  .post(crudController.create(Product))
  .put(crudController.update(Product))
  .delete(crudController.deleteRecord(Product));

module.exports = router;
