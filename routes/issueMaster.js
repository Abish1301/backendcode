const express = require('express');
const router = express.Router();
const { Issue, Site, Task } = require('../models');
const crudController = require('../controllers/crudController');
const { issueMasterAttributes, siteMasterAttributes, taskMasterAttributes, upload } = require('../utils');

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
  .post(crudController.getAllByCondition(Issue, searchableFields, issueMasterAttributes, includeModels))
  .put(upload.single("image"), crudController.updateByID(Issue, field, issueMasterAttributes))
  .delete(crudController.deleteRecord(Issue));

router.post("/formData", upload.single("image"), crudController.createWODuplicates(Issue, field, issueMasterAttributes));
router.post("/getById", crudController.getAllById(Issue, issueMasterAttributes, includeModels));
router.put("/formData",upload.single("image"), crudController.updateByID(Issue, field, issueMasterAttributes))

module.exports = router;

