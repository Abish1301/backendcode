const { Op } = require('sequelize');
const bcrypt = require("bcryptjs");
const { responseHandler, aliasResponseData, FindDuplicate, FindDuplicateforUser} = require('../utils');
const { aliasResponseObjectData, aliasResponseObjectDatainclude, aliasResponseDatainclude} = require('../utils/OtherExports');


const getAll = (Model, searchFields = [], includeModels = []) => async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  try {
    const offset = (page - 1) * limit;

    const whereCondition = search
      ? {
        [Op.or]: searchFields.map(field => ({
          [field]: { [Op.like]: `%${search}%` },
        })),
      }
      : {};

    const { count, rows } = await Model.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      include: includeModels,
    });

    const totalPages = Math.ceil(count / limit);

    const response = {
      count,
      totalPages,
      currentPage: parseInt(page, 10),
      results: rows,
    };

    console.log(`Fetched records from ${Model.name}: page ${page}, limit ${limit}, total pages ${totalPages}`);
    res.json(response);
  } catch (error) {
    console.error(`Error fetching records from ${Model.name}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const create = Model => async (req, res) => {
  try {
    const record = await Model.create(req.body);
    console.log(`Created a new record in ${Model.name}: ${JSON.stringify(record)}`);
    res.json(record);
  } catch (error) {
    console.error(`Error creating record in ${Model.name}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const update = (Model, Attributes) => async (req, res) => {
  try {
    const { id, ...data } = req.body;
    await Model.update(data, { where: { id } });
    console.log(`Updated record with ID ${id} in ${Model.name}`);
    res.json({ message: 'Record updated' });
  } catch (error) {
    console.error(`Error updating record in ${Model.name}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const deleteRecord = Model => async (req, res) => {
  try {
    const { id } = req.body;
    await Model.destroy({ where: { id } });
    console.log(`Deleted record with ID ${id} from ${Model.name}`);
    return responseHandler(res, {
      data: response,
      status: 'success',
      message: 'Data deleted successfully',
      statusCode: 200,
      error: null,
    });
  } catch (error) {
    console.error(`Error deleting record in ${Model.name}: ${error.message}`);
    return responseHandler(res, {
      data: null,
      status: 'error',
      message: 'Internal server error',
      statusCode: 500,
      error: error.message,
    });
  }
};

// get all by user=user & user=null  except d=1 rows
const getAllByCondition = (Model, searchFields = [], Attributes, includeModels = [],  filter = {}) => async (req, res) => {

  const { page = 1, limit = 10, search } = req.query;
  const { user } = req.body

  try {
    const offset = (page - 1) * limit;

    const whereCondition = {
      ...(
        search
          ? {
            [Op.or]: searchFields.map(field => ({
              [field]: { [Op.like]: `%${search}%` },
            })),
          }
          : {}
      ),
      d: 0,
      [Op.and]: [
        {
          [Op.or]: [
            { user: user || null },
            { user: null },
          ],
        },
      ],
      ...(Object.keys(filter).length > 0 ? filter : {}),
    };


    const { count, rows } = await Model.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      include: includeModels,
    });
    if (count === 0) {
      return responseHandler(res, {
        data: {},
        status: 'error',
        message: 'No data found',
        statusCode: 200,
      });
    }

    const totalPages = Math.ceil(count / limit);

    const response = {
      count,
      totalPages,
      currentPage: parseInt(page, 10),
      results: includeModels.length > 0 ? aliasResponseObjectDatainclude(
        rows.map(row => row.dataValues),
        Attributes,
        includeModels // Pass the includeModels to aliasResponseObjectData
      ) : aliasResponseObjectData(rows.map(row => row.dataValues), Attributes)

    };
    console.log(`Fetched records from ${Model.name}: page ${page}, limit ${limit}, total pages ${totalPages}`);
    // res.json(response);
    return responseHandler(res, {
      data: response,
      status: 'success',
      message: 'Data feteched successfully',
      statusCode: 200,
      error: null,
    });
  } catch (error) {
    console.error(`Error fetching records from ${Model.name}: ${error.message}`);
    res.status(500).json({ error: error.message });
    return responseHandler(res, {
      data: null,
      status: 'error',
      message: 'Internal server error',
      statusCode: 500,
      error: error.message,
    });
  }
};

// create a row without duplicate 
const createWODuplicates = (Model, field, Attributes) => async (req, res) => {
  try {
    const { user, ...otherData } = req.body;

    if (field) {
      const count = await FindDuplicate(Model, field, req.body);
      if (count > 0) {
        return responseHandler(res, {
          data: null,
          status: 'conflict',
          message: 'Duplicate record found',
          statusCode: 409,
          error: 'Duplicate record exists',
        });
      }
    }

    // Create a new record
    const record = await Model.create(req.body);
    console.log(`Created a new record in ${Model.name}: ${JSON.stringify(record)}`);

    return responseHandler(res, {
      data: aliasResponseData(record, Attributes),
      status: 'success',
      message: 'Record created successfully',
      statusCode: 200,
      error: null,
    });

  } catch (error) {
    console.error(`Error creating record in ${Model.name}: ${error.message}`);
    return responseHandler(res, {
      data: null,
      status: 'error',
      message: 'Internal server error',
      statusCode: 500,
      error: error.message,
    });
  }
};

// update entire row or a field of a particular row by id
const updateByID = (Model, field=[], Attributes) => async (req, res) => {
  try {
    const { id, ...data } = req.body;
    if (Array.isArray(field) && field.length > 0) {
      const isFieldPresent = field.some(f => req.body[f]);
      
      if (isFieldPresent) {
        const count = await FindDuplicate(Model, field, req.body);
        if (count > 0) {
          return responseHandler(res, {
            data: null,
            status: 'conflict',
            message: 'Duplicate record found',
            statusCode: 409,
            error: 'Duplicate record exists',
          });
        }
      }
    } 
    const record = await Model.update(data, { where: { id } });
    console.log(`Updated record with ID ${id} in ${Model.name}`);
    if (record[0] == 1) {
      const updatedRecord = await Model.findByPk(id);

      return responseHandler(res, {
        data: aliasResponseData(updatedRecord, Attributes),
        status: 'success',
        message: 'Record Updated successfully',
        statusCode: 200,
        error: null,
      });
    }
    return responseHandler(res, {
      data: {},
      status: 'success',
      message: 'Record Updated successfully',
      statusCode: 200,
      error: null,
    });

  } catch (error) {
    console.error(`Error updating record in ${Model.name}: ${error.message}`);
    return responseHandler(res, {
      data: null,
      status: 'error',
      message: 'Internal server error',
      statusCode: 500,
      error: error.message,
    });
  }
};

// const createUsers = (Model, Attributes, includeModels, AuthInfo) => async (req, res) => {
//   try {
//     // Create a new record in the main model
//     const record = await Model.create({email:req.body.username, password:await bcrypt.hash(req.body.password, 10)});
//     console.log(`Created a new record in ${Model.name}`);

//     for (const include of includeModels) {
//       const { model, as } = include;

//       // Ensure the related model and alias exist
//       if (model && as) {
//         const authUserData = await model.create({ ...req.body, auth_id: record.id, ...AuthInfo });
//         const returnData = { ...authUserData, record }; // Combine both records
//         console.log(`Created a related record in ${model.name} with alias ${as}`);
//         console.log('returnData',returnData);
        
//         // Respond with success
//         return responseHandler(res, {
//           data: aliasResponseObjectDatainclude(
//             returnData,
//             Attributes,
//             includeModels // Pass the includeModels to aliasResponseObjectData
//           ),
//           status: 'success',
//           message: 'Record created successfully',
//           statusCode: 200,
//           error: null,
//         });
//       }
//     }

//   } catch (error) {
//     console.error(`Error creating record in ${Model.name}: ${error.message}`);
//     return responseHandler(res, {
//       data: null,
//       status: 'error',
//       message: 'Internal server error',
//       statusCode: 500,
//       error: error.message,
//     });
//   }
// };
const createUsers = (Model, Attributes, includeModels, AuthInfo,field=[]) => async (req, res) => {
  console.log(field,'field');
  
  try {
    // Create a new record in the main model (Auth model)
       if (Array.isArray(field) && field.length > 0){
      const count = await FindDuplicateforUser(Model, field, req.body);
        if (count > 0) {
          return responseHandler(res, {
            data: null,
            status: 'conflict',
            message: 'Duplicate record found',
            statusCode: 409,
            error: 'Duplicate record exists',
          });
        }
      
    }
    const record = await Model.create({ email: req.body.username, password: await bcrypt.hash(req.body.password, 10) });
    console.log(`Created a new record in ${Model.name}`);

    const includeData = {};  // Object to hold the data for included models

    // Loop through the includeModels to create associated records
    for (const include of includeModels) {
      const { model, as } = include;

      // Ensure the related model and alias exist
      if (model && as) {
        const authUserData = await model.create({ ...req.body, auth_id: record.id, ...AuthInfo });
        includeData[as] = authUserData; // Store related model data by alias
        console.log(`Created a related record in ${model.name} with alias ${as}`);
      }
    }

    // Combine both records (auth data and included models data)
    const returnData = {
      ...record.dataValues,  // Data from the main model
      ...includeData,  // Data from included models
    };

    // Log the final return data
    console.log('returnData', returnData);

    // Respond with success
    return responseHandler(res, {
      data: aliasResponseDatainclude(returnData, Attributes, includeModels), // Pass the full combined data
      status: 'success',
      message: 'Record created successfully',
      statusCode: 200,
      error: null,
    });

  } catch (error) {
    console.error(`Error creating record in ${Model.name}: ${error.message}`);
    return responseHandler(res, {
      data: null,
      status: 'error',
      message: 'Internal server error',
      statusCode: 500,
      error: error.message,
    });
  }
};



module.exports = {
  getAll,
  create,
  update,
  deleteRecord,
  getAllByCondition,
  createWODuplicates,
  updateByID,
  createUsers
};
