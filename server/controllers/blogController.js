// respond  ให้ client
// หากมีการใช้ ฟังกชั่น create ใน blogcontroller
// ติดต่อกับฐานข้อมูล / ดำเนินการกับฐานข้อมูล
const slugify = require("slugify")
const Blogs = require("../models/blogs")
const Types = require("../models/types")
const { v4: uuidv4} = require('uuid');
//สร้างและบันทึกข้อมูล
exports.create=(req,res)=>{
    const {namepicture,type,content,reference,author}=req.body

    //slug คือ เอารายละเอียดของ title content author มาทำเป็นurl
    //or const slug = slugify(req.body.slug) แล้วรับค่า slug ด้วยก็ได้
    let slug = slugify(namepicture)
    if(!slug)slug = uuidv4();
    //validate
    switch(true){
        case !namepicture:
            return res.status(400).json({error:"กรุณาป้อนชื่อรูปภาพ"})
            break;
        case !type:
            return res.status(400).json({error:"กรุณาป้อนประเภท"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหา"})
            break;
    }
    //res.json({title,content,author,slug})
    
    //save data
    Blogs.create({namepicture,type,content,reference,author,slug})
    .then((result)=>{res.json(result)})
    .catch((err)=>{res.status(400).json({error:err})})



}



//ดึงข้อมูลบทความทั้งหมด
exports.getAllblogs=(req,res,next)=>{
    Blogs.find({}).then((blogs)=>{
        res.json(blogs)
    }) .catch((err)=>{res.status(400).json({error:err})})

}


//ดึงบทความที่สนใจอ้างอิงตาม slug
exports.singleBlog=(req,res)=>{
    const {slug} = req.params
    Blogs.findOne({slug:slug}).then((blog)=>{
        res.json(blog)
    }).catch((err)=>{res.status(400).json({error:err})})
}


//ลบข้อมูล
exports.remove=(req,res)=>{
    const {slug} = req.params
    Blogs.findOneAndRemove({slug}).then((blog)=>{
        res.json({message:"ลบบทความเรียบร้อย"})
    }).catch((err)=>{res.status(400).json({error:err})})

}

//อัปเดตข้อมูล
exports.update=(req,res)=>{
    const {slug} = req.params
    const {title,content,author}=req.body
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).then((blog)=>{
        res.json(blog)
    }).catch((err)=>{res.status(400).json({error:err})})

}

exports.createType=(req,res)=>{
    const {type}=req.body
    
    if(!type){
        return res.status(400).json({error:"กรุณาป้อนประเภท"})
            
    }
    //res.json({title,content,author,slug})
    
    //save data
    Types.create({type})
    .then((result)=>{res.json(result)})
    .catch((err)=>{res.status(400).json({error:"มีชื่อประเภทซ้ำกัน"})})


}
//ดึงข้อมูลบทความทั้งหมด
exports.getAllTypes=(req,res,next)=>{
    Types.find({}).then((types)=>{
        res.json(types)
    }) .catch((err)=>{res.status(400).json({error:err})})

}

exports.getTypeID=(req,res,next)=>{
    const {type} = req.params
    Types.findOne({type:type}).then((types)=>{
        res.json(types._id)
    }).catch((err)=>{res.status(400).json({error:err})})
    

}