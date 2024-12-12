const express = require('express');
const router = express.Router();
const { MaterialMainInventory, MaterialCategory, Unit } = require('../models');
const crudController = require('../controllers/crudController');
const { materialMainInventoryAttributes, unitAttributes, materialCategoryAttributes } = require('../utils');

const searchableFields = ['name','code','hsn_code'];
const field = ['code','hsn_code'];
const includeModels = [
  {
    model: Unit,
    as: 'Unit',
    attributes: unitAttributes,
  }, {
    model: MaterialCategory,
    as: 'MaterialCategory',
    attributes: materialCategoryAttributes,
  },

];
router.route('/')
  .post(crudController.getAllByCondition(MaterialMainInventory, searchableFields, materialMainInventoryAttributes, includeModels))
  .put(crudController.updateByID(MaterialMainInventory,field, materialMainInventoryAttributes))
  .delete(crudController.deleteRecord(MaterialMainInventory));

  router.post("/create", crudController.createWODuplicates(MaterialMainInventory, field, materialMainInventoryAttributes));
  router.post("/getById", crudController.getAllById(MaterialMainInventory,  materialMainInventoryAttributes, includeModels));

module.exports = router;
