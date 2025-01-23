const { responseHandler, aliasResponseData, Logger } = require("../utils");
const { Op } = require("sequelize");
const { convertToSequelizeInclude } = require("../utils/OtherExports");

const createWODuplicates = (Model, Attributes) => async (req, res) => {
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


module.exports = { createWODuplicates, getAllByCondition, getAllById }