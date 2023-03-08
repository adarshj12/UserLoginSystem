const express= require('express');
const { userLogin, userRegister, homePage, changeProfile } = require('../controllers/userController');
const { getAllUsers, deleteUser, editUser, searchUser, userEdit } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/',(req,res)=>{
    res.send(`this is routing page`)
})

const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'_'+file.originalname)
    }
  })
const upload = multer({ storage: storage }) 


//user

router.post('/login',userLogin)

router.post('/register',userRegister)

router.post('/userDetails',authMiddleware,homePage)

router.post('/changeProfile',upload.single('image'),authMiddleware,changeProfile)

//admin

router.post('/allUsers',authMiddleware,getAllUsers)

//router.delete('/delete-user/:id',authMiddleware,deleteUser)
router.delete('/delete-user/:id',deleteUser)


router.get('/edit-user/:id',userEdit)

// router.put('/edit-user/:id',authMiddleware,editUser)
// router.put('/edit-user/:id',upload.single('image'),authMiddleware,editUser)
router.put('/edit-user/:id',upload.single('image'),editUser)

router.get('/search-user/:key',searchUser) 



module.exports=router;