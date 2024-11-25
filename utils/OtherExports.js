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
  
  module.exports = { aliasResponseData, aliasResponseObjectData };
  

