const express = require('express');
const router = express.Router();
const { MaterialMainInventory, MaterialCategory, Unit, Tax } = require('../models');
const crudController = require('../controllers/crudController');
const { materialMainInventoryAttributes, unitAttributes, materialCategoryAttributes, taxAttributes, upload } = require('../utils');

const searchableFields = ['name', 'code', 'hsn_code'];
const field = ['code', 'hsn_code'];
const includeModels = [
  {
    model: Unit,
    as: 'Unit',
    attributes: unitAttributes,
  }, {
    model: MaterialCategory,
    as: 'MaterialCategory',
    attributes: materialCategoryAttributes,
  },
  {
    model: Tax,
    as: 'Tax',
    attributes: taxAttributes,
  },

];
router.route('/')
  .post(crudController.getAllByCondition(MaterialMainInventory, searchableFields, materialMainInventoryAttributes, includeModels))
  .put(upload.single("image"), crudController.updateByID(MaterialMainInventory, field, materialMainInventoryAttributes))
  .delete(crudController.deleteRecord(MaterialMainInventory));

router.post("/formData", upload.single("image"), crudController.createWODuplicates(MaterialMainInventory, field, materialMainInventoryAttributes));
router.post("/getById", crudController.getAllById(MaterialMainInventory, materialMainInventoryAttributes, includeModels));

module.exports = router;
