const { createEmployeeSchema, loginSchema } = require('../Validators/employeeValidator');
const employeemodel = require('../Models/employeeModel');
const bcrypt = require('bcryptjs');  // Import bcrypt for password hashing and comparison

exports.createEmployee = async (req, res) => {
  const { error } = createEmployeeSchema.validate(req.body);
  if (error) {
    return res.fail("Validation error", error.details[0].message);
  }

  try {
    // Check if email already exists
    const existingEmployee = await employeemodel.findEmployeeByEmail(req.body.email);
    if (existingEmployee) {
      return res.fail("Email already registered");
    }

    // Create new employee with hashed password
    const employee = await employeemodel.createEmployee(req.body);
    return res.success("Employee created successfully", {
      id: employee.id,
      fullName: employee.fullName,
      email: employee.email
    });
  } catch (err) {
    return res.error("Internal server error", err.message);
  }
};

exports.employeeLogin = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.fail("Validation error", error.details[0].message);
  }

  try {
    const { email, password } = req.body;
    const employee = await employeemodel.findEmployeeByEmail(email);

    if (!employee) {
      return res.fail("Invalid credentials");
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.fail("Invalid credentials");
    }

    return res.success("Login successful", { employee });
  } catch (err) {
    return res.error("Internal server error", err.message);
  }
};
