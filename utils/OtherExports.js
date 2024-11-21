const aliasResponseData = (data, attributes) => {
    const result = {};
    attributes.forEach(([key, alias]) => {
      if (data[key] !== undefined) {
        result[alias] = data[key];
      }
    });
    return result;
  };

module.exports ={aliasResponseData}