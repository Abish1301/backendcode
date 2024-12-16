const express = require('express');
const router = express.Router();
const { Issue,Site,Task } = require('../models');
const crudController = require('../controllers/crudController');
const { issueMasterAttributes,siteMasterAttributes, taskMasterAttributes } = require('../utils');
const multer = require("multer");
 
// Configure Multer to handle image uploads in memory
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage });
 console.log('storage',storage);
 
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
 
  // router.post("/create", crudController.createWithImage(Issue, field, issueMasterAttributes));
  router.post(
    "/formData",
    upload.single("image"), // Multer middleware to handle the "image" field
    crudController.createWODuplicates(Issue, field, issueMasterAttributes)
  );
 
  router.post("/getById", crudController.getAllById(Issue, issueMasterAttributes, includeModels));
 
module.exports = router;
 
 