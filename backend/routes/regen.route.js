const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/auth.middleware");

const {
  getStudentsForReport,
  getDepartments,
} = require("../controllers/regen/regen.controller");

router.get("/students", authenticateToken, getStudentsForReport);
router.get("/departments", authenticateToken, getDepartments);

module.exports = router;
