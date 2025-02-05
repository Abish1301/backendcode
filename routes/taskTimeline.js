const express = require('express');
const router = express.Router();
const { TaskTimeline, Site, Task } = require('../models');
const crudController = require('../controllers/crudController');
const { taskTimelineAttributes, taskMasterAttributes, siteMasterAttributes, upload } = require('../utils');

const searchableFields = ['entry_date'];
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
  .delete(crudController.deleteRecord(TaskTimeline));
router.put("/formdata", upload.single("image"), crudController.updateByID(TaskTimeline, field, taskTimelineAttributes))
router.post("/formdata", upload.single("image"), crudController.createWODuplicates(TaskTimeline, field, taskTimelineAttributes));
router.post("/getById", crudController.getAllById(TaskTimeline, taskTimelineAttributes, includeModels));

module.exports = router;
