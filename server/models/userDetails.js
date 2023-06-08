const mongoose = require("mongoose")
const cactus = require("./cactus")
//โครงส้รางในการเก็บข้อมูล
const userDetailSchema =  mongoose.Schema({
    email:{
        type:String,
        required:true, //ห้ามป้อนเป็นค่าว่าง
        unique:true
    },
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true //ห้ามป้อนเป็นค่าว่าง หรือระบุ default:"Admin"
    },
    password:{
        type:String,
        required:true //ห้ามป้อนเป็นค่าว่าง หรือระบุ default:"Admin"
    },
    role:{
        type:String,
        default:"user",
        enum: ["user", "admin"]
    },
    enable:{
        type:Boolean,
        default:true
    },
    profile:{
        type:String,
        default:"profile/profile.png"
    },
    item:[]
            
        

    
    
},{timestamps:true})// timestamps เก็บบันทึกเวลาตอนสร้างและอัปเดต

module.exports=mongoose.model("UserInfo", userDetailSchema)