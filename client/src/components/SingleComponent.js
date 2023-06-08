import axois from "axios";
import { useState,useEffect } from "react";
import NavbarComponent from "./NaberComponent";
import renderHTML from "html-react-parser";
import {getEmail } from "../services/authorize";
import { useHistory } from "react-router-dom";

const SingleComponent=(props)=>{

    const [blog, setBlog] = useState('')
    useEffect(()=>{
        axois.get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
        .then(response=>{
            setBlog(response.data)
        }).catch(err=>alert(err))
    },[props])

 

    return ( 
        <div className="container p-5">
            <NavbarComponent/>
            {blog && <div>
                <h1>{blog.title}</h1>
                <h1>{getEmail()}</h1>
             
                <div className="pt-3">{renderHTML(blog.content)}</div>  
                <p className="text-muted">ผู้เขียน : {blog.author}, เผยแพร่ : {new Date(blog.createdAt).toLocaleString()}</p>
                
                
            </div>}
            
        </div>

    )
}

export default SingleComponent;