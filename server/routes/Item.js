const express = require("express") //import ตัว express
const router = express.Router() //สร้าง router

const {createItems, createType,getAllTypes,getTypeID,getTypeByID,getAllItems,singleItem,findItemByEmail,
    getItemsByStatus, updateStatusAndNotation,updateType,deleteType,delectItemByType} = require("../controllers/ItemController")
const upload = require("../middleware/upload")


router.post('/createItems',upload.single('image'), createItems)
router.get('/items',getAllItems)
router.get('/items/:slug',singleItem)
router.get('/myitems/:author', findItemByEmail)
router.get('/getitems/:status', getItemsByStatus)
router.put('/items/:slug', updateStatusAndNotation)
router.post('/createType', createType)
router.get('/types', getAllTypes)
router.get('/typesID/:type', getTypeID)
router.get('/types/:id', getTypeByID)
router.put('/type/update/:id', updateType)
router.delete('/type/delete/:id', deleteType)
router.delete('/delectItemByType/:id',delectItemByType)
module.exports=router