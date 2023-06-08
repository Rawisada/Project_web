const slugify = require("slugify")
const Items = require("../models/Items")
const Types = require("../models/types")
const { v4: uuidv4} = require('uuid')


exports.createItems=(req,res)=>{
    const {namepicture,type,content,reference,author} = req.body
    const image = req.file.path
    

    //let slug = slugify(namepicture)
    //if(!slug)slug = uuidv4();
    let slug = uuidv4();
    //validate
    switch(true){
        case !namepicture:
            return res.status(400).json({error:"กรุณาป้อนชื่อรูปภาพ"})
            break;
        case !image:
            return res.status(400).json({error:"กรุณาเพิ่มรูปภาพ"})
            break;
        case !type:
            return res.status(400).json({error:"กรุณาป้อนประเภท"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหา"})
            break;
    }

    
    //save data
    Items.create({namepicture,image,type,content,reference,author,slug})
    .then((result)=>{res.json(result)})
    .catch((err)=>{res.status(400).json({error:err})})



}
//all item
exports.getAllItems=(req,res,next)=>{
    Items.find({}).then((items)=>{
        res.json(items)
    }) .catch((err)=>{res.status(400).json({error:err})})

}
//all item by status 
exports.getItemsByStatus=(req,res,next)=>{
    const {status} = req.params
    Items.find({status:status}).then((items)=>{
        res.json(items)
    }) .catch((err)=>{res.status(400).json({error:err})})

}
// update status
exports.updateStatusAndNotation=(req,res)=>{
    const {slug} = req.params
    const {status,notations}=req.body
    Items.findOneAndUpdate({slug},{status,notation:notations},{new:true}).then((item)=>{
        res.json(item)
    }).catch((err)=>{res.status(400).json({error:err})})
}
exports.singleItem=(req,res)=>{
    const {slug} = req.params
    Items.findOne({slug:slug}).then((item)=>{
        res.json(item)
    }).catch((err)=>{res.status(400).json({error:err})})
}

exports.findItemByEmail=(req,res)=>{
    const {author} = req.params
    Items.find({author:author}).then((item)=>{
        res.json(item)
    }).catch((err)=>{res.status(400).json({error:err})})
}

exports.createType=(req,res)=>{
    const {type}=req.body
    if(!type){
        return res.status(400).json({error:"กรุณาป้อนประเภท"})
            
    }
    Types.create({type})
    .then((result)=>{res.json(result)})
    .catch((err)=>{res.status(400).json({error:"มีชื่อประเภทซ้ำกัน"})})


}

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

exports.getTypeByID=(req,res,next)=>{
    const {id} = req.params
    Types.findById(id).then((types)=>{
        res.json(types.type)
    }).catch((err)=>{res.status(400).json({error:err})})
    

}

exports.updateType=(req,res)=>{
    const {id} = req.params
    const {type} = req.body
    Types.findOneAndUpdate({_id:id},{type},{new:true}).then((type)=>{
        res.json(type)
    }).catch((err)=>{res.status(400).json({error:err})})

}

exports.deleteType=(req,res)=>{
    const {id}=req.params
    Types.findByIdAndRemove(id).then((types)=>{
        res.json(types.type)
    }).catch((err)=>{res.status(400).json({error:err})})
}
exports.delectItemByType=(req,res)=>{
    const {id} = req.params
    Items.findOneAndRemove({type:id}).then((cactus)=>{
        res.json(cactus)
    }).catch((err)=>{res.status(400).json({error:err})})
}