const express = require('express');
const router = express.Router();
const { AuthUser, Auth, Role } = require('../models');
const crudController = require('../controllers/crudController');
const { authAttributes, authUserAttributes, roleMaterAttributes, upload } = require('../utils');

const searchableFields = ['name', 'code'];
const field = [];
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
  type: 'user'
}

const AuthInfo = { type: 'user' }
router.route('/')
  .post(crudController.getAllByCondition(AuthUser, searchableFields, authUserAttributes, includeModel, filter))
  .put(upload.single("image"), crudController.updateByID(AuthUser, field, authUserAttributes))
  .delete(crudController.deleteRecord(AuthUser));

router.post("/formData", upload.single("image"), crudController.createUsers(Auth, authAttributes, includeModels, AuthInfo, ["email"]));
router.post("/getById", crudController.getAllById(AuthUser, authUserAttributes, includeModel, filter));

module.exports = router;
