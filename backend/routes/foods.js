const express=require('express');
const { addFood, getFoods, removeFood } = require('../controllers/foodController');
const router=express.Router();
const multer =require('multer');
const upload=multer({storage:multer.diskStorage({
    destination:'uploads',
    filename:function(req,file,cb){
        cb(null,`${Date.now()}${file.originalname}`)
    }
})})


router.route('/addfood').post(upload.single('image'),addFood);
router.route('/getfoods').get(getFoods);
router.route('/removefood/:id').delete(removeFood);

module.exports=router;