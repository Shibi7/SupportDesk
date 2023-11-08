const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Emp = require("../models/empModel");

const Note = require("../models/noteModel");
const Ticket = require("../models/ticketModel");

// @desc Get notes for a ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  // const case1 = { isStaff:false }; // only get users notes 
  // const case2 = { ticket: req.params.ticketId}; // only get the notes which belongs to  that ticket

  const notes = await Note.find({ ticket: req.params.ticketId});

  res.status(200).json(notes);
});

// @desc Create ticket note
// @route POST /api/tickets/:ticketId/notes
// @access Private
const addNote = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const note = await Note.create({
    text: req.body.note,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  });

  res.status(200).json(note);
});
const getEmpNotes = asyncHandler(async (req, res) => {
  // Get employee using the id in the JWT
  const emp = await Emp.findById(req.emp.id);

  if (!emp) {
    res.status(401);
    throw new Error("Employee not found");
  }
  const notes = await Note.find({ ticket: req.params.ticketId});

  res.status(200).json(notes);
});

// @desc Create ticket note
// @route POST /api/tickets/:ticketId/notes
// @access Private
const addEmpNote = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const emp = await Emp.findById(req.emp.id);

  if (!emp) {
    res.status(401);
    throw new Error("Employee not found");
  }
  
  const note = await Note.create({
    text: req.body.note,
    isStaff: true,
    staffId:emp.staffId,
    ticket: req.params.ticketId,
    user: req.emp.id,
  });

  // console.log(note);

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote,
  getEmpNotes,
  addEmpNote,
};
