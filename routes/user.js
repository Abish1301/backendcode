const express = require('express');
const router = express.Router();
const { AuthUser, Auth, Role } = require('../models');
const crudController = require('../controllers/crudController');
const { authAttributes, authUserAttributes, roleMaterAttributes, upload } = require('../utils');

const searchableFields = ['name', 'code'];
const field = ["email"];
const includeModels = [
  {
    model: AuthUser,
    as: 'AuthUser',
    attributes: authUserAttributes,
  },
]; const includeModel = [
  {
    model: Auth,
    as: 'auth',
    attributes: authAttributes,
  }, {
    model: Role,
    as: 'authrole',
    attributes: roleMaterAttributes,
  },

];

const filter =
{
  type: 'User'
}

const AuthInfo = { type: 'User' }
router.route('/')
  .post(crudController.getAllByCondition(AuthUser, searchableFields, authUserAttributes, includeModel, filter))
  // .put(upload.single("image"), crudController.updateByID(AuthUser, field, authUserAttributes))
  .delete(crudController.deleteRecord(AuthUser));

router.post("/formdata", upload.single("image"), crudController.createUsers(Auth, authAttributes, includeModels, AuthInfo,field));
router.put("/formdata", upload.single("image"), crudController.updateByID(AuthUser, field, authUserAttributes));
router.post("/getById", crudController.getAllById(AuthUser, authUserAttributes, includeModel, filter));

module.exports = router;
