const express = require("express") //import ตัว express
const router = express.Router() //สร้าง router
const {login, register, findRoleOfUser,findUser,addCactus,pullCactus,checkCactus,getAllUserByEnable,
updateRole,updateEnable,deleteUser,updateUser,update,getCactusOfUser,updateUserNoImg} = require("../controllers/authController")
const uploadProfile = require("../middleware/uploadProfile")
const upload = require("../middleware/upload")
router.post('/login', login) 
router.post('/register', register)
router.get('/getRole/:email', findRoleOfUser)
router.get('/getUser/:email',findUser)
router.get('/getUserEnable/:enable', getAllUserByEnable)
router.put('/collection/:email', addCactus)
router.put('/user/role/:email',updateRole)
router.put('/user/enable/:email', updateEnable)
router.put('/pullCollection/:email', pullCactus)
router.get('/checkCactus/:email', checkCactus)
router.get('/getCactusOfUser/:email', getCactusOfUser)
router.put('/update/user/:emailOld',uploadProfile.single('image'),updateUser)
router.put('/update/userNoImg/:emailOld',updateUserNoImg)
router.put('/fname/:email',update)
router.delete('/user/:email',deleteUser)
//router.post('/register',)

module.exports=router 