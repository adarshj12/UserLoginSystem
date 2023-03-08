const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { signupvalidate } = require('../utils/validation');
require('dotenv').config()
const jwt = require('jsonwebtoken');


const userRegister=async(req,res)=>{
    try {
        console.log(req.body);
        if(!signupvalidate(req.body.email)) return res.status(200).json({success:false,message:'invalid email format'});
        const userExist = await userModel.findOne({email:req.body.email}) 
        if(userExist) return res.status(200).json({message:'user already exist'})
        const password = req.body.password;
        const salt=await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        req.body.password=hashPassword;
        const newUser = new userModel(req.body);
        if(req.body.name==='admin'){
            let admin = await userModel.findOne({name:'admin'})
            if(admin) return res.status(301).json({success:false,message:'cannot use admin as username'})
        }
        await newUser.save();
        res.status(200).json({success:true,message:'registration successful'})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:`registration failed as ${error.message}`})
    }
}

const userLogin=async(req,res)=>{
    try {
        console.log(req.body);
        const user = await userModel.findOne({email:req.body.email});
        if(!user) return res.status(200).json({success:false,message:'no such user'});
        const isMatch = await bcrypt.compare(req.body.password,user.password)
        if(!isMatch) return res.status(200).json({success:false,message:'invalid email or password'});
        if(user.name==='admin'&&!user.isAdmin){
            await userModel.updateOne({name:user.name},{$set:{isAdmin:true}})
        } 
        //const token = jwt.sign({id:user._id,},process.env.JWT_SECRET,{expiresIn:'30d'});
        const token = jwt.sign({id:user},process.env.JWT_SECRET,{expiresIn:'30d'});
        res.status(200).json({success:true,message:`Login Successful`,token})
    } catch (error) {
        console.log(`error=> ${error.messsage}`);
        res.status(500).json({message:`error in login attempt ${error.message}`})
    }
}

const homePage =async(req,res)=>{
    try {
        const user = await userModel.findOne({_id:req.body.userId});
        if(!user) return res.status(200).json({success:false,message:'Unauthorized entry attempt'});
        user.password=undefined;
        res.status(200).json({success:true, data:user})
    } catch (error) {
        console.log(`error=> ${error.messsage}`);
        res.status(500).json({message:`error in login attempt ${error.message}`})
    }
}

const changeProfile=async(req,res)=>{
    try {
        const user = await userModel.findOne({_id:req.body.userId});
        console.log(req.body.userId);
        console.log(req.file);
        await userModel.updateOne({_id:user._id},{
        $set:{
            profile:req.file.filename
        }
    })
    res.status(200).json({message:'file uploaded'})
    } catch (error) {
        console.log(`error=> ${error.messsage}`);
        res.status(500).json({message:`error in login attempt ${error.message}`})
    }
}

module.exports={
    userLogin,
    userRegister,
    homePage,
    changeProfile
}