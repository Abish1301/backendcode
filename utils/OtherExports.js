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

const aliasResponseDatainclude = (data, attributes, includeModels = []) => {
  const result = {}; // Result object to hold the transformed data

  // Map the attributes array to transform the main model fields
  attributes.forEach(([key, alias]) => {
    if (data[key] !== undefined) {
      result[alias] = data[key]; // Map the original data to alias names
    }
  });

  // Loop through the included models and extract their data
  includeModels.forEach(includeModel => {
    const includeData = data[includeModel.as]; // Get data for the associated model
    if (includeData) {
      // If data exists for this model, map its fields too
      const { dataValues } = includeData; 
      includeModel.attributes.forEach(([key, alias]) => {
        if (dataValues[key] !== undefined) {
          result[alias] = dataValues[key]; // Map the included model fields to aliases
        }
      });
    } else {
      console.log(`No data found for alias: ${includeModel.as}`);
    }
  });

  return result;
};

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
    
  module.exports = { aliasResponseData, aliasResponseObjectData,aliasResponseObjectDatainclude, aliasResponseDatainclude ,convertToSequelizeInclude};
  

