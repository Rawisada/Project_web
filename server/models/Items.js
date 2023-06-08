//ชื่อบทความ(title), เนื้อหาบทความ(content), ผู้เขียน(author), slud(url)
const mongoose = require("mongoose")
const types = require("./types")

const ItemsSchema = mongoose.Schema({
    namepicture:{
        type:String,
        required:true //ห้ามป้อนเป็นค่าว่าง
    },
    image: {
        type:String
    },
    type:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: types
        }
    ,
    content:{
        type:{},
        required:true
    },
    reference:{
        type:String,
        required:false
    },
    author:{
        type:String,
        required:false
        
    },
    status:{
        type:String,
        required:false,
        default: "Waiting"
         
    },
    notation:{
        type:String,
        required:false,
        default: "-"
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true
    }
},{timestamps:true})// timestamps เก็บบันทึกเวลาตอนสร้างและอัปเดต

module.exports=mongoose.model("Items",ItemsSchema)