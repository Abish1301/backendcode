const express = require('express');
const router = express.Router();
const { equipment_request, EquipmentMainInventory, Task, Site } = require('../models');
const { equipmentRequestAttributes, equipmentMainInventoryAttributes, taskMasterAttributes, siteMasterAttributes } = require('../utils');
const crudController = require('../controllers/crudController');

const searchableFields = ['e_status', 'qty'];
const field = [];
const includeModels = [
  {
    model: EquipmentMainInventory,
    as: 'EquipmentMainInventory',
    attributes: equipmentMainInventoryAttributes,
  },
  {
    model: Site,
    as: 'Site',
    attributes: siteMasterAttributes,
  },
  {
    model: Task,
    as: 'Task',
    attributes: taskMasterAttributes,
  },

];

router.route('/')
  .post(crudController.getAllByCondition(equipment_request, searchableFields, equipmentRequestAttributes, includeModels))
  .put(crudController.updateByID(equipment_request, field, equipmentRequestAttributes))
  .delete(crudController.deleteRecord(equipment_request));
router.post("/create", crudController.createWODuplicates(equipment_request, field, equipmentRequestAttributes));
router.post("/getById", crudController.getAllById(equipment_request, equipmentRequestAttributes, includeModels));


module.exports = router;
