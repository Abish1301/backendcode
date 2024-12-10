const express = require('express');
const router = express.Router();
const { material_request, MaterialMainInventory } = require('../models');
const { materialRequestAttributes, materialMainInventoryAttributesformaterialrequest } = require('../utils');
const crudController = require('../controllers/crudController');

const searchableFields = ['m_status', 'qty'];
const field = [];
const includeModels = [
  {
    model: MaterialMainInventory,
    as: 'MaterialMainInventory',
    attributes: materialMainInventoryAttributesformaterialrequest,
  },
];

router.route('/')
  .post(crudController.getAllByCondition(material_request, searchableFields, materialRequestAttributes, includeModels))
  .put(crudController.updateByID(material_request, field, materialRequestAttributes))
  .delete(crudController.deleteRecord(material_request));
  router.post("/create", crudController.createWODuplicates(material_request, field, materialRequestAttributes));
  router.post("/getById", crudController.getAllById(material_request, materialRequestAttributes, includeModels));


module.exports = router;
