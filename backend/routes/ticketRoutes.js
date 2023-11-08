const express = require("express");
const router = express.Router();
const {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
  getAllTickets,
  getEmpTicket
} = require("../controllers/ticketController");

const { protect,protectEmp } = require("../middleware/authMiddleware");

// Re-route into note route
const noteRouter = require("./noteRoutes");
router.use("/:ticketId/notes", noteRouter);

router.use("/emp/:ticketId/notes", noteRouter);

//user
router.route("/").get(protect, getTickets).post(protect, createTicket);
//employee
router.route("/emp").get(protectEmp, getAllTickets)

router.route("/emp/:ticketId").put(protectEmp, updateTicket);

router.route("/emp/:id").get(protectEmp, getEmpTicket)

router
  .route("/:id")
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

module.exports = router;
