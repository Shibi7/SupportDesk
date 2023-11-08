const express = require("express");
const router = express.Router({ mergeParams: true });
const { getNotes, addNote ,addEmpNote , getEmpNotes } = require("../controllers/noteController");

const { protect,protectEmp } = require("../middleware/authMiddleware");

router.route("/").get(protect, getNotes).post(protect, addNote);

router.route("/emp").get(protectEmp, getEmpNotes).post(protectEmp, addEmpNote);



module.exports = router;
