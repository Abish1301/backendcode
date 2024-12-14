const express = require('express');
const router = express.Router();
const { AuthUser, Auth, Role } = require('../models');
const crudController = require('../controllers/crudController');
const { authAttributes, authUserAttributes, roleMaterAttributes } = require('../utils');

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
  .put(crudController.updateByID(AuthUser, field, authUserAttributes))
  .delete(crudController.deleteRecord(AuthUser));

router.post("/create", crudController.createUsers(Auth, authAttributes, includeModels, AuthInfo, ["email"]));
router.post("/getById", crudController.getAllById(AuthUser, authUserAttributes, includeModel, filter));

module.exports = router;
