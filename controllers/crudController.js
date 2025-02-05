const { Sequelize, Op } = require('sequelize');
const bcrypt = require("bcryptjs");
const {
  responseHandler,
  aliasResponseData,
  FindDuplicate,
  FindDuplicateforUser,
  Logger,
  uploadImageToFolder,
  updateImageToFolder,
  expenseMasterAttributes,
} = require("../utils");
const {
  aliasResponseObjectData,
  aliasResponseObjectDatainclude,
  aliasResponseDatainclude,
} = require("../utils/OtherExports");
const { Task, equipment_request, material_request, TaskTimeline, Expense,Issue, Site, AuthUser} = require('../models');

const getAll =
  (Model, searchFields = [], includeModels = []) =>
    async (req, res) => {
      const { page = 1, limit = 10, search } = req.query;

      try {
        const offset = (page - 1) * limit;

        const whereCondition = search
          ? {
            [Op.or]: searchFields.map((field) => ({
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

        console.log(
          `Fetched records from ${Model.name}: page ${page}, limit ${limit}, total pages ${totalPages}`
        );
        Logger.info(
          `Fetched records from ${Model.name}: page ${page}, limit ${limit}, total pages ${totalPages}`
        );

        res.json(response);
      } catch (error) {
        console.error(
          `Error fetching records from ${Model.name}: ${error.message}`
        );
        res.status(500).json({ error: error.message });
      }
    };

const create = (Model) => async (req, res) => {
  try {
    const record = await Model.create(req.body);
    console.log(
      `Created a new record in ${Model.name}: ${JSON.stringify(record)}`
    );
    Logger.info(
      `Created a new record in ${Model.name}: ${JSON.stringify(record)}`
    );

    res.json(record);
  } catch (error) {
    console.error(`Error creating record in ${Model.name}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const update = (Model, Attributes) => async (req, res) => {
  try {
    const { id, ...data } = req.body;
    await Model.update({ ...data, updated_at: new Date() }, { where: { id } });
    console.log(`Updated record with ID ${id} in ${Model.name}`);
    Logger.info(`Updated record with ID ${id} in ${Model.name}`);

    res.json({ message: "Record updated" });
  } catch (error) {
    console.error(`Error updating record in ${Model.name}: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

const deleteRecord = (Model) => async (req, res) => {
  try {
    const { id } = req.body;
    await Model.destroy({ where: { id } });
    console.log(`Deleted record with ID ${id} from ${Model.name}`);
    Logger.info(`Deleted record with ID ${id} from ${Model.name}`);

    return responseHandler(res, {
      data: req.body,
      status: "success",
      message: "Data deleted successfully",
      statusCode: 200,
      error: null,
    });
  } catch (error) {
    console.error(`Error deleting record in ${Model.name}: ${error.message}`);
    return responseHandler(res, {
      data: null,
      status: "error",
      message: "Internal server error",
      statusCode: 500,
      error: error.message,
    });
  }
};

// update entire row or a field of a particular row by id
const updateByID =
  (Model, field = [], Attributes) =>
    async (req, res) => {
      try {
        let imagePath;
        const { id, ...data } = req.body;
        console.log(id);
        if (Array.isArray(field) && field.length > 0) {
          const isFieldPresent = field.some((f) => req.body[f]);

          if (isFieldPresent) {
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
        }
        const DataByPK = await Model.findByPk(id);
        if (DataByPK.user === null) {
          return responseHandler(res, {
            data: null,
            status: "Unauthorized",
            message: "User is null",
            statusCode: 401,
            error: "Cannot Update data",
          });
        }

        if (req.file) {

          const imageBuffer = req.file.buffer; // Get the buffer from Multer
          const fileName = DataByPK.image; // Unique filename

          // Upload the image to Azure Blob Storage in the folder named after the model
          const uploadedImagePath = await updateImageToFolder(
            imageBuffer,
            fileName
          );

          // Set the imagePath to the URL of the uploaded image
          imagePath = uploadedImagePath;
        }
        const updateData = {
          ...data,
          ...(imagePath ? { image: imagePath } : {}),
          updated_at: new Date()
        };

        await Model.update(updateData, { where: { id } });
        console.log(`Updated record with ID ${id} in ${Model.name}`);
        Logger.info(`Updated record with ID ${id} in ${Model.name}`);

        const updatedRecord = await Model.findByPk(id);

        return responseHandler(res, {
          data: aliasResponseData(updatedRecord, Attributes),
          status: "success",
          message: "Record Updated successfully",
          statusCode: 200,
          error: null,
        });
      } catch (error) {
        console.error(`Error updating record in ${Model.name}: ${error.message}`);
        return responseHandler(res, {
          data: null,
          status: "error",
          message: "Internal server error",
          statusCode: 500,
          error: error.message,
        });
      }
    };

// create incharge, admin,user
const createUsers =
  (Model, Attributes, includeModels, AuthInfo,field) =>
    async (req, res) => {
      try {
        let imagePath = null;

        // Create a new record in the main model (Auth model)
        if (Array.isArray(field) && field.length > 0) {
          const count = await FindDuplicateforUser(Model, field, req.body);
          const count1 = await FindDuplicate(includeModels[0].model, field, req.body);
          if (count > 0 ||count1>0) {
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
          const fileExtension = req.file.mimetype.split("/")[1];

          const imageBuffer = req.file.buffer; // Get the buffer from Multer
          const fileName = `${Date.now()}_${Math.random()
            .toString(36)
            .substr(2, 9)}.${fileExtension}`; // Unique filename
          const modelName = Model.name; // Use model name for folder

          // Upload the image to Azure Blob Storage in the folder named after the model
          const uploadedImagePath = await uploadImageToFolder(
            modelName,
            imageBuffer,
            fileName
          );

          // Set the imagePath to the URL of the uploaded image
          imagePath = uploadedImagePath;
        }

        const record = await Model.create({
          email: req.body.username,
          password: await bcrypt.hash(req.body.password, 10),
        });
        console.log(`Created a new record in ${Model.name}`);
        Logger.info(`Created a new record in ${Model.name}`);

        const includeData = {}; // Object to hold the data for included models

        // Loop through the includeModels to create associated records
        for (const include of includeModels) {
          const { model, as } = include;

          // Ensure the related model and alias exist
          if (model && as) {
            const authUserData = await model.create({
              ...req.body,
              auth_id: record.id,
              ...AuthInfo,
              ...(imagePath ? { image: imagePath } : {}),
            });
            includeData[as] = authUserData; // Store related model data by alias
            console.log(
              `Created a related record in ${model.name} with alias ${as}`
            );
            Logger.info(
              `Created a related record in ${model.name} with alias ${as}`
            );
          }
        }

        // Combine both records (auth data and included models data)
        const returnData = {
          ...record.dataValues, // Data from the main model
          ...includeData, // Data from included models
        };
        // Respond with success
        return responseHandler(res, {
          data: aliasResponseDatainclude(returnData, Attributes, includeModels), // Pass the full combined data
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
          error: error?.errors ? error?.errors[0]?.message : error.message,
        });
      }
    };

//  get by id or by any of the field with user
const getAllById =
  (Model, Attributes, includeModels = [], filter = {}) =>
    async (req, res) => {
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
            data: [],
            status: "No Data",
            message: "No data found",
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

        console.log(
          `Fetched records from ${Model.name}: page ${page}, limit ${limit}, total pages ${totalPages}`
        );
        Logger.info(
          `Fetched records from ${Model.name}: page ${page}, limit ${limit}, total pages ${totalPages}`
        );

        return responseHandler(res, {
          data: response.count == 1 ? response.results : response,
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

// get all by user=user & user=null  except d=1 rows
const getAllByCondition =
  (Model, searchFields = [], Attributes, includeModels = [], filter = {}) =>
    async (req, res) => {
      const { page = 1, limit = 10, search } = req.query;
      const { user, site, task } = req.body;
      try {
        const offset = (page - 1) * limit;

        const whereCondition = {
          d: 0,
          ...(search && {
            [Op.or]: searchFields.map((field) => ({
              [field]: { [Op.like]: `%${search}%` },
            })),
          }),
          [Op.and]: [
            { [Op.or]: [{ user: user || null }, { user: null }] },
            ...(site !== undefined && site !== null ? [{ site }] : []),
            ...(task !== undefined && task !== null ? [{ task }] : []),
          ],
          ...filter,
        };

        const { count, rows } = await Model.findAndCountAll({
          where: whereCondition,
          limit: parseInt(limit, 10),
          offset: parseInt(offset, 10),
          include: includeModels,
        });

        if (count === 0) {
          return responseHandler(res, {
            data: [],
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
      const fileExtension = req.file.mimetype.split("/")[1];

      const imageBuffer = req.file.buffer; // Get the buffer from Multer
      const fileName = `${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}.${fileExtension}`; // Unique filename
      const modelName = Model.name; // Use model name for folder
      // Upload the image to Azure Blob Storage in the folder named after the model
      const uploadedImagePath = await uploadImageToFolder(
        modelName,
        imageBuffer,
        fileName
      );

      // Set the imagePath to the URL of the uploaded image
      imagePath = uploadedImagePath;
    }

    // Step 3: Create the new record
    const recordData = {
      ...otherData,
      user,
      ...(imagePath ? { image: imagePath } : {}), // Add the image path if available
    };

    const record = await Model.create(recordData);
    console.log(
      `Created a new record in ${Model.name}: ${JSON.stringify(record)}`
    );
    Logger.info(
      `Created a new record in ${Model.name}: ${JSON.stringify(record)}`
    );

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

const getAllDataByCondition =
  (Model, searchFields = [], Attributes, includeModels = [], filter = {}) =>
  async (req, res) => {
    const { page = 1, limit = 10, search } = req.query;
    const { user, site, task } = req.body;
    console.log(req.body)
    try {
      const offset = (page - 1) * limit;

      const whereCondition = {
        d: 0,
        [Op.and]: [
          ...(search
            ? [
                {
                  [Op.or]: searchFields.map((field) => ({
                    [field]: {
                      [Op.eq]: search, // Exact match condition
                    },
                  })),
                },
              ]
            : []),
          {
            [Op.or]: searchFields.map((field) => ({
              [field]: { [Op.like]: `%${search}%` },
            })),
          },
          { [Op.or]: [{ user: user || null }, { user: null }] },
          ...(site !== undefined && site !== null ? [{ site }] : []),
          ...(task !== undefined && task !== null ? [{ task }] : []),
        ],
        ...filter,
      };
      
      const { count, rows } = await Model.findAndCountAll({
        where: whereCondition,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
        include: includeModels,
      });

      if (count === 0) {
        return responseHandler(res, {
          data: [],
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

const CommonGetForAll = (Model, searchFields = [], Attributes, includeModels = [], filter = {}) => async (req, res) => {
    const { user, search } = req.body;

    try {
        const whereCondition = {
            d: 0,
            status: 1,
            [Op.and]: [
                ...(search ? [{
                    [Op.or]: searchFields.map(field => ({
                      [field]: { [Op.eq]: search }
                    }))
                }] : []),
                { [Op.or]: [{ user: user  }, { user: null }] },
            ],
            ...filter,
        };

        const data = await Model.findAll({
            where: whereCondition,
            include: includeModels,
        });

        if (!data.length) {
            return responseHandler(res, {
                data: [],
                status: "No Data",
                message: "No data found",
                statusCode: 200,
            });
        }

        const transformedResults = data.map((row) => {
            const dataValues = row.dataValues;
            const remappedAttributes = {};
            
            Attributes.forEach(([originalKey, aliasKey]) => {
                if (dataValues[originalKey] !== undefined) {
                    remappedAttributes[aliasKey] = dataValues[originalKey];
                    delete dataValues[originalKey];
                }
            });

            const transformedIncludes = includeModels.reduce((acc, includeModel) => {
                const alias = includeModel.as;
                if (dataValues[alias]) {
                    acc[alias] = Array.isArray(dataValues[alias])
                        ? dataValues[alias].map((item) => item.dataValues)
                        : dataValues[alias].dataValues;
                }
                return acc;
            }, {});

            return {
                ...remappedAttributes,
                ...transformedIncludes,
            };
        });

        return responseHandler(res, {
            data: transformedResults,
            status: "success",
            message: "Data fetched successfully",
            statusCode: 200,
            error: null,
        });
    } catch (error) {
        console.error(`Error fetching records from ${Model.name}: ${error.message}`);
        return responseHandler(res, {
            data: null,
            status: "error",
            message: "Internal server error",
            statusCode: 500,
            error: error.message,
        });
    }
};

const BulkCreate =(Model,Attributes)=> async (req, res) => {
    try {
      const { user, records,extra } = req.body; // Assuming `records` is an array of objects to be processed
      let results = []; // Array to hold results for each record
  
      if (!Array.isArray(records) || records.length === 0) {
        return responseHandler(res, {
          data: null,
          status: "error",
          message: "No records provided",
          statusCode: 400,
          error: "Invalid input",
        });
      }
  
      // Step 1: Loop through each record and process it
      for (const recordData of records) {
        let recordResult = {}; // Hold the result for the current record
  
        // Step 2: Create the new record
        const finalRecordData = {
          ...recordData,
          user,
          status:true,
          a_qty:recordData.qty,
          ...extra
        };
  
        const record = await Model.create(finalRecordData);
        console.log(`Created a new record in ${Model.name}: ${JSON.stringify(record)}`);
  
        Logger.info(`Created a new record in ${Model.name}: ${JSON.stringify(record)}`);
  
        // Step 3: Format the response for this record and push it to the results
        recordResult = {
          status: "success",
          message: "Record created successfully",
          statusCode: 200,
          data: aliasResponseData(record, Attributes),
          error: null,
        };
        results.push(recordResult);
      }
  
      // Step 4: Return the results for all records
      return responseHandler(res, {
        data: results,
        status: "success",
        message: "Records processed successfully",
        statusCode: 200,
        error: null,
      });
    } catch (error) {
      console.error(`Error creating records in ${Model.name}: ${error.message}`);
      return responseHandler(res, {
        data: null,
        status: "error",
        message: "Internal server error",
        statusCode: 500,
        error: error.message,
      });
    }
  };
  

  const getAllData =
  (Model, Attributes, includeModels = [], lenModal, avgModal) =>
  async (req, res) => {
    const { user, site } = req.body;

    try {
      const whereCondition = {
        d: 0,
        [Op.and]: [
          { [Op.or]: [{ user: user || null }, { user: null }] },
        ],
        site: site,
      };
      const where = {
        d: 0,
        [Op.and]: [
          { [Op.or]: [{ user: user || null }, { user: null }] },
        ],
        id: site,
      };

      // Fetch all data with the main model
      const allData = await Model.findAll({
        where: where,
        include: includeModels,
      });

      const transformedResults = allData.map((row) => {
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

      // Calculate task length
      const taskLength = await lenModal.count({
        where: whereCondition,
      });

      // Fetch averages and chart data
      const avgData = await getSiteDetails(whereCondition, avgModal);

      const response = {
        results: transformedResults,
        averages: avgData,
        taskLength: taskLength,
      };

      console.log(`Fetched records from ${Model.name}.`);
      return responseHandler(res, {
        data: response,
        status: "success",
        message: "Data fetched successfully",
        statusCode: 200,
        error: null,
      });
    } catch (error) {
      console.error(`Error fetching records from ${Model.name}: ${error.message}`);
      return responseHandler(res, {
        data: null,
        status: "error",
        message: "Internal server error",
        statusCode: 500,
        error: error.message,
      });
    }
  };

const getSiteDetails = async (whereCondition, avgModal) => {
    // Calculate overall average percentage
    const averagePercentageData = await avgModal.findOne({
      where: whereCondition,
      attributes: [[Sequelize.fn("AVG", Sequelize.col("percentage")), "averagePercentage"]],
      raw: true, // Returns a plain object instead of a Sequelize instance
    });

    const averagePercentage = averagePercentageData
      ? parseFloat(averagePercentageData.averagePercentage) || 0
      : 0;

      const averages = await avgModal.findAll({
        attributes: [
          "task", // Group by task ID
          [Sequelize.fn("AVG", Sequelize.col("percentage")), "averagePercentage"], // Calculate average percentage
        ],
        include: [
          {
            model: Task, // Ensure Task model is properly included
            as: "Task", // Match the alias in the association
            attributes: ["id", "name"], // Fetch only the required fields
            required: true, // Ensures only records with a matching Task are included
          },
        ],
        where: whereCondition, // Apply your condition
        group: ["task", "Task.id"], // Group by task ID and Task ID
      });
      const transformedAverages = averages.map((avg) => {
        const data = avg.dataValues;
        const taskName = avg.Task?.name || null; // Extract the task name from the included model
        return {
          task: data.task, // Task ID
          taskName, // Task Name
          averagePercentage: parseFloat(data.averagePercentage), // Calculated average
        };
      });
      
      console.log(transformedAverages);
      

    return {
      ChartData: transformedAverages ,
      Percentage: averagePercentage || 0,
    };
};

const getStat =()=> async (req, res) => {
  try {
    const { site, task, user } = req.body;
    const whereCondition = {
      d: 0,
      status: 1,
      [Op.and]: [{ [Op.or]: [{ user: user }, { user: null }] }],
      site: site,
      task: task,
    };
    const expenseWhere={
      d: 0,
      [Op.and]: [{ [Op.or]: [{ user: user }, { user: null }] }],
      site: site,
      task: task,
    }
    
    const today = new Date().toISOString().split("T")[0];

    // Expense totals
    const ExpenseTotal = await Expense.sum("amount", { where: expenseWhere });
    const TodayExpenseTotal = await Expense.sum("amount", {
      where: {
        ...expenseWhere,
        created_at: {
          [Op.between]: [`${today} 00:00:00`, `${today} 23:59:59`],
        },
      },
    });

    // Issue totals
    const IssueTotalData = await Issue.findAndCountAll({ where: whereCondition });
    const TodayIssueTotalData = await Issue.findAndCountAll({
      where: {
        ...whereCondition,
        created_at: {
          [Op.between]: [`${today} 00:00:00`, `${today} 23:59:59`],
        },
      },
    });

    // Equipment & Material Requests
    const equipmentData = await equipment_request.findAndCountAll({ where: whereCondition });
    const materialData = await material_request.findAndCountAll({ where: whereCondition });

    // Latest percentage from TaskTimeline
    const latestEntry = await TaskTimeline.findOne({
      where: expenseWhere,
      order: [["entry_date", "DESC"]], // Sort by latest entry_date
      attributes: ["percentage"], // Select only the percentage column
    });

    const latestPercentage = latestEntry ? latestEntry.percentage : 0; // Handle null case

    const response = {
      percentage: latestPercentage,
      Equipment: {
        request: equipmentData.count,
        accepted: equipmentData.rows.filter((item) => item.status === "Approved").length,
        rejected: equipmentData.rows.filter((item) => item.status === "Rejected").length,
      },
      Material: {
        request: materialData.count,
        accepted: materialData.rows.filter((item) => item.status === "Approved").length,
        rejected: materialData.rows.filter((item) => item.status === "Rejected").length,
      },
      Issue: {
        today: TodayIssueTotalData.count,
        total: IssueTotalData.count,
      },
      Expense: {
        total: ExpenseTotal,
        today: TodayExpenseTotal,
      },
    };

    return responseHandler(res, {
      data: response,
      status: "success",
      message: "Data fetched successfully",
      statusCode: 200,
      error: null,
    });

  } catch (error) {
    console.error(`Error fetching records: ${error.message}`);
    console.log(error);
    
    return responseHandler(res, {
      data: null,
      status: "error",
      message: "Internal server error",
      statusCode: 500,
      error: error.message,
    });
  }
};

const getDashboardData =()=> async (req, res) => {
    try {
      const { user } = req.body;
  
      const whereCondition = {
        d: 0,
        status: 1,
        [Op.and]: [{ [Op.or]: [{ user: user }, { user: null }] }],
      };
  
      const expenseWhere = {
        d: 0,
        [Op.and]: [{ [Op.or]: [{ user: user }, { user: null }] }],
      };
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
      const currentYear = currentDate.getFullYear();


      // Run multiple queries in parallel using Promise.all()
      const [
        site,
        task,
        authUserCount,
        issue,
        monthWiseExpense,
        latestExpenses,
        thisMonthExpense,
        totalExpense,
        equipmentTransferSums,
        materialTransferSums
      ] = await Promise.all([
        Site.findAndCountAll({ where: whereCondition }),
        Task.findAndCountAll({ where: whereCondition }),
        AuthUser.count({ where:{ ...whereCondition,type :'user'} }), // Use count() instead of findAndCountAll()
        Issue.findAndCountAll({ where: whereCondition }),
        Expense.findAll({
          attributes: [
            [Sequelize.fn("DATE_FORMAT", Sequelize.col("created_at"), "%Y-%m"), "month"],
            [Sequelize.fn("SUM", Sequelize.col("amount")), "total_amount"],
            [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
          ],
          where: expenseWhere,
          group: [Sequelize.fn("DATE_FORMAT", Sequelize.col("created_at"), "%Y-%m")],
          order: [[Sequelize.fn("DATE_FORMAT", Sequelize.col("created_at"), "%Y-%m"), "ASC"]],
        }),
        Expense.findAll({
          attributes:expenseMasterAttributes, // Ensure required attributes are specified
          where: expenseWhere,
          order: [["created_at", "DESC"]],
          limit: 5,
        }),
        Expense.findOne({
          attributes: [[Sequelize.fn("SUM", Sequelize.col("amount")), "this_month_total"]],
          where: {
            ...expenseWhere,
            [Op.and]: [
              Sequelize.where(Sequelize.fn("MONTH", Sequelize.col("created_at")), currentMonth),
              Sequelize.where(Sequelize.fn("YEAR", Sequelize.col("created_at")), currentYear),
            ],
          },
        }),
        Expense.findOne({
          attributes: [[Sequelize.fn("SUM", Sequelize.col("amount")), "total_expense"]],
          where: expenseWhere,
        }),
        equipment_request.findAll({
          attributes: [
            "transfer",
            [Sequelize.fn("SUM", Sequelize.col("qty")), "total_qty"]
          ],
          where: whereCondition,
          group: ["transfer"]
        }),
        material_request.findAll({
          attributes: [
            "transfer",
            [Sequelize.fn("SUM", Sequelize.col("qty")), "total_qty"]
          ],
          where: whereCondition,
          group: ["transfer"]
        })
      ]);
      console.log(equipmentTransferSums);
      
      const formatTransferData = (data) => {
        return {
          inv: data.find(item => Number(item.dataValues.transfer) === 1)?.dataValues.total_qty || 0,
          site:  data.find(item => Number(item.dataValues.transfer) === 2)?.dataValues.total_qty || 0,
          purchase:  data.find(item => Number(item.dataValues.transfer) === 3)?.dataValues.total_qty || 0,
        };
      };
  
      const response = {
        site: site.count,
        task: task.count,
        Equipment: formatTransferData(equipmentTransferSums),
        Material: formatTransferData(materialTransferSums),
        issue: issue.count,
        user: authUserCount,
        LatestExpense: latestExpenses,
        MonthWiseExpense: monthWiseExpense,
        ThisMonthExpense: thisMonthExpense?.dataValues?.this_month_total || 0, // Avoid undefined values
        TotalExpense: totalExpense?.dataValues?.total_expense || 0
      };
      console.log(response);
      
  
      return responseHandler(res, {
        data: response,
        status: "success",
        message: "Data fetched successfully",
        statusCode: 200,
        error: null,
      });
  
    } catch (error) {
      console.error(`Error fetching records: ${error.message}`);
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
  getAllDataByCondition,
  CommonGetForAll,
  BulkCreate,
  getAllData,
  getStat,
  getDashboardData
};
