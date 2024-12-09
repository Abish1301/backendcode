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
  ['profile_image', 'SITE_PROFILE_IMAGE'],
  ['location_name', 'SITE_LOCATION_NAME'],
  ['location_description', 'SITE_LOCATION_DESCRIPTION'],
  ['geo_location', 'SITE_GEO_LOCATION'],
  ['start_date', 'SITE_START_DATE'],
  ['incharge', 'SITE_INCHARGE'],
  ['estimation_amount', 'SITE_ESTIMATION_AMOUNT'],
  ['end_date', 'SITE_END_DATE'],
  ['status', 'SITE_STATUS'],

];
const expenseMasterAttributes = [
  ['name', 'EXPENSE_NAME'],
  ['type', 'EXPENSE_TYPE'],
  ['site', 'EXPENSE_SITE'],
  ['task', 'EXPENSE_TASK'],
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
  ['name', 'ISSUE_NAME'],
  ['site', 'ISSUE_SITE'],
  ['task', 'ISSUE_TASK'],
  ['remarks', 'ISSUE_REMARK']
]
const materialMainInventoryAttributes = [
  ['name', 'MAIN_INVENTORY_MATERIAL_NAME'],
  ['code', 'MAIN_INVENTORY_MATERIAL_CODE'],
  ['hsn_code', 'MAIN_INVENTORY_MATERIAL_HSN'],
  ['description', 'MAIN_INVENTORY_MATERIAL_DESCRIPTION'],
  ['unit', 'MAIN_INVENTORY_MATERIAL_UNIT'],
  ['category', 'MAIN_INVENTORY_MATERIAL_CATEGORY'],
  ['image', 'MAIN_INVENTORY_MATERIAL_IMAGE'],
  ['alert_min_stock', 'MAIN_INVENTORY_MATERIAL_ALEART_MIN_STOCK'],
  ['unit_rent_price', 'MAIN_INVENTORY_MATERIAL_UNIT_RENT_PRICE'],
  ['brand_name', 'MAIN_INVENTORY_MATERIAL_BRAND_NAME'],
  ['dimensions', 'MAIN_INVENTORY_MATERIAL_DIMENSIONS'],
  ['weight', 'MAIN_INVENTORY_MATERIAL_WEIGHT'],
  ['color', 'MAIN_INVENTORY_MATERIAL_COLOR'],
  ['status', 'MAIN_INVENTORY_MATERIAL_STATUS'],
  ['in_stock', 'MAIN_INVENTORY_MATERIAL_IN_STOCK']]


const equipmentMainInventoryAttributes = [
  ['name', 'MAIN_INVENTORY_EQUIPMENT_NAME'],
  ['code', 'MAIN_INVENTORY_EQUIPMENT_CODE'],
  ['description', 'MAIN_INVENTORY_EQUIPMENT_DESCRIPTION'],
  ['unit', 'MAIN_INVENTORY_EQUIPMENT_UNIT'],
  ['category', 'MAIN_INVENTORY_EQUIPMENT_CATEGORY'],
  ['image', 'MAIN_INVENTORY_EQUIPMENT_IMAGE'],
  ['alert_min_stock', 'MAIN_INVENTORY_EQUIPMENT_ALEART_MIN_STOCK'],
  ['unit_rent_price', 'MAIN_INVENTORY_EQUIPMENT_UNIT_RENT_PRICE'],
  ['brand_name', 'MAIN_INVENTORY_EQUIPMENT_BRAND_NAME'],
  ['dimensions', 'MAIN_INVENTORY_EQUIPMENT_DIMENSIONS'],
  ['weight', 'MAIN_INVENTORY_EQUIPMENT_WEIGHT'],
  ['color', 'MAIN_INVENTORY_EQUIPMENT_COLOR'],
  ['status', 'MAIN_INVENTORY_EQUIPMENT_STATUS'],
  ['in_stock', 'MAIN_INVENTORY_EQUIPMENT_IN_STOCK']]

const taskMasterAttributes = [
  ['name', 'TASK_NAME'],
  ['description', 'TASK_DESCRIPTION'],
  ['status', 'TASK_STATUS'],
  ['site', 'TASK_SITE'],
  ['search_tags', 'TASK_SEARCH_TAGS'],
  ['work_category', 'TASK_WORK_CATEGORY'],
  ['priority', 'TASK_PRIORITY'],
  ['start_date', 'TASK_START_DATE'],
  ['end_date', 'TASK_END_DATE'],
  ['attachement', 'TASK_ATTACHEMENT'],
]

