// const { Op } = require('sequelize');

// const FindDuplicate = async (Model, fields, data) => {
//   // Dynamically construct the `Op.or` condition
//   const conditions = fields.map((field) => ({
//     [field]: data[field],
//   }));

//   // Construct the condition object for the query
//   const condition = {
//     [Op.or]: conditions,   // Check if any of the fields match
//     user: data.user,
//     user:null,       // Assuming `user` is required for filtering
//     d: 0,                  // Assuming `d` is a soft delete flag (0 = active)
//   };

//   // If `id` is provided in the data, exclude it from the duplicate check
//   if (data.id) {
//     condition.id = { [Op.ne]: data.id }; // Exclude the current record by id
//   }

//   // Query the database and return the count of matching records
//   const result = await Model.findAndCountAll({ where: condition });
//   return result.count;  // Return the count of records found
// };

// module.exports = FindDuplicate;




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

module.exports = FindDuplicate;
