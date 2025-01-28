const { responseHandler, aliasResponseData, Logger } = require("../utils");
const { Op } = require("sequelize");
const { convertToSequelizeInclude } = require("../utils/OtherExports");



const getAllByCondition = (Model, Attributes, includeModels = [], filter = {}) =>
  async (req, res) => {
    const { page = 1, limit = 10, search } = req.query;
    const {filter, user}=req.body ||{};
    try {
      const offset = (page - 1) * limit;


      const whereCondition = {
        ...(search && {
          [Op.or]: searchFields.map((field) => ({
            [field]: { [Op.like]: `%${search}%` },
          })),
        }),
        ...filter,
        d:0,
        user,
        ...(filter.created_at && {
          created_at: {
            [Op.between]: [
              `${filter.created_at} 00:00:00`, 
              `${filter.created_at} 23:59:59`,
            ],
          },
        }),
      };

      const { count, rows } = await Model.findAndCountAll({
        where: whereCondition,
        limit: parseInt(limit, 10),
        offset: parseInt(offset, 10),
        include: convertToSequelizeInclude(includeModels),
        distinct: true
      });
      // const totalQty = await Model.sum('qty', { where: whereCondition });      

      if (count === 0) {
        return responseHandler(res, {
          data: {},
          status: "No Data",
          message: "No data found",
          statusCode: 200,
        });
      }

      const totalPages = Math.ceil(count / limit);

      const transformData = (data) => {
        if (!data) return null;
        return data.get({ plain: true });
      };

      const transformedResults = rows.map(row => transformData(row));

      const response = {
        count,
        totalPages,
        currentPage: parseInt(page, 10),
        results: transformedResults,
        // totals:totalQty,
      };

      return responseHandler(res, {
        data: response,
        status: "success",
        message: "Data fetched successfully",
        statusCode: 200,
        error: null,
      });
    } catch (error) {
      console.error(`Error fetching records from ${Model.name}:`, error);
      return responseHandler(res, {
        data: null,
        status: "error",
        message: "Internal server error",
        statusCode: 500,
        error: error.message,
      });
    }
  };