const taskTimelineAttributes = [
  ['site', 'TASK_TIMELINE_SITE'],
  ['task', 'TASK_TIMELINE_TASK'],
  ['entry_date', 'TASK_TIMELINE_ENTRY_DATE'],
  ['percentage', 'TASK_TIMELINE_PERCENTAGE'],
  ['total_work_done', 'TASK_TIMELINE_WORK_DONE'],
  ['skilled_worker', 'TASK_TIMELINE_SKILLED_WORKER'],
  ['unskilled_worker', 'TASK_TIMELINE_UNSKILLED_WORKER'],
  ['total_working_hours', 'TASK_TIMELINE_TOTAL_WORKING_HOURS'],
  ['remarks', 'TASK_TIMELINE_REMARKS'],
  ['attachement1', 'TASK_TIMELINE_ATTACHEMENT1'],
  ['attachement2', 'TASK_TIMELINE_ATTACHEMENT2']
]

const workCategoryAttributes = [
  ['name', 'WORK_CATEGORY_NAME'],
  ['description', 'WORK_CATEGORY_DESCRIPTION'],
  ['status', 'WORK_CATEGORY_STATUS'],
];
const materialRequestAttributes = [
  ['name', 'NAME'],
  ['description', 'DESCRIPTION'],
  ['status', 'STATUS'],
  ['code', 'CODE'],
  ['task', 'TASK'],
  ['m_status', 'M_STATUS'],
  ['material', 'MATERIAL'],
  ['qty', 'QTY'],
  ['transfer', 'TRANSFER'],
  ['site', 'SITE'],
  ['created_at', 'DATE'],
];
const materialMainInventoryAttributesformaterialrequest = [
  ['name', 'MAIN_INVENTORY_MATERIAL_NAME'],
  ['code', 'MAIN_INVENTORY_MATERIAL_CODE'],
  ['hsn_code', 'MAIN_INVENTORY_MATERIAL_HSN'],
  ['description', 'MAIN_INVENTORY_MATERIAL_DESCRIPTION'],
  ['unit', 'MAIN_INVENTORY_MATERIAL_UNIT'],
  ['category', 'MAIN_INVENTORY_MATERIAL_CATEGORY'],
  ['image', 'MAIN_INVENTORY_MATERIAL_IMAGE'],
  ['alert_min_stock', 'MAIN_INVENTORY_MATERIAL_ALEART_MIN_STOCK'],
  ['unit_rent_price', 'MAIN_INVENTORY_MATERIAL_UNIT_RENT_PRICE'],
  ['brand_name', 'MAIN_INVENTORY_MATERIAL_BRAND_NAME'],
  ['dimensions', 'MAIN_INVENTORY_MATERIAL_DIMENSIONS'],
  ['weight', 'MAIN_INVENTORY_MATERIAL_WEIGHT'],
  ['color', 'MAIN_INVENTORY_MATERIAL_COLOR'],
  ['status', 'MAIN_INVENTORY_MATERIAL_STATUS'],
  ['in_stock', 'MAIN_INVENTORY_MATERIAL_IN_STOCK']]


  const equipmentRequestAttributes = [
    ['name', 'NAME'],
    ['description', 'DESCRIPTION'],
    ['status', 'STATUS'],
    ['code', 'CODE'],
    ['task', 'TASK'],
    ['e_status', 'E_STATUS'],
    ['equipment', 'EQUIPMENT'],
    ['qty', 'QTY'],
    ['transfer', 'TRANSFER'],
    ['site', 'SITE'],
    ['created_at', 'DATE'],
  ];


module.exports = { roleMaterAttributes, authUserAttributes, materialMainInventoryAttributesformaterialrequest,authAttributes, unitAttributes, taxAttributes, materialCategoryAttributes, siteMasterAttributes, expenseMasterAttributes, expenseHeadAttributes, issueMasterAttributes, materialMainInventoryAttributes, equipmentMainInventoryAttributes, taskMasterAttributes, taskTimelineAttributes, workCategoryAttributes,materialRequestAttributes, equipmentRequestAttributes };