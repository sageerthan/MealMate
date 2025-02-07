const userModel =require('../models/userModel')

exports.addToCart=async(req,res)=>{
       try{
        let userData=await userModel.findById(req.body.userId)
        let cartData=await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] =1;
        }
        else{
            cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({
            success:true,
            message:"Added to cart"
        })
       }
       catch(error){
         console.log(error);
         res.json({
            success:false,
            message:"Failure in add"
         })
       }
}

exports.reduceFromCart=async(req,res)=>{
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({
            success:true,
            message:'Reduced from Cart'
        })
    }
    catch(error){
       console.log(error);
       res.json({
        success:false,
        message:'Error!'
    })
    }
}

exports.removeFromCart=async(req,res)=>{
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]=0;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({
            success:true,
            message:'Removed from cart'
        })
    }
    catch(error){
        console.log(error);
        res.json({
         success:false,
         message:'Error!'
     })
     }
}
//Fetch user cart data
exports.getCart=async(req,res)=>{
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        res.json({
            success:true,
            cartData
        })
    }
    catch(error){
        console.log(error);
        res.json({
            success:false,
             message:'Error!'
        })
    }
}