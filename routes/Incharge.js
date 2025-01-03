const express = require('express');
const router = express.Router();
const { AuthUser, Auth } = require('../models');
const crudController = require('../controllers/crudController');
const { authAttributes, authUserAttributes, upload } = require('../utils');

const searchableFields = ['name','code'];
const field = ["email"];
const includeModels = [
  {
    model: AuthUser,
    as: 'AuthUser',
    attributes: authUserAttributes,
  },
];const includeModel = [
  {
    model: Auth,
    as: 'auth',
    attributes: authAttributes,
  },
];
const filter = {type:'incharge'}
const AuthInfo={roel_id:null, type:'incharge'}
router.route('/')
  .post(crudController.getAllByCondition(AuthUser, searchableFields, authUserAttributes,includeModel, filter))
  .delete(crudController.deleteRecord(AuthUser));
router.put("/formdata", upload.single("image"),crudController.updateByID(AuthUser,field, authUserAttributes))
router.post("/formdata", upload.single("image"), crudController.createUsers(Auth, authAttributes, includeModels, AuthInfo,field)); 
router.post("/getById", crudController.getAllById(AuthUser, authUserAttributes, includeModel, filter));

module.exports = router;
