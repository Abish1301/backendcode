const { Sequelize, Op } = require("sequelize");
const { responseHandler } = require("../utils");

const InventoryOverAll = (Model, searchFields = [], Attributes, includeModels = []) => 
    async (req, res) => {
      const { page = 1, limit = 10, search } = req.query;
      const { user } = req.body;
      const offset = (page - 1) * limit;
  
      try {
        const whereCondition = {
          transfer: 1,
          site: null,
          task: null,
          m_status: 'Approved',
          user: user || 1,
          d: 0,
          ...(search && {
            [Op.or]: searchFields.map(field => ({
              [field]: { [Op.like]: `%${search}%` }
            }))
          })
        };
  
        const { count, rows } = await Model.findAndCountAll({
          attributes: [
            'material',
            'm_status',
            [Sequelize.fn('SUM', Sequelize.col('qty')), 'qty'],
            [Sequelize.fn('SUM', Sequelize.col('a_qty')), 'a_qty'],
            ...includeModels.map(model => [
              Sequelize.col(`${model.as}.id`),
              `${model.as}.id`
            ])
          ],
          where: whereCondition,
          group: [
            'material', 
            'm_status',
            ...includeModels.map(model => `${model.as}.id`)
          ],
          include: includeModels,
          limit: parseInt(limit, 10),
          offset: parseInt(offset, 10),
          raw: false
        });
  
        const totalPages = Math.ceil(count.length / limit);
  
        const transformedResults = rows.map((row) => {
          const dataValues = row.dataValues;
          
          const totals = {
            qty: parseInt(dataValues.qty) || 0,
            a_qty: parseInt(dataValues.a_qty) || 0
          };
  
          const remappedAttributes = {};
          Attributes.forEach(([originalKey, aliasKey]) => {
            if (dataValues[originalKey] !== undefined) {
              remappedAttributes[aliasKey] = dataValues[originalKey];
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
            ...totals,
            ...transformedIncludes,
          };
        });
  
        const response = {
          count: count.length,
          totalPages,
          currentPage: parseInt(page, 10),
          results: transformedResults,
        };
  
        return responseHandler(res, {
          data: response,
          status: "success",
          message: "Data fetched successfully",
          statusCode: 200,
          error: null
        });
      } catch (error) {
        console.error(`Error fetching records: ${error.message}`);
        return responseHandler(res, {
          data: null,
          status: "error",
          message: "Internal server error",
          statusCode: 500,
          error: error.message
        });
      }
    };
  
module.exports = { InventoryOverAll };
