import * as express from "express";
const router = express.Router();

/* Controllers */
const ssController = require('../controllers/ss');

router.get('/', ssController.getSS);
router.get('/oncontract', ssController.getSSOnContract);
router.post('/by_department', ssController.getSSByDepartment);

module.exports = router;