const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Emp = require("../models/empModel");

const Ticket = require("../models/ticketModel");

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
const getTickets = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// @desc Get user ticket
// @route GET /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);


  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(ticket);
});
const getEmpTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const emp = await Emp.findById(req.emp.id);


  if (!emp) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  // if (ticket.user.toString() !== req.emp.id) {
  //   res.status(401);
  //   throw new Error("Not Authorized");
  // }

  res.status(200).json(ticket);
});


// @desc Create new ticket
// @route POST /api/tickets
// @access Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product) {
    res.status(400);
    throw new Error("Please add a product here");
  }
  if (!description) {
    res.status(400);
    throw new Error("Please add a description");
  }

  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
   const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json(ticket);
});

// @desc Delete ticket
// @route DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  // await ticket.remove();
  
  await Ticket.findByIdAndDelete(req.params.ticketId);

  res.status(200).json({ success: true });
});

// @desc Update ticket
// @route PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  // const user = await User.findById(req.user.id);
  const emp = await Emp.findById(req.emp.id);

  if (!emp) {
    res.status(401);
    throw new Error("Employee not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.ticketId,
    req.body,
    // { closed : true } 
  );

  res.status(200).json(updatedTicket);
});

const getAllTickets = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const emp = await Emp.findById(req.emp.id);

  if (!emp) {
    res.status(401);
    throw new Error("Employee not found");
  }
 const device = req.emp.department;
 
 const tickets = await Ticket.find({});

 let ticket_department 
 if(device=='phone'){
 ticket_department= tickets.filter(doc => doc.product && doc.product.phone);}
 else if(device=='Laptop'){
  ticket_department= tickets.filter(doc => doc.product && doc.product.Laptop);}
else{
  ticket_department= tickets.filter(doc => doc.product && doc.product.TV);}
  // console.log(ticket_department);

  res.status(200).json(ticket_department);
});

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
  getAllTickets,
  getEmpTicket
};
