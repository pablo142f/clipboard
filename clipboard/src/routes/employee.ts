const express = require('express');
const router = express.Router();

/* Controllers */
const employeeController = require('../controllers/employee');

router.get('/getAll', employeeController.getAll);
router.get('/ss', employeeController.getSS);
router.get('/oncontract', employeeController.getSSOnContract);
router.post('/by_department', employeeController.getSSByDepartment);
router.post('/', employeeController.createEmployee);
router.delete('/', employeeController.deleteEmployee);

module.exports = router;