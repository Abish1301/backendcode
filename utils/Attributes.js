const authAttributes = [
    ['email', 'EMAIL'], 
  ]; 

const authUserAttributes = [
    ['code', 'USER_CODE'],
    ['name', 'USER_NAME'],
    ['description', 'USER_DESCRIPTION'],
    ['profile_image', 'USER_PROFILE_IMAGE'],
    ['email', 'USER_EMAIL'],
    ['mobile', 'USER_MOBILE'],
    ['address', 'USER_ADDRESS'],
    ['type', 'USER_TYPE'],
  ];

  const roleAttributes = [
    ['name', 'ROLE_NAME'],
    ['code', 'ROLE_CODE'],
    ['description', 'ROLE_DESCRIPTION'],
    ['status', 'ROLE_STATUS'],
  ];

  const unitAttributes = [
    ['name', 'UNIT_NAME'],
    ['code', 'UNIT_CODE'],
    ['status', 'UNIT_STATUS'],
  ];
  const taxAttributes = [
    ['name', 'TAX_NAME'],
    ['description', 'TAX_DESCRIPTION'],
    ['status', 'TAX_STATUS'],
    ['start_date', 'TAX_START_DATE'],
    ['end_date', 'TAX_END_DATE'],
    ['percentage', 'TAX_PERCENTAGE'],
  ];
  const materialCategoryAttributes = [
    ['name', 'MaterialCategory_NAME'],
    ['code', 'MaterialCategory_CODE'],
    ['status', 'MaterialCategory_STATUS'],
  ];
  
  module.exports = { roleAttributes, authUserAttributes, authAttributes, unitAttributes,taxAttributes, materialCategoryAttributes };