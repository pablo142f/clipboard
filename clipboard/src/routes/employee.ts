import * as express from "express";
const router = express.Router();

/* Controllers */
const employeeController = require('../controllers/employee');

router.get('/', employeeController.getAll);
router.post('/', employeeController.createEmployee);
router.delete('/', employeeController.deleteEmployee);

module.exports = router;