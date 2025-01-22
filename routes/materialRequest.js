const express = require("express");
const router = express.Router();
const {
  material_request,
  MaterialMainInventory,
  Site,
  Task,
} = require("../models");
const {
  materialRequestAttributes,
  materialMainInventoryAttributesformaterialrequest,
  siteMasterAttributes,
  taskMasterAttributes,
} = require("../utils");
const crudController = require("../controllers/crudController");
const { InventoryOverAll, Inventorylogs, InventoryEntry, getAllDataByCondition } = require("../controllers/materialRequest");

const searchableFields = ["material", "e_date","m_status"];
const searchableFields1 = ["material"];

const field = [];
const includeModels = [
  {
    model: MaterialMainInventory,
    as: "MaterialMainInventory",
    attributes: materialMainInventoryAttributesformaterialrequest,
  },
  {
    model: Site,
    as: "Site",
    attributes: siteMasterAttributes,
  },
  {
    model: Task,
    as: "Task",
    attributes: taskMasterAttributes,
  },
];

router
  .route("/")
  .post(
    getAllDataByCondition(
      material_request,
      searchableFields,
      materialRequestAttributes,
      includeModels
    )
  )
  .put(
    crudController.updateByID(
      material_request,
      field,
      materialRequestAttributes
    )
  )
  .delete(crudController.deleteRecord(material_request));
router.post(
  "/create",
  crudController.createWODuplicates(
    material_request,
    field,
    materialRequestAttributes
  )
);
router.post(
  "/getById",
  crudController.getAllById(
    material_request,
    materialRequestAttributes,
    includeModels
  )
);
router.post(
  "/getDataInventory",
  InventoryOverAll(
    material_request,
    searchableFields,
    materialRequestAttributes,
    includeModels
  )
);
router.post(
  "/getDataInventoryEntry",
  InventoryEntry(
    material_request,
    searchableFields,
    materialRequestAttributes,
    includeModels
  )
);
router.post(
  "/getDataInventoryLog",
  Inventorylogs(
    material_request,
    searchableFields,
    materialRequestAttributes,
    includeModels
  )
);

router.post(
  "/getDataAll",
  crudController.CommonGetForAll(
    material_request,
    searchableFields1,
    materialRequestAttributes,
    includeModels
  )
);
router.post(
  "/bulkCreate",
  crudController.BulkCreate(
    material_request,
    field,
    materialRequestAttributes,
  )
);
module.exports = router;
