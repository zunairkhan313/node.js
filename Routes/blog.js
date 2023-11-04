const express = require("express")
const router = express.Router()
const BlogModel = require('../Schema/Blog')
const sendResponse = require("../helpers/sendResponse")


router.post('/',async(req , res)=>{
    console.log('body console-->',req.body)
    
    try{
        const user = await BlogModel.create({ ...req.body })

        if(user){
            sendResponse(res,200,user , "User created successfully",false)
        } 
    }
    catch(err){

        sendResponse(res , 500 , null , "internal server error",true)
    }
})

router.get('/',async(req , res)=>{
    console.log('body query-->',req.query)
    try{
        const user = await BlogModel.find().populate('user').exec()

        if(user){
            sendResponse(res,200,user , "User fetched successfully",false)
        } 
    }
    catch(err){

        sendResponse(res , 500 , null , "internal server error",true)
    }
})

router.put('/:id',async(req , res)=>{
  
    try{
        const user = await BlogModel.findByIdAndUpdate(req.params.id ,{ ...req.body }, {new : true})
        console.log("user---->" , user);
        if(user){
            sendResponse(res,200,user , "User update successfully",false)
        } else{
            sendResponse(res , 403 , null,'user not found', true)
        }
    }
    catch(err){

        sendResponse(res , 500 , null , "internal server error",true)
    }
})


router.delete('/:id',async(req , res)=>{

    try{
        const user = await BlogModel.findByIdAndDelete(req.params.id)
        console.log("user-->",user);
        if(user){
            sendResponse(res,200,user , "User deleted successfully",false)
        } else{
            sendResponse(res , 403 , null,'user not found', true)
        }
    }
    catch(err){

        sendResponse(res , 500 , null , "internal server error",true)
    }
})

module.exports = router