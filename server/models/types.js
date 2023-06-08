const mongoose = require("mongoose")
//โครงส้รางในการเก็บข้อมูล
const typeSchema = mongoose.Schema({
    type:{
        type:String,
        required:true, //ห้ามป้อนเป็นค่าว่าง
        unique:true
    } 
    
    
})

module.exports=mongoose.model("Types",typeSchema)