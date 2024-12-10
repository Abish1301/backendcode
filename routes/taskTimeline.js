const express = require('express');
const router = express.Router();
const { TaskTimeline } = require('../models');
const crudController = require('../controllers/crudController');
const { taskTimelineAttributes } = require('../utils');

const searchableFields = [];
const field = [];

router.route('/')
  .post(crudController.getAllByCondition(TaskTimeline, searchableFields, taskTimelineAttributes))
  .put(crudController.updateByID(TaskTimeline,field, taskTimelineAttributes))
  .delete(crudController.deleteRecord(TaskTimeline));

  router.post("/create", crudController.createWODuplicates(TaskTimeline, field, taskTimelineAttributes));
  router.post("/getById", crudController.getAllById(TaskTimeline, taskTimelineAttributes));

module.exports = router;
