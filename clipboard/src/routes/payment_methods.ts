const express2 = require('express');
const router2 = express2.Router();

/* Controllers */
const paymentMethodsController = require('../controllers/payment_methods');

router2.get('/get', paymentMethodsController.get);
router2.post('/create', paymentMethodsController.create);
router2.delete('/remove', paymentMethodsController.remove);

module.exports = router2;