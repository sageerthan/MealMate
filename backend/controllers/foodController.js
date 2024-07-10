const foodModel =require('../models/foodModel');
const fs=require('fs');

//Add food item
exports.addFood=async(req,res)=>{
    
    try{
    const{name,description,price,category}=req.body
    let image=`${req.file.filename}`;
    const food= await foodModel.create({name,description,price,image,category})
        await food.save();
        res.status(201).json({
             success:true,
             message:"Food added successfully",
             food
        })
    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"Failure in add!!"
        })
    }
}

//Get All foods
exports.getFoods=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.status(201).json({
            success:true,
            foods
        })
    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"Failure in get all foods!!"
        })
    }  
}

// remove food item
exports.removeFood=async(req,res)=>{
    
    try{
        const id=req.params.id;
        const food=await foodModel.findById(id);
        fs.unlink(`uploads/${food.image}`,()=>{});
        await foodModel.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message:"Food item removed"
        })
    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"Failure in delete food!!"
        })
    }
}