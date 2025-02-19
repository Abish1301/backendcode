const { Op } = require('sequelize');

const FindDuplicate = async (Model, fields, data) => {
  // Dynamically construct the `Op.or` condition for the specified fields
  const fieldConditions = fields.map((field) => ({
    [field]: data[field],
  }));

  // Construct the condition object for the query
  const condition = {
    [Op.or]: fieldConditions, // Check if any of the fields match
    user: { [Op.or]: [null, data.user] }, // Check for user = null or user = data.user
    d: 0, // Assuming `d` is a soft delete flag (0 = active)
  };

  // If `id` is provided in the data, exclude it from the duplicate check
  if (data.id) {
    condition.id = { [Op.ne]: data.id }; // Exclude the current record by id
  }

  // Query the database and return the count of matching records
  const result = await Model.findAndCountAll({ where: condition });
  return result.count; // Return the count of records found
};

const FindDuplicateforUser = async (Model, fields, data) => {
  // Dynamically construct the `Op.or` condition for the specified fields
  
  const fieldConditions = fields.map((field) => ({
    [field]:data?.username
  }));

  // Construct the condition object for the query
  const condition = {
    [Op.or]: fieldConditions, // Check if any of the fields match
  };

  // If `id` is provided in the data, exclude it from the duplicate check
  if (data.id) {
    condition.id = { [Op.ne]: data.id }; // Exclude the current record by id
  }

  // Query the database and return the count of matching records
  const result = await Model.findAndCountAll({ where: condition });
  return result.count; // Return the count of records found
};

const FindDuplicatewithoutUser = async (Model, fields, data) => {
 
  // Dynamically construct the `Op.or` condition for the specified fields
  const fieldConditions = fields.map((field) => ({
    [field]: data[field],
  }));
 
  // Construct the condition object for the query
  const condition = {
    [Op.or]: fieldConditions,
  };
 
  // If `id` is provided in the data, exclude it from the duplicate check
  if (data.id) {
    condition.id = { [Op.ne]: data.id };
  }
 
  // Query the database and return the count of matching records
  const result = await Model.findAndCountAll({ where: condition });
  return result.count;
};
 

module.exports = {FindDuplicate, FindDuplicateforUser, FindDuplicatewithoutUser};
