const express=require('express');
const router=express.Router();
const { isAuthenticatedUser } = require('../middlewares/auth');
const { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } = require('../controllers/orderController');


router.route('/placeorder').post(isAuthenticatedUser,placeOrder);
router.route('/verifyorder').post(verifyOrder);
router.route('/userorders').post(isAuthenticatedUser,userOrders);

//Admin routes
router.route('/listorders').get(listOrders);
router.route('/updatestatus').put(updateStatus);

module.exports=router;