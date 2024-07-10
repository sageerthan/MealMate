const express=require('express');
const { addToCart, removeFromCart, getCart, reduceFromCart } = require('../controllers/cartController');
const { isAuthenticatedUser } = require('../middlewares/auth');
const router=express.Router();


router.route('/addcart').post(isAuthenticatedUser,addToCart);
router.route('/reducecart').post(isAuthenticatedUser,reduceFromCart);
router.route('/removecart').delete(isAuthenticatedUser,removeFromCart);
router.route('/getcart').post(isAuthenticatedUser,getCart);

module.exports=router;
