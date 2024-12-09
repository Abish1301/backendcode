const express = require('express');
const router = express.Router();
const { Task } = require('../models');
const crudController = require('../controllers/crudController');
const { taskMasterAttributes } = require('../utils');

const searchableFields = ['name'];
const field = [];

router.route('/')
  .post(crudController.getAllByCondition(Task, searchableFields, taskMasterAttributes))
  .put(crudController.updateByID(Task,field, taskMasterAttributes))
  .delete(crudController.deleteRecord(Task));

  router.post("/create", crudController.createWODuplicates(Task, field, taskMasterAttributes));
  router.post("/getById", crudController.getAllById(Task, taskMasterAttributes));

module.exports = router;
