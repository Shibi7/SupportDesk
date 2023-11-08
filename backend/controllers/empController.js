const asyncHandler = require("express-async-handler");
const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Emp = require("../models/empModel");

// @desc Register a new emp
// @route /api/emp
// @access Public
const registerEmp = asyncHandler(async (req, res) => {

  const { name, email, password , department } = req.body;

  // Validation
  if (!name || !email || !password || !department) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  // Find if emp already exists
  const empExists = await Emp.findOne({ email });

  if (empExists) {
    res.status(400);
    throw new Error("emp already exists");
  }

  // Hash password
  const salt = await bcyrpt.genSalt(10); // salt is a random string, used to encrypt password
  const hashedPassword = await bcyrpt.hash(password, salt);

  // Create emp
  const emp = await Emp.create({
    name,
    email,
    password: hashedPassword,
    department,
  });

  if (emp) {
    res.status(201).json({
      _id: emp._id,
      name: emp.name,
      email: emp.email,
      department:emp.department,
      token: generateToken(emp._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid emp data");
  }
});

// @desc Login a emp
// @route /api/emp/login
// @access Public

const loginEmp = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const emp = await Emp.findOne({ email });

  // Check emp and passwords match
  if (emp && (await bcyrpt.compare(password, emp.password))) {
    res.status(200).json({
      _id: emp._id,
      name: emp.name,
      email: emp.email,
      token: generateToken(emp._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// @desc Get current emp
// @route /api/emps/me
// @access Private
const getEmp = asyncHandler(async (req, res) => {
  const emp = {
    id: req.emp.id,
    email: req.emp.email,
    name: req.emp.name,
  };
  res.status(200).json(emp);
});

// Generate jwt token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerEmp,
  loginEmp,
  getEmp,
};
