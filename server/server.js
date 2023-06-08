const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const blogRoute = require('./routes/blog') //import ตัว router ที่สร้างไว้ในไฟล์ blog
const authRoute = require('./routes/auth')
const itemRoute = require('./routes/Item')
const cactusRout = require('./routes/cactus')
const chatsRoute = require('./routes/chats')
const app = express()

//connect cloud database 1 connection string or url 2 obtion 
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
}).then(()=>console.log("conectin complete"))
.catch((err)=>console.log(err))

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     // res.setHeader("Accept", "application/json")
//     // res.setHeader(" Content-Type"," application/json")
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });

//middleware
app.use(express.json()) //server respond .json for client
app.use(cors())
app.use(morgan("dev"))
app.use('/uploads', express.static('uploads'))
app.use('/profile', express.static('profile'))
//route เมื่อเราสั่งให้ run ตัว servsers ขึ้นมา และจะให้ตัว servser respond อะไรกลับไป
app.use('/api',blogRoute) // ถ้าระบุ url เป็น /api จะ respond json
app.use('/api',authRoute)
app.use('/api',itemRoute)
app.use('/api',cactusRout)
app.use('/api',chatsRoute)
/*
app.get("*",(req,res) =>{
    res.json({
        data:"message from server"
    })
})
*/

const port = process.env.PORT || 8080 // จะใช้ 8080 ถ้าไม่ระบุ port
app.listen(port,()=>console.log(`start server in port ${port}`))


