const userModel = require('../models/userModel');

const getAllUsers = async(req,res)=>{
    try {
        const allUsers = await userModel.find();
        allUsers.shift();
        if(allUsers.length>0) return res.status(200).json({success:true,message:allUsers})
        res.status(200).json({success:false,message:`no users to show`})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:`accessing failed as ${error.message}`})
    }
}
const deleteUser = async(req,res)=>{
    try {
        console.log(req.params.id);
        await userModel.deleteOne({_id:req.params.id})
        res.status(200).json({message:`user deleted`})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:`deleting failed as ${error.message}`})
    }
}
const userEdit = async(req,res)=>{
    try {
        let user = await userModel.findOne({_id:req.params.id})
        if(user) return res.status(200).json({message:user})
        res.status(300).json({success:false,message:`user not found`})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:`editing failed as ${error.message}`})
    }
}
// const editUser = async(req,res)=>{
//     try {
//         await userModel.updateOne({_id:req.body.id},{$set:{
//             name:req.body.data.name,
//             email:req.body.data.email,
//             profile:req.body.data.profile
//         }})
//         res.status(200).json({message:`user edited`})
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({success:false,message:`registration failed as ${error.message}`})
//     }
// }
// const editUser = async(req,res)=>{
//     try {
//         await userModel.updateOne({_id:req.body.id},{$set:{
//             name:req.body.data.name,
//             email:req.body.data.email,
//             profile:req.file.filename
//         }})
//         res.status(200).json({success:true,message:`user edited`})
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({success:false,message:`editing failed as ${error.message}`})
//     }
// }
const editUser = async(req,res)=>{
    try {
        console.log(req.body);
        await userModel.updateOne({_id:req.body.id},{$set:{
            name:req.body.name,
            email:req.body.email
        }})
        res.status(200).json({success:true,message:`user edited`})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:`editing failed as ${error.message}`})
    }
}
const searchUser= async (req, res) => {
    try {
        console.log(req.params.key);
    let result = await userModel.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { email: { $regex: req.params.key } }
        ]
    })
    res.status(200).json({message:result})
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:`searching failed as ${error.message}`})
    }
}


module.exports={
    getAllUsers,
    deleteUser,
    editUser,
    searchUser,
    userEdit
}