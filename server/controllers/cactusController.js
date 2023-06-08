const slugify = require("slugify")
const Cactus = require("../models/cactus")
const Types = require("../models/types")
const { v4: uuidv4} = require('uuid')


exports.createCactus=(req,res)=>{
    const {namepicture, image, content, type, author, reference} = req.body
  
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
    Cactus.create({namepicture,image,type,content,reference,author,slug})
    .then((result)=>{res.json(result)})
    .catch((err)=>{res.status(400).json({error:err})})

}
exports.createCactusNotImage=(req,res)=>{
    const {namepicture, content, type, author, reference} = req.body
    const image = req.file.path
    
    let slug = uuidv4();
    
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
    Cactus.create({namepicture,image,type,content,reference,author,slug})
    .then((result)=>{res.json(result)})
    .catch((err)=>{res.status(400).json({error:err})})



}
exports.updateCactus=(req,res)=>{
    const {slug} = req.params
    const {namepicture,type,content,reference} = req.body
    const image = req.file.path
    Cactus.findOneAndUpdate({slug},{namepicture,image,type,content,reference},{new:true}).then((cactus)=>{
        res.json(cactus)
    }).catch((err)=>{res.status(400).json({error:err})})
}

exports.updateCactusNoImage=(req,res)=>{
    const {slug} = req.params
    const {namepicture,type,content,reference} = req.body
    Cactus.findOneAndUpdate({slug},{namepicture,type,content,reference},{new:true}).then((cactus)=>{
        res.json(cactus)
    }).catch((err)=>{res.status(400).json({error:err})})
}
exports.delectCactus=(req,res)=>{
    const {slug} = req.params
    Cactus.findOneAndRemove({slug:slug}).then((cactus)=>{
        res.json(cactus)
    }).catch((err)=>{res.status(400).json({error:err})})
}
exports.delectCactusByType=(req,res)=>{
    const {id} = req.params
    Cactus.findOneAndRemove({type:id}).then((cactus)=>{
        res.json(cactus)
    }).catch((err)=>{res.status(400).json({error:err})})
}
exports.getAllCactus=(req,res,next)=>{
    Cactus.find({}).then((cactus)=>{
        res.json(cactus)
    }).catch((err)=>{res.status(400).json({error:err})})
}

exports.getCactusBylimit=(req,res,next)=>{
    Cactus.find({}).sort({like: -1 }).limit(4).then((cactus)=>{
        res.json(cactus)
    }).catch((err)=>{res.status(400).json({error:err})})
}


exports.getAllCactusByUser=(req,res,next)=>{
    const {user} = req.params
    Cactus.find({user:{user:user}}).then((cactus)=>{
        res.json(cactus)
    }).catch((err)=>{res.status(400).json({error:err})})
}

exports.getAllCactusByWord=(req,res,next)=>{
    const {word} = req.params
    const {type} = req.params
    if(word == "-" && type =="-"){
        Cactus.find({}).then((cactus)=>{
            res.json(cactus)
        }).catch((err)=>{res.status(400).json({error:err})})
    }else if(word != "-" && type == "-"){
        Cactus.find({namepicture:{'$regex': word}}).then((cactus)=>{
            res.json(cactus)
        }).catch((err)=>{res.status(400).json({error:err})})
    }else if(word == "-" && type != "-"){
        Cactus.find({type:type}).then((cactus)=>{
            res.json(cactus)
        }).catch((err)=>{res.status(400).json({error:err})})
    }
    else{
        Cactus.find({namepicture:{'$regex': word},type:type}).then((cactus)=>{
            res.json(cactus)
        }).catch((err)=>{res.status(400).json({error:err})})
    }

}

exports.getAllCactusByLikeMoreToLess=(req,res,next)=>{
   
    
    const {word} = req.params
    const {type} = req.params
    if(word == "-" && type =="-"){
        Cactus.find({}).sort({like: -1 }).then((cactus)=>{
            res.json(cactus)
        }).catch((err)=>{res.status(400).json({error:err})})
    }else if(word != "-" && type == "-"){
        Cactus.find({namepicture:{'$regex': word}}).sort({like: -1 }).then((cactus)=>{
            res.json(cactus)
        }).catch((err)=>{res.status(400).json({error:err})})
    }else if(word == "-" && type != "-"){
        Cactus.find({type:type}).sort({like: -1 }).then((cactus)=>{
            res.json(cactus)
        }).catch((err)=>{res.status(400).json({error:err})})
    }
    else{
        Cactus.find({namepicture:{'$regex': word},type:type}).sort({like: -1 }).then((cactus)=>{
            res.json(cactus)
        }).catch((err)=>{res.status(400).json({error:err})})
    }
}

