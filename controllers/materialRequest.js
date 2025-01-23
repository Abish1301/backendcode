const { Sequelize, Op } = require("sequelize");
const { responseHandler } = require("../utils");

// Common helper functions
const createBaseWhereCondition = (search, searchFields, user, m_status = 'Approved') => ({
  d: 0,
  [Op.and]: [
    ...(search ? [{
      [Op.or]: searchFields.map(field => ({
        [field]: { [Op.like]: `%${search}%` }
      }))
    }] : []),
    { [Op.or]: [{ user: user || null }, { user: null }] },
    ...(m_status !== undefined && m_status !== null ? [{ m_status }] : [{ m_status: 'Approved' }])
  ]
});

const transformResults = (rows, Attributes, includeModels) => {
  return rows.map(row => {
    const dataValues = row.dataValues;
    
    const remappedAttributes = Object.fromEntries(
      Attributes.filter(([originalKey]) => dataValues[originalKey] !== undefined)
        .map(([originalKey, aliasKey]) => [aliasKey, dataValues[originalKey]])
    );

    const transformedIncludes = Object.fromEntries(
      includeModels
        .filter(model => dataValues[model.as])
        .map(model => [
          model.as,
          Array.isArray(dataValues[model.as])
            ? dataValues[model.as].map(item => item.dataValues)
            : dataValues[model.as].dataValues
        ])
    );

    return {
      ...remappedAttributes,
      ...transformedIncludes
    };
  });
};

const createPaginationResponse = (count, page, limit, results) => ({
  count: Array.isArray(count) ? count.length : count,
  totalPages: Math.ceil((Array.isArray(count) ? count.length : count) / limit),
  currentPage: parseInt(page, 10),
  results
});

// Main controller functions
const InventoryOverAll = (Model, searchFields = [], Attributes, includeModels = []) => async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const { user,filter, site } = req.body;
  const siteid = site||null;
  // const siteid = 2;

  const offset = (page - 1) * limit;

  try {
    const whereCondition = {
      ...createBaseWhereCondition(search, searchFields, user),
     
      ...(siteid === null && {  transfer: 1 }) ,
      ...filter,
      site: siteid !== null ? siteid : null, 
      ...(siteid === null && { task: null }) 
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
      group: ['material', 'm_status', ...includeModels.map(model => `${model.as}.id`)],
      include: includeModels,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      raw: false
    });

    if (!count.length) {
      return responseHandler(res, {
        data: {},
        status: "No Data",
        message: "No data found",
        statusCode: 200
      });
    }

    const transformedResults = transformResults(rows, Attributes, includeModels)
      .map(result => ({
        ...result,
        qty: parseInt(result.qty) || 0,
        a_qty: parseInt(result.a_qty) || 0
      }));

    return responseHandler(res, {
      data: createPaginationResponse(count, page, limit, transformedResults),
      status: "success",
      message: "Data fetched successfully",
      statusCode: 200
    });
  } catch (error) {
    console.error('Error in InventoryOverAll:', error);
    return responseHandler(res, {
      status: "error",
      message: "Internal server error",
      statusCode: 500,
      error: error.message
    });
  }
};

const InventoryEntry = (Model, searchFields = [], Attributes, includeModels = []) => async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const { user, site, task, m_status, filter } = req.body;
  const siteid = site||null;
  // const siteid = 2;

  try {
    const whereCondition = {
      ...createBaseWhereCondition(search, searchFields, user, m_status),
      ...(siteid !== null && { site: siteid || null }),
      // ...(siteid !== null && { task: task || null }),
      ...filter,
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
      offset: (page - 1) * limit,
      include: includeModels
    });
    
    const allData = await Model.findAll({
      where: whereCondition,
    });

    const today = new Date().toISOString().split('T')[0];

    const totals = allData.reduce((acc, row) => {
      const qty = parseInt(row.qty) || 0;
      const createdDate = new Date(row.created_at).toISOString().split('T')[0];
      
      // Overall totals
      if (row.transfer === 1) {
        acc.overallTotals.toInventoryTotal += qty;
      } else if (row.transfer === 2) {
        acc.overallTotals.siteTransferTotal += qty;
      }

      // Today's totals
      if (createdDate === today) {
        if (row.transfer === 1) {
          acc.todayTotals.toInventoryTotal += qty;
        } else if (row.transfer === 2) {
          acc.todayTotals.siteTransferTotal += qty;
        }
      }

      return acc;
    }, {
      overallTotals: { toInventoryTotal: 0, siteTransferTotal: 0 },
      todayTotals: { toInventoryTotal: 0, siteTransferTotal: 0 }
    });

    const transformedResults = transformResults(rows, Attributes, includeModels);

    return responseHandler(res, {
      data: {
        count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page, 10),
        results: transformedResults,
        totals: {
          overall: {
            toInventory: totals.overallTotals.toInventoryTotal,
            siteTransfer: totals.overallTotals.siteTransferTotal
          },
          today: {
            toInventory: totals.todayTotals.toInventoryTotal,
            siteTransfer: totals.todayTotals.siteTransferTotal
          }
        }
      },
      status: "success",
      message: "Data fetched successfully",
      statusCode: 200
    });

  } catch (error) {
    console.error('Error in InventoryEntry:', error);
    return responseHandler(res, {
      status: "error",
      message: "Internal server error",
      statusCode: 500,
      error: error.message
    });
  }
};



const Inventorylogs = (Model, searchFields = [], Attributes, includeModels = []) => async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;
  const { user, m_status, filter,site } = req.body;
  const siteid = site||null;
  // const siteid = 2;

  try {
    const whereCondition = {
      ...createBaseWhereCondition(search, searchFields, user, m_status),
      transfer: { [Op.ne]: 3 },
      ...(siteid !== null && { site: siteid || null }),

      ...filter,
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
      offset: (page - 1) * limit,
      include: includeModels
    });

    if (!count) {
      return responseHandler(res, {
        data: {},
        status: "No Data",
        message: "No data found",
        statusCode: 200
      });
    }

    const transformedResults = transformResults(rows, Attributes, includeModels);

    return responseHandler(res, {
      data: createPaginationResponse(count, page, limit, transformedResults),
      status: "success",
      message: "Data fetched successfully",
      statusCode: 200
    });
  } catch (error) {
    console.error('Error in Inventorylogs:', error);
    return responseHandler(res, {
      status: "error",
      message: "Internal server error",
      statusCode: 500,
      error: error.message
    });
  }
};


const getAllDataByCondition =
  (Model, searchFields = [], Attributes, includeModels = []) =>
  async (req, res) => {
    const { page = 1, limit = 10, search } = req.query;
    const { user, site, task, filter={} } = req.body;
    const { call, ...rest } = filter;

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
          ...(call === 'tab'
            ? [
                ...(site !== undefined && site !== null
                  ? [{ site }] // Filter by `site` value if it exists
                  : [{ site: { [Op.ne]: null } }]), // Exclude rows with `site: null`
                { task: { [Op.ne]: null } }, // Exclude rows with `task: null`
              ]
            : [
                ...(site !== undefined && site !== null ? [{ site }] : []),
                ...(task !== undefined && task !== null ? [{ task }] : []),
              ]),
        ],
        ...rest,
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

module.exports = { InventoryOverAll, InventoryEntry, Inventorylogs, getAllDataByCondition };
