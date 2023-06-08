const Chats = require("../models/chat")

exports.createChats=(req,res)=>{
    const {user_Message,author,admin_Message} = req.body
    if(!user_Message){
        return res.status(400).json({error:"กรุณาใส่ข้อความ"})

    }

    Chats.create({user_Message, author,admin_Message})
    .then((result)=>{res.json(result)})
    .catch((err)=>{res.status(400).json({error:err})})
}

exports.getChatByUser=(req,res)=>{
    const {email} = req.params
    Chats.find({author:email}).then((chats)=>{
        res.json(chats)
    }).catch((err)=>{res.status(400).json({error:err})})
}

// exports.getChatByUser=(req,res)=>{
//     const {email} = req.params
//     Chats.find({author:email}).then((chats)=>{
//         res.json(chats)
//     }).catch((err)=>{res.status(400).json({error:err})})
// }
//all item by status 
exports.getChatsByStatus=(req,res,next)=>{
    const {status} = req.params
    
    Chats.find({status:status}).then((chat)=>{
        res.json(chat)
    }) .catch((err)=>{res.status(400).json({error:err})})

}
exports.updateStatusAndChatAdmin=(req,res)=>{
    const {id} = req.params
    const {status,Message}=req.body
    Chats.findOneAndUpdate({_id:id},{status,admin_Message:Message},{new:true}).then((chat)=>{
        res.json(chat)
    }).catch((err)=>{res.status(400).json({error:err})})
}