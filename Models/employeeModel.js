const prisma = require('../Clients/prismaClient');
const bcrypt = require('bcryptjs');  // Import bcrypt for hashing passwords

// Function to create a new employee
exports.createEmployee = async (data) => {
  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(data.password, 10); // 10 is the salt rounds

  try {
    const employee = await prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: hashedPassword // Store the hashed password
      }
    });
    return employee;
  } catch (error) {
    throw new Error('Error creating employee: ' + error.message);
  }
};

// Function to find an employee by email
exports.findEmployeeByEmail = async (email) => {
  try {
    const employee = await prisma.user.findUnique({
      where: { email }
    });
    return employee;
  } catch (error) {
    throw new Error('Error finding employee: ' + error.message);
  }
};

// Function to validate password (to compare hashed password)
exports.validatePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
