const express = require('express');
const router = express.Router();
const loginController = require('../Controller/loginController');


router.post('/employeelogin', loginController.employeeLogin);
router.post('/createEmployee',loginController.createEmployee);



module.exports = { router };