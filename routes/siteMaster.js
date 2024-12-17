const express = require('express');
const router = express.Router();
const { Site, AuthUser } = require('../models');
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
  .put(crudController.updateByID(Site,field, siteMasterAttributes))
  .delete(crudController.deleteRecord(Site));

  // router.post("/create", crudController.createWODuplicates(Site, field, siteMasterAttributes));
  router.post(
    "/formData",
    upload.single("image"), // Multer middleware to handle the "image" field
    crudController.createWODuplicates(Site, field, siteMasterAttributes)
  );
  router.post("/getById", crudController.getAllById(Site, siteMasterAttributes, includeModels));

module.exports = router;
