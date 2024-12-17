const { Op } = require('sequelize');
const bcrypt = require("bcryptjs");
const { responseHandler, aliasResponseData, FindDuplicate, FindDuplicateforUser, Logger, uploadImageToFolder } = require('../utils');
const { aliasResponseObjectData, aliasResponseObjectDatainclude, aliasResponseDatainclude } = require('../utils/OtherExports');
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
    Logger.info(`Fetched records from ${Model.name}: page ${page}, limit ${limit}, total pages ${totalPages}`);
 
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
    Logger.info(`Created a new record in ${Model.name}: ${JSON.stringify(record)}`);
 
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
    Logger.info(`Updated record with ID ${id} in ${Model.name}`);
 
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
    Logger.info(`Deleted record with ID ${id} from ${Model.name}`);
 
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
 
// create a row without duplicate
// const createWODuplicates = (Model, field, Attributes) => async (req, res) => {
//   try {
//     const { user, ...otherData } = req.body;
 
//     if (field) {
//       const count = await FindDuplicate(Model, field, req.body);
//       if (count > 0) {
//         return responseHandler(res, {
//           data: null,
//           status: 'conflict',
//           message: 'Duplicate record found',
//           statusCode: 409,
//           error: 'Duplicate record exists',
//         });
//       }
//     }
 
//     // Create a new record
//     const record = await Model.create(req.body);
//     console.log(`Created a new record in ${Model.name}: ${JSON.stringify(record)}`);
//     Logger.info(`Created a new record in ${Model.name}: ${JSON.stringify(record)}`);
 
//     return responseHandler(res, {
//       data: aliasResponseData(record, Attributes),
//       status: 'success',
//       message: 'Record created successfully',
//       statusCode: 200,
//       error: null,
//     });
 
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
 
