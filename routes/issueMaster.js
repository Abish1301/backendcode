const express = require('express');
const router = express.Router();
const { Issue } = require('../models');
const crudController = require('../controllers/crudController');
const { issueMasterAttributes } = require('../utils');

const searchableFields = ['name'];
const field = [];

router.route('/')
  .post(crudController.getAllByCondition(Issue, searchableFields, issueMasterAttributes))
  .put(crudController.updateByID(Issue,field, issueMasterAttributes))
  .delete(crudController.deleteRecord(Issue));

  router.post("/create", crudController.createWODuplicates(Issue, field, issueMasterAttributes));
  router.post("/getById", crudController.getAllById(Issue, issueMasterAttributes));

module.exports = router;
