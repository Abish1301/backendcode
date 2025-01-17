const { responseHandler, aliasResponseData, Logger } = require("../utils");
const { Op } = require("sequelize");

const createWODuplicates = (Model,Attributes) => async (req, res) => {
    try {  
      const record = await Model.create(req.body);
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

  const getAllByCondition = (Model, Attributes, includeModels = [], filter = {}) =>
    async (req, res) => {
      const { page = 1, limit = 10, search } = req.query;
      try {
        const offset = (page - 1) * limit;
  
        const convertToSequelizeInclude = (includes) => {
          return includes.map((include) => {
            const sequelizeInclude = {
              model: include.model,
              as: include.as,
              attributes: include.attributes
            };
  
            if (include.includeModels) {
              sequelizeInclude.include = convertToSequelizeInclude(include.includeModels);
            }
  
            return sequelizeInclude;
          });
        };
  
        const whereCondition = {
          ...(search && {
            [Op.or]: searchFields.map((field) => ({
              [field]: { [Op.like]: `%${search}%` },
            })),
          }),
          ...filter,
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
  module.exports = {createWODuplicates , getAllByCondition}