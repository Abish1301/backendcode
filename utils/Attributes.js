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
  ['screens', 'ROLE_SCREENS']
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
const expenseMasterAttributes = [
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


const issueMasterAttributes = [
  ['name', '  ISSUE_NAME'],
  ['site_type', '  ISSUE_SITE_TYPE'],
  ['remarks', '  ISSUE_REMARK']
]
const materialMainInventoryAttributes = [
  ['name', ' MAIN_INVENTORY_MATERIAL_NAME'],
  ['code', ' MAIN_INVENTORY_MATERIAL_CODE'],
  ['hsn_code', ' MAIN_INVENTORY_MATERIAL_HSN'],
  ['description', '  MAIN_INVENTORY_MATERIAL_DESCRIPTION'],
  ['unit', ' MAIN_INVENTORY_MATERIAL_UNIT'],
  ['category', ' MAIN_INVENTORY_MATERIAL_CATEGORY'],
  ['material_image', ' MAIN_INVENTORY_MATERIAL_IMAGE'],
  ['alert_min_stock', '  MAIN_INVENTORY_MATERIAL_ALEART_MIN_STOCK'],
  ['unit_rent_price', '  MAIN_INVENTORY_MATERIAL_UNIT_RENT_PRICE'],
  ['brand_name', ' MAIN_INVENTORY_MATERIAL_BRAND_NAME'],
  ['dimensions', ' MAIN_INVENTORY_MATERIAL_DIMENSIONS'],
  ['weight', ' MAIN_INVENTORY_MATERIAL_WEIGHT'],
  ['color', '  MAIN_INVENTORY_MATERIAL_COLOR'],
  ['status', ' MAIN_INVENTORY_MATERIAL_STATUS'],
  ['i_stock', '  MAIN_INVENTORY_MATERIAL_IN_STOCK']]


  const equipmentMainInventoryAttributes = [
    ['name', ' MAIN_INVENTORY_EQUIPMENT_NAME'],
    ['code', ' MAIN_INVENTORY_EQUIPMENT_CODE'],
    ['description', '  MAIN_INVENTORY_EQUIPMENT_DESCRIPTION'],
    ['unit', ' MAIN_INVENTORY_EQUIPMENT_UNIT'],
    ['category', ' MAIN_INVENTORY_EQUIPMENT_CATEGORY'],
    ['material_image', ' MAIN_INVENTORY_EQUIPMENT_IMAGE'],
    ['alert_min_stock', '  MAIN_INVENTORY_EQUIPMENT_ALEART_MIN_STOCK'],
    ['unit_rent_price', '  MAIN_INVENTORY_EQUIPMENT_UNIT_RENT_PRICE'],
    ['brand_name', ' MAIN_INVENTORY_EQUIPMENT_BRAND_NAME'],
    ['dimensions', ' MAIN_INVENTORY_EQUIPMENT_DIMENSIONS'],
    ['weight', ' MAIN_INVENTORY_EQUIPMENT_WEIGHT'],
    ['color', '  MAIN_INVENTORY_EQUIPMENT_COLOR'],
    ['status', ' MAIN_INVENTORY_EQUIPMENT_STATUS'],
    ['i_stock', '  MAIN_INVENTORY_EQUIPMENT_IN_STOCK']]

    const taskMasterAttributes = [
      ['name' ,'TASK_NAME'],
      ['description' ,'TASK_DESCRIPTION'],
      ['status' ,'TASK_STATUS'],
      ['site' ,'TASK_SITE'],
      ['search_tags' ,'TASK_SEARCH_TAGS'],
      ['work_category' ,'TASK_WORK_CATEGORY'],
      ['priority' ,'TASK_PRIORITY'],
      ['start_date' ,'TASK_START_DATE'],
      ['end_date' ,'TASK_END_DATE'],
      ['attachement' ,'TASK_ATTACHEMENT'],
    ]

module.exports = { roleMaterAttributes, authUserAttributes, authAttributes, unitAttributes, taxAttributes, materialCategoryAttributes, siteMasterAttributes, expenseMasterAttributes, expenseHeadAttributes, issueMasterAttributes, materialMainInventoryAttributes, equipmentMainInventoryAttributes, taskMasterAttributes };