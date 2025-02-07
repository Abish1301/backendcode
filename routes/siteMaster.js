const express = require('express');
const router = express.Router();
const { Site, AuthUser, TaskTimeline, Task} = require('../models');
const crudController = require('../controllers/crudController');
const { siteMasterAttributes, authUserAttributes, upload } = require('../utils');

const searchableFields = ['name'];
const field = [];
const includeModels = [
  {
    model: AuthUser,
    as: 'AuthUser',
    attributes: authUserAttributes,
  },

];
router.route('/')
  .post(crudController.getAllByCondition(Site, searchableFields, siteMasterAttributes, includeModels))
  .delete(crudController.deleteRecord(Site));
router.put("/formdata",upload.single("image"), crudController.updateByID(Site, field, siteMasterAttributes))
router.post("/formdata", upload.single("image"), crudController.createWODuplicates(Site, field, siteMasterAttributes));
router.post("/getById", crudController.getAllById(Site, siteMasterAttributes, includeModels));
router.post("/getsiteDetails", crudController.getAllData(Site, siteMasterAttributes, includeModels, Task, TaskTimeline));

module.exports = router;