exports.getAllCactusByLikeLessToMore=(req,res,next)=>{
    const {word} = req.params
    const {type} = req.params
    if(word == "-" && type =="-"){
        Cactus.find({}).sort({like: 1 }).then((cactus)=>{
            res.json(cactus)
        }).catch((err)=>{res.status(400).json({error:err})})
    }else if(word != "-" && type == "-"){
        Cactus.find({namepicture:{'$regex': word}}).sort({like: 1 }).then((cactus)=>{
            res.json(cactus)
        }).catch((err)=>{res.status(400).json({error:err})})
    }else if(word == "-" && type != "-"){
        Cactus.find({type:type}).sort({like: 1 }).then((cactus)=>{
            res.json(cactus)
        }).catch((err)=>{res.status(400).json({error:err})})
    }
    else{
        Cactus.find({namepicture:{'$regex': word},type:type}).sort({like: 1 }).then((cactus)=>{
            res.json(cactus)
        }).catch((err)=>{res.status(400).json({error:err})})
    }
}

exports.getAllCactusByDateLatestToOldest=(req,res,next)=>{
   
    const {word} = req.params
    const {type} = req.params
    if(word == "-" && type =="-"){
        Cactus.find({}).sort({createdAt: -1 }).then((cactus)=>{
            res.json(cactus)
        }).catch((err)=>{res.status(400).json({error:err})})
    }else if(word != "-" && type == "-"){
        Cactus.find({namepicture: {'$regex': word}}).sort({createdAt: -1 }).then((cactus)=>{
            res.json(cactus)
        }).catch((err)=>{res.status(400).json({error:err})})
    }else if(word == "-" && type != "-"){
        Cactus.find({type:type}).sort({createdAt: -1 }).then((cactus)=>{
            res.json(cactus)
        }).catch((err)=>{res.status(400).json({error:err})})
    }
    else{
        //{'namepicture': {'$regex': word}}
        //namepicture: word
        Cactus.find({namepicture: {'$regex': word},type:type}).sort({createdAt: -1 }).then((cactus)=>{
            res.json(cactus)
        }).catch((err)=>{res.status(400).json({error:err})})
    }
}


exports.getCactus=async (req,res)=>{
    const {slug} = req.params
    Cactus.findOne({slug:slug}).then((cactus)=>{
        res.json(cactus)
    }).catch((err)=>{res.status(400).json({error:err})})
}
exports.getCactusByType=async (req,res)=>{
    const {type} = req.params
    Cactus.find({type:type}).then((cactus)=>{
        res.json(cactus)
    }).catch((err)=>{res.status(400).json({error:err})})
}

exports.getCactusById=async (req,res)=>{
    const {id} = req.params
    Cactus.findOne({_id:id}).then((cactus)=>{
        res.json(cactus)
    }).catch((err)=>{res.status(400).json({error:"ไม่มีรูปภาพ"})})
}

exports.updateLike=(req,res)=>{
    const {slug} = req.params
    const {like} = req.body
    Cactus.findOneAndUpdate({slug},{like:like},{new:true}).then((cactus)=>{
        res.json(cactus)
    }).catch((err)=>{res.status(400).json({error:err})})

}


exports.updateUser=(req,res)=>{
    const {slug} = req.params
    const user = req.body
    Cactus.findOneAndUpdate({slug},{$push: {user:user}},{new:true}).then((cactus)=>{
        res.json(cactus)
    }).catch((err)=>{res.status(400).json({error:err})})

}

exports.pullUser=(req,res)=>{
    const {slug} = req.params
    const user = req.body
    Cactus.findOneAndUpdate({slug},{$pull: {user:user}},{new:true}).then((cactus)=>{
        res.json(cactus)
    }).catch((err)=>{res.status(400).json({error:err})})

}

exports.getlikeOfCactus=(req,res)=>{
    const {slug} = req.params
    Cactus.findOne({slug:slug}).then((cactus)=>{
        return  res.json(cactus.like)
    
    }).catch((err)=>{res.status(400).json({error:err})})
}