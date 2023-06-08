const express = require("express") //import ตัว express
const router = express.Router() //สร้าง router

const {createChats,getChatsByStatus,getChatByUser,updateStatusAndChatAdmin} = require("../controllers/chatController")

router.post('/createChats',createChats)
router.get('/getChat/:email',getChatByUser)
router.get('/getChatAll/:status', getChatsByStatus)
router.put('/updateChats/:id', updateStatusAndChatAdmin)

module.exports=router 