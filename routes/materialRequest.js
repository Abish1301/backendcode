const express = require('express');
const router = express.Router();
const { material_request, MaterialMainInventory } = require('../models');
const { materialRequestAttributes, materialMainInventoryAttributesformaterialrequest } = require('../utils');
const crudController = require('../controllers/crudController'); 

const searchableFields = ['m_status', 'qty','type']; 
const includeModels = [
  {
    model: MaterialMainInventory,
    as: 'MaterialMainInventory', 
    attributes: materialMainInventoryAttributesformaterialrequest, 
  },
];

router.route('/')
  .post(crudController.getAllByCondition(material_request, searchableFields, materialRequestAttributes,includeModels))


module.exports = router;
