//ไฟล์ที่ให้บริการเกี่ยวกับ route ที่เกี่ยวข้องกับการกำหนดเส้นทางในการรับส่งรีเควส เกี่ยวกับบทความ

const express = require("express") //import ตัว express
const router = express.Router() //สร้าง router
const {create, getAllblogs, singleBlog, remove, update, createType,getAllTypes,getTypeID} = require("../controllers/blogController") // import create จาก blogController

/*
router.get('/blog',(req,res)=>{
    res.json({
        data:"Hello Route Blog"
    })
})
*/

router.post('/create',create) //ระบุ route ว่าจะ respond อะไรกลับไป 
router.get('/blogs',getAllblogs)
router.get('/blog/:slug', singleBlog)
router.delete('/blog/:slug', remove)
router.put('/blog/:slug', update)
// router.post('/createType',createType)
// router.get('/types',getAllTypes)
// router.get('/typesID/:type',getTypeID)
module.exports=router //export ตัว router