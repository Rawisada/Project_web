const mongoose = require("mongoose")
const types = require("./types")

const CactusSchema = mongoose.Schema({
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
         //ห้ามป้อนเป็นค่าว่าง หรือระบุ default:"Admin"
    },
    user:[],
    like:{
        type:Number,
        required:false,
        default: 0
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true
    }
},{timestamps:true})// timestamps เก็บบันทึกเวลาตอนสร้างและอัปเดต

module.exports=mongoose.model("Cactus",CactusSchema)