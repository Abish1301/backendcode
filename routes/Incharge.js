const express = require('express');
const router = express.Router();
const { AuthUser, Auth } = require('../models');
const crudController = require('../controllers/crudController');
const { authAttributes, authUserAttributes } = require('../utils');

const searchableFields = ['name'];
const field = ['name'];
const includeModels = [
    {
      model: AuthUser,
      as: 'AuthUser',
      attributes: authUserAttributes,
    },
  ];
const AuthInfo={roel_id:null, type:'incharge'}
router.route('/')
  .post(crudController.getAllByCondition(Auth, searchableFields, authAttributes,includeModels))
  .put(crudController.updateByID(AuthUser, authAttributes))
  .delete(crudController.deleteRecord(AuthUser));

router.post("/create", crudController.createUsers(Auth, authAttributes, includeModels, AuthInfo));

module.exports = router;
