const express = require("express") //import ตัว express
const router = express.Router() //สร้าง router
const{getlikeOfCactus,createCactus,getAllCactus,updateUser,getCactus,updateCactus,delectCactus,getCactusById,
getCactusByType,pullUser,updateLike,getAllCactusByLikeMoreToLess,getAllCactusByLikeLessToMore
,getAllCactusByDateLatestToOldest,getAllCactusByWord,getAllCactusByUser,getCactusBylimit,updateCactusNoImage,createCactusNotImage,delectCactusByType} = require("../controllers/cactusController")
const uploadProfile = require("../middleware/uploadProfile")
const upload = require("../middleware/upload")

router.post('/createCactus',createCactus)
router.post('/createCactusForAdmin',upload.single('image'),createCactusNotImage)
router.get('/cactus',getAllCactus)
router.get('/cactusBylimit',getCactusBylimit)
router.get('/cactusByword/:word/:type',getAllCactusByWord)
router.get('/cactusByLikeMoreToLess/:word/:type',getAllCactusByLikeMoreToLess)
router.get('/cactusByLikeLessToMore/:word/:type',getAllCactusByLikeLessToMore)
router.get('/cactusByDateLatestToOldest/:word/:type',getAllCactusByDateLatestToOldest)
router.get('/getlikeOfCactus/:slug',getlikeOfCactus)
router.get('/getAllCactusByUser/:user',getAllCactusByUser)
router.put('/cactus/:slug',updateUser)                                                    
router.put('/pullcactus/:slug',pullUser)
router.put('/updateLike/:slug',updateLike)
router.get('/getCactus/:slug', getCactus)                         
router.get('/getCactusById/:id', getCactusById)
router.get('/getCactusByType/:type', getCactusByType)
router.put('/update/cactus/:slug',upload.single('image'),updateCactus)
router.put('/update/cactusNoImg/:slug', updateCactusNoImage)
router.delete('/cactus/:slug',delectCactus)
router.delete('/delectcactusByType/:id',delectCactusByType)
module.exports=router                                             