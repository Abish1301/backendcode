const express = require('express');
const router = express.Router();
const { EquipmentMainInventory, Unit, MaterialCategory, Tax } = require('../models');
const crudController = require('../controllers/crudController');
const { equipmentMainInventoryAttributes, unitAttributes, materialCategoryAttributes, taxAttributes } = require('../utils');

const searchableFields = ['name','code'];
const field = ['code'];
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
  {
    model: Tax,
    as: 'Tax',
    attributes: taxAttributes,
  },
];
router.route('/')
  .post(crudController.getAllByCondition(EquipmentMainInventory, searchableFields, equipmentMainInventoryAttributes, includeModels))
  .put(crudController.updateByID(EquipmentMainInventory,field, equipmentMainInventoryAttributes))
  .delete(crudController.deleteRecord(EquipmentMainInventory));

  router.post("/create", crudController.createWODuplicates(EquipmentMainInventory, field, equipmentMainInventoryAttributes));
  router.post("/getById", crudController.getAllById(EquipmentMainInventory, equipmentMainInventoryAttributes, includeModels));

module.exports = router;
