const express = require('express');
const router = express.Router();
const { MaterialSpend, material_request, Site, Task, MaterialMainInventory, Unit, MaterialCategory, Tax  } = require('../models');
const crudController = require('../controllers/crudController');
const MaterialSpendController = require ('../controllers/MaterialSpendController');
const { MaterialSpendAttributes, materialRequestAttributes, siteMasterAttributes, taskMasterAttributes, materialMainInventoryAttributes, unitAttributes, materialCategoryAttributes, taxAttributes } = require('../utils');

const field = [];
  const includeModel = [
    {
      model: material_request,
      as: 'material_request',
      attributes: materialRequestAttributes,
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
          model: MaterialMainInventory,
          as: 'MaterialMainInventory',
          attributes: materialMainInventoryAttributes,
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
            {
              model: Tax,
              as: 'Tax',
              attributes: taxAttributes,
            },
          
          ]
        },
      
      ]
    }
  
  ];

router.route('/')
  .post(MaterialSpendController.getAllByCondition(MaterialSpend, MaterialSpendAttributes, includeModel))
  .put(crudController.updateByID(MaterialSpend,field, MaterialSpendAttributes))
  .delete(crudController.deleteRecord(MaterialSpend));

router.post("/create", crudController.createWODuplicates(MaterialSpend, field, MaterialSpendAttributes));
router.post("/getById", MaterialSpendController.getAllById(MaterialSpend, MaterialSpendAttributes,includeModel));

module.exports = router;
