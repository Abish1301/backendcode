const { Op } = require('sequelize');
const { responseHandler, aliasResponseData } = require('../utils');
const { aliasResponseObjectData } = require('../utils/OtherExports');
const FindDuplicate = require('../utils/checkDuplicate');

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
const getAllByCondition = (Model, searchFields = [], Attributes, includeModels = []) => async (req, res) => {
  console.log(searchFields);

  const { page=1, limit=10, search } = req.query;
  console.log(search);

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
      [Op.and]: [  // Combine everything using Op.and
        {
          [Op.or]: [
            { user: user || null },  // Either user from the query or null
            { user: null },  // Also include rows where user is null
          ],
        },
      ],
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
        statusCode: 500,
      });
    }

    const totalPages = Math.ceil(count / limit);

    const response = {
      count,
      totalPages,
      currentPage: parseInt(page, 10),
      results: aliasResponseObjectData(rows.map(row => row.dataValues), Attributes)

    };
    console.log(rows.map(row => row.dataValues));



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

    // Validate duplicates
    const count = await FindDuplicate(Model, field, req.body); // Await the result
    if (count > 0) {
      return responseHandler(res, {
        data: null,
        status: 'conflict',
        message: 'Duplicate record found',
        statusCode: 409,
        error: 'Duplicate record exists',
      });
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
const updateByID = (Model, Attributes) => async (req, res) => {
  try {
    const { id, ...data } = req.body;
    const record = await Model.update(data, { where: { id } });
    console.log(`Updated record with ID ${id} in ${Model.name}`);
    console.log(record);
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


module.exports = {
  getAll,
  create,
  update,
  deleteRecord,
  getAllByCondition,
  createWODuplicates,
  updateByID
};
