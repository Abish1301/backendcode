const express = require('express');
const router = express.Router();
const { equipment_request, EquipmentMainInventory } = require('../models');
const { equipmentRequestAttributes, equipmentMainInventoryAttributes } = require('../utils');
const crudController = require('../controllers/crudController'); 

const searchableFields = ['e_status', 'qty']; 
const includeModels = [
  {
    model: EquipmentMainInventory,
    as: 'EquipmentMainInventory', 
    attributes: equipmentMainInventoryAttributes, 
  },
];

router.route('/')
  .post(crudController.getAllByCondition(equipment_request, searchableFields, equipmentRequestAttributes,includeModels))


module.exports = router;
