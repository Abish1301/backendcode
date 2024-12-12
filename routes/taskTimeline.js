const express = require('express');
const router = express.Router();
const { TaskTimeline, Site, Task } = require('../models');
const crudController = require('../controllers/crudController');
const { taskTimelineAttributes, taskMasterAttributes, siteMasterAttributes } = require('../utils');

const searchableFields = [];
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
  .post(crudController.getAllByCondition(TaskTimeline, searchableFields, taskTimelineAttributes, includeModels))
  .put(crudController.updateByID(TaskTimeline,field, taskTimelineAttributes))
  .delete(crudController.deleteRecord(TaskTimeline));

  router.post("/create", crudController.createWODuplicates(TaskTimeline, field, taskTimelineAttributes));
  router.post("/getById", crudController.getAllById(TaskTimeline, taskTimelineAttributes, includeModels));

module.exports = router;
