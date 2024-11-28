const express = require('express');
const router = express.Router();
const { Role } = require('../models');
const crudController = require('../controllers/crudController');
const { roleMaterAttributes } = require('../utils');

const searchableFields = ['name','code'];
const field = ['code','name'];

router.route('/')
  .post(crudController.getAllByCondition(Role, searchableFields, roleMaterAttributes))
  .put(crudController.updateByID(Role, field,roleMaterAttributes))
  .delete(crudController.deleteRecord(Role));

router.post("/create", crudController.createWODuplicates(Role, field, roleMaterAttributes));

module.exports = router;
