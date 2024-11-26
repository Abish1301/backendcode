const FindDuplicate = async (Model, field, data) => {
    const condition = {
      [field]: data[field],
      user: data.user,
    };
  
    const result = await Model.findAndCountAll({ where: condition });
    return result.count;
  };
  
  module.exports = FindDuplicate;
  