const express = require("express");
const router = express.Router();

const {
  registerEmp,
  loginEmp,
  getEmp,
} = require("../controllers/empController");

const { protectEmp } = require("../middleware/authMiddleware");

router.post("/", registerEmp);
router.post("/login", loginEmp);
router.get("/me", protectEmp, getEmp);

module.exports = router;
