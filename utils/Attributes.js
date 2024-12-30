const authAttributes = [
  ['email', 'email'],
];

const authUserAttributes = [
  ['code', 'code'],
  ['name', 'name'],
  ['description', 'description'],
  ['image', 'image'],
  ['email', 'email'],
  ['mobile', 'mobile'],
  ['address', 'address'],
  ['type', 'type'],
];

const roleMaterAttributes = [
  ['id', 'id'],
  ['name', 'name'],
  ['code', 'code'],
  ['description', 'description'],
  ['status', 'status'],
  ['screens', 'screens']
];

const unitAttributes = [
  ['id', 'id'],
  ['name', 'name'],
  ['code', 'code'],
  ['status', 'status'],
  ['user', 'user'],

];
const taxAttributes = [
  ['id', 'id'],
  ['name', 'name'],
  ['description', 'description'],
  ['status', 'status'],
  ['start_date', 'start_date'],
  ['end_date', 'end_date'],
  ['percentage', 'percentage'],
];
const materialCategoryAttributes = [
  ['id', 'id'],
  ['name', 'name'],
  ['code', 'code'],
  ['status', 'status'],
];
const siteMasterAttributes = [
  ['id', 'id'],
  ['name', 'name'],
  ['description', 'description'],
  ['image', 'image'],
  ['location_name', 'location_name'],
  ['location_description', 'location_description'],
  ['geo_location', 'geo_location'],
  ['start_date', 'start_date'],
  ['incharge', 'incharge'],
  ['estimation_amount', 'estimation_amount'],
  ['end_date', 'end_date_site'],
  ['status', 'status'],

];
const expenseMasterAttributes = [
  ['id', 'id'],
  ['name', 'name'],
  ['type', 'type'],
  ['site', 'site'],
  ['date', 'date'],
  ['image', 'image'],
  ['amount', 'amount'],
  ['remark', 'remark']
]

const expenseHeadAttributes = [
  ['id', 'id'],
  ['name', 'name'],
  ['status', 'status'],
];


const issueMasterAttributes = [
  ['id', 'id'],
  ['name', 'name'],
  ['site', 'site'],
  ['task', 'task'],
  ['remarks', 'remarks'],
  ['image', 'image'],
  ['status', 'status'],
  ['created_at', 'created_at'],

]
const materialMainInventoryAttributes = [
  ['id', 'id'],
  ['name', 'name'],
  ['code', 'code'],
  ['hsn_code', 'hsn_code'],
  ['description', 'description'],
  ['unit', 'unit'],
  ['category', 'category'],
  ['image', 'image'],
  ['alert_min_stock', 'alert_min_stock'],
  ['unit_rent_price', 'unit_rent_price'],
  ['brand_name', 'brand_name'],
  ['dimensions', 'dimensions'],
  ['weight', 'weight'],
  ['color', 'color'],
  ['status', 'status'],
  ['tax', 'tax']
]


const equipmentMainInventoryAttributes = [
  ['id', 'id'],
  ['name', 'name'],
  ['code', 'code'],
  ['description', 'description'],
  ['unit', 'unit'],
  ['category', 'category'],
  ['image', 'image'],
  ['alert_min_stock', 'alert_min_stock'],
  ['unit_rent_price', 'unit_rent_price'],
  ['brand_name', 'brand_name'],
  ['dimensions', 'dimensions'],
  ['weight', 'weight'],
  ['color', 'color'],
  ['status', 'status'],
  ['in_stock', 'in_stock'],
  ['tax', 'tax']

]

const taskMasterAttributes = [
  ['id', 'id'],
  ['name', 'name'],
  ['description', 'description'],
  ['status', 'status'],
  ['site', 'site'],
  ['search_tags', 'search_tags'],
  ['work_category', 'work_category'],
  ['priority', 'priority'],
  ['start_date', 'start_date'],
  ['end_date', 'end_date'],
  ['image', 'image'],
]

const taskTimelineAttributes = [
  ['id', 'id'],
  ['site', 'site'],
  ['task', 'task'],
  ['entry_date', 'entry_date'],
  ['percentage', 'percentage'],
  ['total_work_done', 'total_work_done'],
  ['skilled_worker', 'skilled_worker'],
  ['unskilled_worker', 'unskilled_worker'],
  ['total_working_hours', 'total_working_hours'],
  ['remarks', 'remarks'],
  ['image', 'image'],
]

const workCategoryAttributes = [
  ['id', 'id'],
  ['name', 'name'],
  ['description', 'description'],
  ['status', 'status'],
  ['type', 'type']
];
const materialRequestAttributes = [
  ['id', 'id'],
  ['status', 'status'],
  ['task', 'task'],
  ['m_status', 'm_status'],
  ['material', 'material'],
  ['qty', 'qty'],
  ['transfer', 'transfer'],
  ['site', 'site'],
  ['created_at', 'created_at'],
  ['user', 'user'],
  ['e_date', 'e_date'],
  ['a_qty', 'a_qty'],

];
const materialMainInventoryAttributesformaterialrequest = [
  ['id', 'id'],
  ['name', 'name'],
  ['code', 'code'],
  ['hsn_code', 'hsn_code'],
  ['description', 'description'],
  ['unit', 'unit'],
  ['category', 'category'],
  ['image', 'image'],
  ['alert_min_stock', 'alert_min_stock'],
  ['unit_rent_price', 'unit_rent_price'],
  ['brand_name', 'brand_name'],
  ['dimensions', 'dimensions'],
  ['weight', 'weight'],
  ['color', 'color'],
  ['status', 'status'],
]


const equipmentRequestAttributes = [
  ['id', 'id'],
  ['status', 'status'],
  ['task', 'task'],
  ['e_status', 'e_status'],
  ['equipment', 'equipment'],
  ['qty', 'qty'],
  ['transfer', 'transfer'],
  ['site', 'site'],
  ['created_at', 'created_at'],
  ['e_date', 'e_date'],
  ['a_qty', 'a_qty'],

];


module.exports = { roleMaterAttributes, authUserAttributes, materialMainInventoryAttributesformaterialrequest, authAttributes, unitAttributes, taxAttributes, materialCategoryAttributes, siteMasterAttributes, expenseMasterAttributes, expenseHeadAttributes, issueMasterAttributes, materialMainInventoryAttributes, equipmentMainInventoryAttributes, taskMasterAttributes, taskTimelineAttributes, workCategoryAttributes, materialRequestAttributes, equipmentRequestAttributes };