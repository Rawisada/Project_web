//เก็บ token / email => session storage
import axois from "axios";
import { useState,useEffect } from "react";


export const authenticate=(response,next)=>{
    if(window !== "undefined"){
        //เก็ยขอมูลลง sesion storage
        sessionStorage.setItem("token",JSON.stringify(response.data.token))
        sessionStorage.setItem("email",JSON.stringify(response.data.email))
        sessionStorage.setItem("role",JSON.stringify(response.data.role))
    }
    next()
}

//ดึง token
export const getToken=()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false
        }
    }
}

export const getEmail=()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("email")){
            return JSON.parse(sessionStorage.getItem("email"))
        }else{
            return false
        }
    }

}


export const getRole=()=>{
    if(window !== "undefined"){
        if(sessionStorage.getItem("role")){
            return JSON.parse(sessionStorage.getItem("role"))
        }else{
            return false
        }
    }

}
export const logout=(next)=>{
    if(window !== "undefined"){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("email")
        sessionStorage.removeItem("role")
    }
    next()
}


// export const getRole=async ()=>{
//     //const [user, setUser] = useState('')
//     axois.get(`${process.env.REACT_APP_API}/getRole/${getEmail()}`)
//     .then(response=>{
//         return response.data
//     }).catch(err=>alert(err))    
    
// }
