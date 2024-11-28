const express = require('express');
const router = express.Router();
const { Site } = require('../models');
const crudController = require('../controllers/crudController');
const { siteMasterAttributes } = require('../utils');

const searchableFields = ['name'];
const field = [];

router.route('/')
  .post(crudController.getAllByCondition(Site, searchableFields, siteMasterAttributes))
  .put(crudController.updateByID(Site,field, siteMasterAttributes))
  .delete(crudController.deleteRecord(Site));

router.post("/create", crudController.createWODuplicates(Site, field, siteMasterAttributes));

module.exports = router;
