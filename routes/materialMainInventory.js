const express = require('express');
const router = express.Router();
const { MaterialMainInventory } = require('../models');
const crudController = require('../controllers/crudController');
const { materialMainInventoryAttributes } = require('../utils');

const searchableFields = ['name','code','hsn_code'];
const field = ['code','hsn_code'];

router.route('/')
  .post(crudController.getAllByCondition(MaterialMainInventory, searchableFields, materialMainInventoryAttributes))
  .put(crudController.updateByID(MaterialMainInventory,field, materialMainInventoryAttributes))
  .delete(crudController.deleteRecord(MaterialMainInventory));

router.post("/createMaterialMainInventory", crudController.createWODuplicates(MaterialMainInventory, field, materialMainInventoryAttributes));

module.exports = router;
