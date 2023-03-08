const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports=async(req,res,next)=>{
    try {
        let data = req.body;
        let id = req.params.id;
        let key =req.params.key;
    const token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if(err) return res.status(200).json({message:`Authorization Failed`})
        else {
            req.body.userId=decode.id;
            req.body.data = data;
            req.body.id=id;
            req.body.key=key;
        }
        next();
    })
    } catch (error) {
        console.log(`error=> ${error.message}`);
        res.status(400).json({message:`Authorization failed with  ${error.message}`})
    }
}