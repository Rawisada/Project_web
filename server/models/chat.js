const mongoose = require("mongoose")
//โครงส้รางในการเก็บข้อมูล
const ChatsSchema = mongoose.Schema({
    user_Message:{
        type:String,
        required:true
    },
    admin_Message:{
        type:String,
        required:false
    },
    status:{
        type:String,
        required:false,
        default: "Waiting"
    },
    author:{
        type:String,
        required:false
         //ห้ามป้อนเป็นค่าว่าง หรือระบุ default:"Admin"
    }

},{timestamps:true})// timestamps เก็บบันทึกเวลาตอนสร้างและอัปเดต
    
module.exports=mongoose.model("Chats",ChatsSchema)