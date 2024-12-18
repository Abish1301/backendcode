const express = require('express');
const router = express.Router();
const { Task, WorkCategory, Unit, Site } = require('../models');
const crudController = require('../controllers/crudController');
const { taskMasterAttributes, siteMasterAttributes, workCategoryAttributes, unitAttributes, upload } = require('../utils');

const searchableFields = ['name'];
const field = [];
const includeModels = [
  {
    model: WorkCategory,
    as: 'WorkCategory',
    attributes: workCategoryAttributes,
  },
  {
    model: Site,
    as: 'Site',
    attributes: siteMasterAttributes,
  },
  {
    model: Unit,
    as: 'Unit',
    attributes: unitAttributes,
  },
];
router.route('/')
  .post(crudController.getAllByCondition(Task, searchableFields, taskMasterAttributes, includeModels))
  .put(upload.single("image"), crudController.updateByID(Task, field, taskMasterAttributes))
  .delete(crudController.deleteRecord(Task));

router.post("/formData", upload.single("image"), crudController.createWODuplicates(Task, field, taskMasterAttributes));
router.post("/getById", crudController.getAllById(Task, taskMasterAttributes, includeModels));

module.exports = router;
