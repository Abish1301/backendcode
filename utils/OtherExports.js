const aliasResponseData = (data, attributes) => {
    const result = {};
    attributes.forEach(([key, alias]) => {
      if (data[key] !== undefined) {
        result[alias] = data[key];
      }
    });
    return result;
  };

const aliasResponseObjectData = (dataArray, attributes) => {
    if (!Array.isArray(dataArray)) {
      throw new Error('dataArray must be an array of objects');
    }
  
    return dataArray.map(data => {
      const result = {};
      attributes.forEach(([key, alias]) => {
        if (data[key] !== undefined) {
          result[alias] = data[key];
        }
      });
      return result;
    });
  };

  
const aliasResponseObjectDatainclude = (dataArray, attributes, includeModels = []) => {
  if (!Array.isArray(dataArray)) {
    throw new Error('dataArray must be an array of objects');
  }

  return dataArray.map(data => {
    // Use reduce to build the result object
    const result = attributes.reduce((acc, [key, alias]) => {
      if (data[key] !== undefined) {
        acc[alias] = data[key];
      }
      return acc;
    }, {});

    // Handle included models
    includeModels.forEach(includeModel => {
      const includeData = data[includeModel.as];
      if (includeData) {
        const { dataValues } = includeData;
        // Merge the includeModel data with the result
        Object.assign(result, dataValues);
      } else {
        console.log(`No data found for alias: ${includeModel.as}`);
      }
    });

    return result;
  });
};

  
  module.exports = { aliasResponseData, aliasResponseObjectData,aliasResponseObjectDatainclude };
  

