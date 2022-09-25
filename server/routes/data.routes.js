const Router = require("express");

const router = new Router();
const dataController = require("../controllers/data.controller");

router.get("/data/all", dataController.getAllData);
router.get("/data", dataController.getFilteredData);

module.exports = router;
