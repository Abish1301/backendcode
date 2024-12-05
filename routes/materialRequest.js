const express = require('express');
const router = express.Router();
const { material_request, MaterialMainInventory } = require('../models');
const { Op } = require('sequelize'); 
const { responseHandler, aliasResponseObjectData, materialRequestAttributes, materialMainInventoryAttributes, materialMainInventoryAttributesformaterialrequest } = require('../utils');
const crudController = require('../controllers/crudController'); 

const searchableFields = ['m_status', 'qty']; 
const includeModels = [
  {
    model: MaterialMainInventory,
    as: 'MaterialMainInventory', 
    attributes: materialMainInventoryAttributesformaterialrequest, 
  },
];

router.get(
  '/',
  crudController.getAllByConditionwithincludeModels(
    material_request,
    searchableFields, 
    materialRequestAttributes, 
    includeModels
  )
);

module.exports = router;
