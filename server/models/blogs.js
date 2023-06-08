//ชื่อบทความ(title), เนื้อหาบทความ(content), ผู้เขียน(author), slud(url)
const mongoose = require("mongoose")
const types = require("./types")
//โครงส้รางในการเก็บข้อมูล
const blogSchema = mongoose.Schema({
    namepicture:{
        type:String,
        required:true //ห้ามป้อนเป็นค่าว่าง
    },
    type:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: types
        }
    ,
    // type:{
    //     type:String,
    //     required:true
    // },
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
         //ห้ามป้อนเป็นค่าว่าง หรือระบุ default:"Admin"
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true
    }
},{timestamps:true})// timestamps เก็บบันทึกเวลาตอนสร้างและอัปเดต

module.exports=mongoose.model("Blogs",blogSchema)