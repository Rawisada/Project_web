const jwt = require("jsonwebtoken")
const UserInfo = require("../models/userDetails")
const bcrypt = require("bcryptjs")
exports.login=async (req,res)=>{
    const {email,password} = req.body
    const user = await UserInfo.findOne({email});
    if(!user){
        return res.status(400).json({error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง"})
    }
    if(user.enable == false){
        return res.status(400).json({error:"You have been suspended."})
    }
    if(await bcrypt.compare(password,user.password)){
        const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'1d'})
        const role = user.role
        if(res.status(201)){
            return res.json({token,email,role})
        }else{
            return res.status(400).json({error:"อีเมลหรือรหัสผ่านไม่ถูกต้อง"})
        }
    }
    res.status(400).json({error:"อีเมลหรือรหัสผ่านไม่ถูกต้อง"})
    // if(password === process.env.PASSWORD){
    //     //login
    //     const token = jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'1d'})
    //     return res.json({token,email})
    // }else{
    //     return res.status(400).json({error:"รหัสผ่านไม่ถูกต้อง"})
        
    // }
}

exports.register=async (req,res)=>{
    const {email,fname, lname, password,role} = req.body
    const encryptedPassword  = await bcrypt.hash(password,10);
    switch(true){
        case !email:
            return res.status(400).json({error:"กรุณาป้อนอีเมล"})
            break;
        case !fname:
            return res.status(400).json({error:"กรุณาป้อนชื่อจริง"})
            break;
        case !lname:
            return res.status(400).json({error:"กรุณาป้อนนามสกุล"})
            break;
        case !password:
            return res.status(400).json({error:"กรุณาป้อนรหัส"})
            break;
        
    }

    //save data
    UserInfo.create({email,fname, lname, password:encryptedPassword,role})
    .then((result)=>{res.json(result)})
    .catch((err)=>{res.status(400).json({error:err})})

}

//ดึงข้อมูล User ทั้งหมด
exports.getAllUser=(req,res,next)=>{
    UserInfo.find({}).then((users)=>{
        res.json(users)
    }) .catch((err)=>{res.status(400).json({error:err})})

}

exports.getAllUserByEnable=(req,res,next)=>{
    const {enable} = req.params
    UserInfo.find({enable:enable}).then((users)=>{
        res.json(users)
    }) .catch((err)=>{res.status(400).json({error:err})})

}

//ดึงroleที่สนใจอ้างอิงตาม email
exports.findRoleOfUser=async (req,res)=>{
    //const {email} = req.body
    const {email} = req.params
    const user = await UserInfo.findOne({email});
    return res.json(user.role)

}

exports.findUser=async (req,res)=>{
    //const {email} = req.body
    const {email} = req.params
    const user = await UserInfo.findOne({email});
    return res.json(user)

}

exports.updateRole=async (req,res)=>{
    const {email} = req.params
    const {role} = req.body
    UserInfo.findOneAndUpdate({email:email},{role:role},{new:true}).then((cactus)=>{
        res.json(cactus)
    }).catch((err)=>{res.status(400).json({error:err})})
}
exports.updateEnable=async (req,res)=>{
    const {email} = req.params
    const {enable} = req.body
    UserInfo.findOneAndUpdate({email:email},{enable:enable},{new:true}).then((cactus)=>{
        res.json(cactus)
    }).catch((err)=>{res.status(400).json({error:err})})
}

exports.deleteUser=async (req,res)=>{
    const {email} = req.params
    UserInfo.findOneAndRemove({email:email}).then((cactus)=>{
        res.json({message:"ลบบัญชีเรียบร้อย"})
    }).catch((err)=>{res.status(400).json({error:err})})
}

exports.addCactus=(req,res)=>{
    const {email} = req.params
    const cactus = req.body
    UserInfo.findOneAndUpdate({email:email},{ $push: {item:cactus}},{new:true}).then((cactus)=>{
        res.json(cactus)
    }).catch((err)=>{res.status(400).json({error:err})})
}


exports.pullCactus=(req,res)=>{
    const {email} = req.params
    const cactus =req.body
    UserInfo.findOneAndUpdate({email:email},{ $pull: {item:cactus}},{new:true}).then((cactus)=>{
        res.json(cactus)
    }).catch((err)=>{res.status(400).json({error:err})})
}


exports.checkCactus=(req,res)=>{
    const {email} = req.params
    const cactus = req.body
    UserInfo.find({item: {item:{$in:cactus}}},{email:email}).then((cactus)=>{
        res.json(cactus)
    }).catch((err)=>{res.status(400).json({error:err})})
}

exports.update=async (req,res)=>{
    const {email} = req.params
    const {fname} = req.body
    UserInfo.findOneAndUpdate({email:email},{fname:fname},{new:true}).then((cactus)=>{
        res.json(cactus)
    }).catch((err)=>{res.status(400).json({error:err})})
}

exports.updateUser=(req,res)=>{
    const {email,fname,lname} = req.body
    const image = req.file.path
    UserInfo.findOneAndUpdate({email:email},{email,fname,lname,profile:image},{new:true}).then((user)=>{
        res.json(user)
    }).catch((err)=>{res.status(400).json({error:err})})
}

exports.updateUserNoImg=(req,res)=>{
    const {emailOld} = req.params
    const {email,fname,lname} = req.body
    UserInfo.findOneAndUpdate({email:emailOld},{email,fname,lname},{new:true}).then((user)=>{
        res.json(user)
    }).catch((err)=>{res.status(400).json({error:err})})
}

exports.getCactusOfUser=(req,res)=>{
    const {email} = req.params
    UserInfo.findOne({email:email}).then((cactus)=>{
        return  res.json(cactus.item)
    
    }).catch((err)=>{res.status(400).json({error:err})})
}

// const user = await UserInfo.findOne({email});
//     return res.json(user.role)