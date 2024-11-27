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

  const roleMaterAttributes = [
    ['name', 'ROLE_NAME'],
    ['code', 'ROLE_CODE'],
    ['description', 'ROLE_DESCRIPTION'],
    ['status', 'ROLE_STATUS'],
    ['screens','ROLE_SCREENS']
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
    ['name', 'MATERIALCATEGORY_NAME'],
    ['code', 'MATERIALCATEGORY_CODE'],
    ['status', 'MATERIALCATEGORY_STATUS'],
  ];
  const siteMasterAttributes = [
    ['name', 'SITE_NAME'],
    ['description', 'SITE_DESCRIPTION'],
    ['site_profile_image', 'SITE_PROFILE_IMAGE'],
    ['location_name', 'SITE_LOCATION_NAME'],
    ['location_description', 'SITE_LOCATION_DESCRIPTION'],
    ['geo_location', 'SITE_GEO_LOCATION'],
    ['start_date', 'SITE_START_DATE'],
    ['site_incharge', 'SITE_INCHARGE'],
    ['estimation_amount', 'SITE_ESTIMATION_AMOUNT'],
    ['end_date', 'SITE_END_DATE'],
    ['status', 'SITE_STATUS'],

  ];
  const expenseMasterAttributes=[
    ['name', 'EXPENSE_NAME'],
    ['type', 'EXPENSE_TYPE'],
    ['site', 'EXPENSE_SITE'],
    ['date', 'EXPENSE_DATE'],
    ['attachement', 'EXPENSE_ATTACHEMENT'],
    ['amount', 'EXPENSE_AMOUNT'],
    ['remark', 'EXPENSE_REMARK']
  ]
  
  const expenseHeadAttributes = [
    ['name', 'EXPENSE_NAME'],
    ['status', 'EXPENSE_STATUS'],
  ];
  
  module.exports = { roleMaterAttributes, authUserAttributes, authAttributes, unitAttributes,taxAttributes, materialCategoryAttributes, siteMasterAttributes, expenseMasterAttributes, expenseHeadAttributes };