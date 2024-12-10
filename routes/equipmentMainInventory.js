const express = require('express');
const router = express.Router();
const { EquipmentMainInventory } = require('../models');
const crudController = require('../controllers/crudController');
const { equipmentMainInventoryAttributes } = require('../utils');

const searchableFields = ['name','code'];
const field = ['code'];

router.route('/')
  .post(crudController.getAllByCondition(EquipmentMainInventory, searchableFields, equipmentMainInventoryAttributes))
  .put(crudController.updateByID(EquipmentMainInventory,field, equipmentMainInventoryAttributes))
  .delete(crudController.deleteRecord(EquipmentMainInventory));

  router.post("/create", crudController.createWODuplicates(EquipmentMainInventory, field, equipmentMainInventoryAttributes));
  router.post("/getById", crudController.getAllById(EquipmentMainInventory, equipmentMainInventoryAttributes));

module.exports = router;
