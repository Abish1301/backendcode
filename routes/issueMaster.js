const express = require('express');
const router = express.Router();
const { Issue,Site,Task } = require('../models');
const crudController = require('../controllers/crudController');
const { issueMasterAttributes,siteMasterAttributes, taskMasterAttributes } = require('../utils');

const searchableFields = ['name'];
const field = [];
const includeModels = [
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
  .post(crudController.getAllByCondition(Issue, searchableFields,issueMasterAttributes,includeModels))
  .put(crudController.updateByID(Issue,field, issueMasterAttributes))
  .delete(crudController.deleteRecord(Issue));

  router.post("/create", crudController.createWithImage(Issue, field, issueMasterAttributes));
  router.post("/getById", crudController.getAllById(Issue, issueMasterAttributes, includeModels));

module.exports = router;
