const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/requiredProperties");

function hasData(req, res, next) {
    if(req.body.data) {
        return next();
    }
    next({ status: 400, message: "Body must have a data property."});
}

const REQUIRED_PROPERTIES = ["table_name", "capacity"];
const hasRequiredProperties = hasProperties(...REQUIRED_PROPERTIES);

function validTableName(req, res, next) {
    const tableName = req.body.data.table_name;
    if (tableName.length >= 2) {
      return next();
    }
    next({
      status: 400,
      message: "table_name must be longer than 2 characters.",
    });
  }
  
  function validTableCapacity(req, res, next) {
    const capacity = req.body.data.capacity;
    if (capacity >= 1 && typeof capacity === "number") {
      return next();
    }
    next({ status: 400, message: "capacity must be at least 1 person." });
  }

async function list(req, res) {
    const data = await tablesService.list();
    res.json({ data });
  }

async function create(req, res) {
    const table = req.body.data;
    const data = await tablesService.create(table);
    res.status(201).json({ data });
  }

module.exports = {
    list: asyncErrorBoundary(list),
    create: [
        hasData,
        hasRequiredProperties,
        validTableName,
        validTableCapacity,
        asyncErrorBoundary(create),
    ]

}