const getAllById =
  (Model, Attributes, includeModels = [], filter = {}) =>
    async (req, res) => {
      const { page = 1, limit = 10 } = req.query;
      const { user, ...filters } = req.body; // Extract `id` and `user` from body
      try {
        const offset = (page - 1) * limit;

        let whereCondition;


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
      
        const { count, rows } = await Model.findAndCountAll({
          where: whereCondition,
          limit: parseInt(limit, 10),
          offset: parseInt(offset, 10),
          include: convertToSequelizeInclude(includeModels),
          distinct: true
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
          // data: response.count == 1 ? response.results : response,
          data:  response,

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


const createWODuplicates = (Model, Attributes,updateModel,updateModelAttributes) => async (req, res) => {
      try {
       
        const record = await Model.create(req.body);
        if (record) {
          
          const RequestData = await updateModel.findByPk(req.body.request);
          const updatedQty = Number(RequestData.a_qty) - Number(req.body.qty);
        
          const updateData = {
            a_qty: updatedQty,
          };
        
          // Use `returning` to get the updated row(s) (for databases that support it)
          const affectedRow = await updateModel.update(updateData, {
            where: { id: req.body.request },
          });          
        
          if (affectedRow > 0) {
            const updatedRow = await updateModel.findByPk(req.body.request);
        
            // You can include the updated row in the response if needed
            return responseHandler(res, {
              data: {
                newRecord: aliasResponseData(record, Attributes),
                updatedRequest: aliasResponseData(updatedRow,updateModelAttributes) // Include the updated row
              },
              status: "success",
              message: "Record created and updated successfully",
              statusCode: 200,
              error: null,
            });
          }
        }
        
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


    const deleteRecord = (Model, updateModel) => async (req, res) => {
      try {
        const { request, id, qty } = req.body;
      console.log( request, id, qty);
      
        // Validate the input
        if (!request || !id || typeof qty === "undefined") {
          return responseHandler(res, {
            data: null,
            status: "error",
            message: "Missing required fields",
            statusCode: 400,
            error: "Invalid request data",
          });
        }
    
        // Fetch the related record from updateModel
        const RequestData = await updateModel.findByPk(request);
    
        if (!RequestData) {
          return responseHandler(res, {
            data: null,
            status: "error",
            message: "Related record not found",
            statusCode: 404,
            error: "Invalid request ID",
          });
        }
    
        // Calculate updated quantity
        const updatedQty = Number(RequestData.a_qty) + Number(qty);
    
        // Update the quantity in updateModel
        const [affectedRow] = await updateModel.update(
          { a_qty: updatedQty },
          { where: { id: request } }
        );
    
        if (affectedRow > 0) {
          // Delete the record from Model
          const deletedRow = await Model.destroy({ where: { id } });
    
          if (deletedRow) {
            console.log(`Deleted record with ID ${id} from ${Model.name}`);
            Logger.info(`Deleted record with ID ${id} from ${Model.name}`);
    
            return responseHandler(res, {
              data: { id },
              status: "success",
              message: "Data deleted successfully",
              statusCode: 200,
              error: null,
            });
          } else {
            return responseHandler(res, {
              data: null,
              status: "error",
              message: "Failed to delete the record",
              statusCode: 500,
              error: "Delete operation failed",
            });
          }
        } else {
          return responseHandler(res, {
            data: null,
            status: "error",
            message: "Failed to update related record",
            statusCode: 500,
            error: "Update operation failed",
          });
        }
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
    

    const updateRecord = (Model, Attributes, updateModel) => async (req, res) => {
      try {
    
        // Validate the input
        if (!req.body.request || !req.body.id || typeof req.body.qty === 'undefined') {
          return responseHandler(res, {
            data: null,
            status: "error",
            message: "Missing required fields",
            statusCode: 400,
            error: "Invalid request data",
          });
        }
    
        // Find the related records
        const RequestData1 = await updateModel.findByPk(req.body.request);
        const RequestData2 = await Model.findByPk(req.body.id);
    
        if (!RequestData1 || !RequestData2) {
          return responseHandler(res, {
            data: null,
            status: "error",
            message: "Record not found",
            statusCode: 404,
            error: "Invalid IDs provided",
          });
        }
    
        // Calculate updated quantity
        const updatedQty =
          Number(RequestData1.a_qty) +
          Number(RequestData2.qty) -
          Number(req.body.qty);
    
        // Update the related model's data
        const [affectedRow] = await updateModel.update(
          { a_qty: updatedQty },
          { where: { id: req.body.request } }
        );
    
        if (affectedRow > 0) {
          // Update the main record
          const [updatedRow] = await Model.update(
            { qty: req.body.qty },
            { where: { id: req.body.id } }
          );
    
          if (updatedRow > 0) {
            // Fetch the updated record
            const updatedRecord = await Model.findByPk(req.body.id);
    
            console.log(`Updated record with ID ${req.body.id} from ${Model.name}`);
            Logger.info(`Updated record with ID ${req.body.id} from ${Model.name}`);
    
            return responseHandler(res, {
              data: aliasResponseData(updatedRecord, Attributes),
              status: "success",
              message: "Data updated successfully",
              statusCode: 200,
              error: null,
            });
          } else {
            return responseHandler(res, {
              data: null,
              status: "error",
              message: "Failed to update the main record",
              statusCode: 500,
              error: "Update failed",
            });
          }
        } else {
          return responseHandler(res, {
            data: null,
            status: "error",
            message: "Failed to update related data",
            statusCode: 500,
            error: "Update failed",
          });
        }
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
    
module.exports = { getAllByCondition, getAllById, createWODuplicates, deleteRecord, updateRecord }