// update entire row or a field of a particular row by id
const updateByID = (Model, field = [], Attributes) => async (req, res) => {
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
    const DataByPK=await Model.findByPk(id);
    if(DataByPK.user===null){
      return responseHandler(res, {
        data: null,
        status: 'Unauthorized',
        message: 'User is null',
        statusCode: 401,
        error: 'Cannot Update data',
      });
    }
    const record = await Model.update(data, { where: { id } });
    console.log(`Updated record with ID ${id} in ${Model.name}`);
    Logger.info(`Updated record with ID ${id} in ${Model.name}`);
 
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
 
// create incharge, admin,user
const createUsers = (Model, Attributes, includeModels, AuthInfo, field = []) => async (req, res) => {
  try {
    let imagePath = null;

    // Create a new record in the main model (Auth model)
    if (Array.isArray(field) && field.length > 0) {
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
    // Step 2: Handle image saving (only if no duplicates are found)
      if (req.file) {
        console.log('req.file', req.file);
 
        const imageBuffer = req.file.buffer; // Get the buffer from Multer
        const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.jpg`; // Unique filename
        const modelName = Model.name; // Use model name for folder
 
        // Upload the image to Azure Blob Storage in the folder named after the model
        const uploadedImagePath = await uploadImageToFolder(modelName, imageBuffer, fileName);
 
        // Set the imagePath to the URL of the uploaded image
        imagePath = uploadedImagePath;
      }
 
    const record = await Model.create({ email: req.body.username, password: await bcrypt.hash(req.body.password, 10) });
    console.log(`Created a new record in ${Model.name}`);
    Logger.info(`Created a new record in ${Model.name}`);
 
 
    const includeData = {};  // Object to hold the data for included models
 
    // Loop through the includeModels to create associated records
    for (const include of includeModels) {
      const { model, as } = include;
 
      // Ensure the related model and alias exist
      if (model && as) {
        const authUserData = await model.create({ ...req.body, auth_id: record.id, ...AuthInfo, ...imagePath ? { image: imagePath } : {} });
        includeData[as] = authUserData; // Store related model data by alias
        console.log(`Created a related record in ${model.name} with alias ${as}`);
        Logger.info(`Created a related record in ${model.name} with alias ${as}`);
 
      }
    }
 
    // Combine both records (auth data and included models data)
    const returnData = {
      ...record.dataValues,  // Data from the main model
      ...includeData,  // Data from included models
    };
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
 
//  get by id or by any of the field with user
const getAllById = (Model, Attributes, includeModels = [], filter = {}) => async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { user, ...filters } = req.body; // Extract `id` and `user` from body
  try {
    const offset = (page - 1) * limit;
 
    let whereCondition;
 
    // If `id` is the only key in `req.body`
    if (filters.id && Object.keys(req.body).length === 1) {
      whereCondition = {
        d: 0,
        id: filters.id,
        ...(Object.keys(filter).length > 0 ? filter : {}),
      };
    } else {
      whereCondition = {
        d: 0,
        ...filters, // Apply all other filters from the body
        [Op.and]: [
          {
            [Op.or]: [
              { user: user || null }, // Explicit handling for user field
              { user: null },
            ],
          },
        ],
        ...(Object.keys(filter).length > 0 ? filter : {}),
      };
    }
 
    const { count, rows } = await Model.findAndCountAll({
      where: whereCondition,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      include: includeModels,
    });
 
    if (count === 0) {
      return responseHandler(res, {
        data: {},
        status: 'No Data',
        message: 'No data found',
        statusCode: 200,
      });
    }
 
    const totalPages = Math.ceil(count / limit);
 
    // const response = {
    //   count,
    //   totalPages,
    //   currentPage: parseInt(page, 10),
    //   results: includeModels.length > 0
    //     ? aliasResponseObjectDatainclude(
    //       rows.map(row => row.dataValues),
    //       Attributes,
    //       includeModels // Pass the includeModels to aliasResponseObjectData
    //     )
    //     : aliasResponseObjectData(rows.map(row => row.dataValues), Attributes),
    // };
    // Transform the results dynamically, excluding `SiteDetails` and `TaskDetails`
   
      // Transform the results dynamically, excluding `SiteDetails` and `TaskDetails`
      const transformedResults = rows.map((row) => {
        const dataValues = row.dataValues;
 
        // Map alias attributes to their desired key names
        const remappedAttributes = {};
        Attributes.forEach(([originalKey, aliasKey]) => {
          if (dataValues[originalKey] !== undefined) {
            remappedAttributes[aliasKey] = dataValues[originalKey];
            delete dataValues[originalKey]; // Remove the original key if needed
          }
        });
 
        // Dynamically extract and group fields for each included model
        const transformedIncludes = includeModels.reduce(
          (acc, includeModel) => {
            const alias = includeModel.as;
            if (dataValues[alias]) {
              acc[alias] = Array.isArray(dataValues[alias])
                ? dataValues[alias].map((item) => item.dataValues)
                : dataValues[alias].dataValues;
            }
            return acc;
          },
          {}
        );
 
        // Combine remapped main record data with transformed include data
        return {
          ...remappedAttributes,
          ...transformedIncludes,
        };
      });
 
    const response = {
      count,
      totalPages,
      currentPage: parseInt(page, 10),
      results: transformedResults,
    };
 
    console.log(`Fetched records from ${Model.name}: page ${page}, limit ${limit}, total pages ${totalPages}`);
    Logger.info(`Fetched records from ${Model.name}: page ${page}, limit ${limit}, total pages ${totalPages}`);
 
    return responseHandler(res, {
      data: response.count == 1 ? response.results : response,
      status: 'success',
      message: 'Data fetched successfully',
      statusCode: 200,
      error: null,
    });
  } catch (error) {
    console.error(`Error fetching records from ${Model.name}: ${error.message}`);
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
const getAllByCondition = (Model, searchFields = [], Attributes, includeModels = [], filter = {}) =>
  async (req, res) => {
    const { page = 1, limit = 10, search } = req.query;
    const { user } = req.body;
 
    try {
      const offset = (page - 1) * limit;
 
      const whereCondition = {
        ...(search
          ? {
              [Op.or]: searchFields.map((field) => ({
                [field]: { [Op.like]: `%${search}%` },
              })),
            }
          : {}),
        d: 0,
        [Op.and]: [
          {
            [Op.or]: [{ user: user || null }, { user: null }],
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
          status: "No Data",
          message: "No data found",
          statusCode: 200,
        });
      }
 
      const totalPages = Math.ceil(count / limit);
 
      // Transform the results dynamically, excluding `SiteDetails` and `TaskDetails`
      const transformedResults = rows.map((row) => {
        const dataValues = row.dataValues;
 
        // Map alias attributes to their desired key names
        const remappedAttributes = {};
        Attributes.forEach(([originalKey, aliasKey]) => {
          if (dataValues[originalKey] !== undefined) {
            remappedAttributes[aliasKey] = dataValues[originalKey];
            delete dataValues[originalKey]; // Remove the original key if needed
          }
        });
 
        // Dynamically extract and group fields for each included model
        const transformedIncludes = includeModels.reduce(
          (acc, includeModel) => {
            const alias = includeModel.as;
            if (dataValues[alias]) {
              acc[alias] = Array.isArray(dataValues[alias])
                ? dataValues[alias].map((item) => item.dataValues)
                : dataValues[alias].dataValues;
            }
            return acc;
          },
          {}
        );
 
        // Combine remapped main record data with transformed include data
        return {
          ...remappedAttributes,
          ...transformedIncludes,
        };
      });
 
      const response = {
        count,
        totalPages,
        currentPage: parseInt(page, 10),
        results: transformedResults,
      };
 
      console.log(
        `Fetched records from ${Model.name}: page ${page}, limit ${limit}`
      );
      return responseHandler(res, {
        data: response,
        status: "success",
        message: "Data fetched successfully",
        statusCode: 200,
        error: null,
      });
    } catch (error) {
      console.error(
        `Error fetching records from ${Model.name}: ${error.message}`
      );
      return responseHandler(res, {
        data: null,
        status: "error",
        message: "Internal server error",
        statusCode: 500,
        error: error.message,
      });
    }
  };
 
  const createWODuplicates = (Model, field, Attributes) => async (req, res) => {
    try {
      const { user, ...otherData } = req.body; // Extract fields from the body
      let imagePath = null; 
      // Step 1: Check for duplicates
      if (field) {
        const count = await FindDuplicate(Model, field, req.body);
        if (count > 0) {
          return responseHandler(res, {
            data: null,
            status: "conflict",
            message: "Duplicate record found",
            statusCode: 409,
            error: "Duplicate record exists",
          });
        }
      }
 
      // Step 2: Handle image saving (only if no duplicates are found)
      if (req.file) {
        console.log('req.file', req.file);
 
        const imageBuffer = req.file.buffer; // Get the buffer from Multer
        const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.jpg`; // Unique filename
        const modelName = Model.name; // Use model name for folder
 
        // Upload the image to Azure Blob Storage in the folder named after the model
        const uploadedImagePath = await uploadImageToFolder(modelName, imageBuffer, fileName);
 
        // Set the imagePath to the URL of the uploaded image
        imagePath = uploadedImagePath;
      }
 
      // Step 3: Create the new record
      const recordData = {
        ...otherData,
        ...(imagePath ? { image: imagePath } : {}), // Add the image path if available
      };
 
      const record = await Model.create(recordData);
      console.log(`Created a new record in ${Model.name}: ${JSON.stringify(record)}`);
      Logger.info(`Created a new record in ${Model.name}: ${JSON.stringify(record)}`);
 
      return responseHandler(res, {
        data: aliasResponseData(record, Attributes),
        status: "success",
        message: "Record created successfully",
        statusCode: 200,
        error: null,
      });
    } catch (error) {
      console.error(`Error creating record in ${Model.name}: ${error.message}`);
      return responseHandler(res, {
        data: null,
        status: "error",
        message: "Internal server error",
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
  createUsers,
  getAllById,
};