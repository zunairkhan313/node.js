const express = require("express")
const router = express.Router()
const UserModel = require('../Schema/User')
const sendResponse = require("../helpers/sendResponse")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authenticateJwt = require("../helpers/authenticateJwt")
require('dotenv').config()
console.log('env===>',process.env); 


router.post('/signup',async(req , res)=>{
    console.log('body console-->',req.body)
    
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const obj = { ...req.body }
        obj.password = hash
        const user = await UserModel.create(obj)

        if(user){
            sendResponse(res,200,user , "User created successfully",false)
        } 
    }
    catch(err){

        sendResponse(res , 500 , null , "internal server error",true)
    }
})



router.post('/login',async(req , res)=>{
    console.log('body console-->',req.body)
    
    try{
       const user = await UserModel.findOne({ email: req.body.email })

        if(user){
            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password)
            if(isPasswordValid){
                const token = jwt.sign({ data : user },process.env.JWT_SECRET)
                sendResponse(res,200,{ user , token }, "User login successfully",false)
            }else{
                sendResponse(res,403,null , "password is not valid",true)
            }
        } else{
            sendResponse(res,403,null , "User does'nt Exist",true)
        }
    }
    catch(err){

        sendResponse(res , 500 , null , "internal server error",true)
    }
})


router.get('/',authenticateJwt,async(req , res)=>{
    console.log('body query-->',req.query)
    try{
        const user = await UserModel.find()

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
        const user = await UserModel.findByIdAndUpdate(req.params.id ,{ ...req.body }, {new : true})
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
        const user = await UserModel.findByIdAndDelete(req.params.id)
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