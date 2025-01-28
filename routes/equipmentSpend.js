const express = require('express');
const router = express.Router();
const { EquipmentSpend, Site, Task, Unit, MaterialCategory, Tax, equipment_request, EquipmentMainInventory  } = require('../models');
const crudController = require('../controllers/crudController');
const MaterialSpendController = require ('../controllers/MaterialSpendController');
const { MaterialSpendAttributes, materialRequestAttributes, siteMasterAttributes, taskMasterAttributes, unitAttributes, materialCategoryAttributes, taxAttributes, equipmentRequestAttributes, equipmentMainInventoryAttributes } = require('../utils');

const field = [];
  const includeModel = [
    {
      model: equipment_request,
      as: 'equipment_request',
      attributes: equipmentRequestAttributes,
       includeModels : [
        {
          model:Site,
          as: 'Site',
          attributes: siteMasterAttributes,
        }, {
          model: Task,
          as: 'Task',
          attributes: taskMasterAttributes,
        },
        {
          model: EquipmentMainInventory,
          as: 'EquipmentMainInventory',
          attributes: equipmentMainInventoryAttributes,
          includeModels:[
            {
              model: Unit,
              as: 'Unit',
              attributes: unitAttributes,
            }, {
              model: MaterialCategory,
              as: 'MaterialCategory',
              attributes: materialCategoryAttributes,
            },
          
          ]
        },
      
      ]
    }
  
  ];

router.route('/')
  .post(MaterialSpendController.getAllByCondition(EquipmentSpend, MaterialSpendAttributes, includeModel))
  .put(MaterialSpendController.updateRecord(EquipmentSpend, MaterialSpendAttributes, equipment_request))
  .delete(crudController.deleteRecord(EquipmentSpend));
  router.delete("/delete", MaterialSpendController.deleteRecord(EquipmentSpend, equipment_request));
router.post("/create", MaterialSpendController.createWODuplicates(EquipmentSpend, MaterialSpendAttributes,equipment_request,materialRequestAttributes));
router.post("/getById", MaterialSpendController.getAllById(EquipmentSpend, MaterialSpendAttributes,includeModel));

module.exports = router;
