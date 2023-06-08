import { useState,useEffect } from "react";
import NavbarOfUserComponent from "./NaberOfUserComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuil from "react-quill";
import "react-quill/dist/quill.snow.css"
import {getEmail } from "../services/authorize";
import { useHistory } from "react-router-dom";
import FooterComponent from "./FooterComponent";

const FromChatComponent=(props)=>{

    

    // const{type} = state
    const [user_Message, setUser] = useState('')


    const submitMessage=(even)=>{
        setUser(even.target.value)
    }

    
    const submitForm=(e)=>{
        e.preventDefault();
        const author = getEmail()
        //console.table({title,content,author});
        console.log("API URL =", process.env.REACT_APP_API)
        const admin_Message = "-"
        axios
        .post(`${process.env.REACT_APP_API}/createChats`, {user_Message,author,admin_Message})
        .then(response=>{
            //alert("บันทึกข้อมูลเรียบร้อย");
            Swal.fire(
                'Succcess!',
                'บันทึกข้อมูลเรียบร้อย',
                'success'
              )
            setUser("")
            
        }).catch(err=>{
            //alert(err.response.data.error);
            Swal.fire(
                'Error!',
                err.response.data.error,
                'error'
              )
        })
    }



    
    return (
        <div>
        <div className="container p-3">
            <NavbarOfUserComponent/>    
            <div>
            <h1 id="contact">Contact Admin</h1> 
           

                <form onSubmit={submitForm}>

                    <div >
                        <label className="label-contact">Message</label>
                        <textarea type="textarea" className="form-contact" value={user_Message} onChange={submitMessage} placeholder="Message"/>
                    </div>


                    <br/>
                
                    <input type="submit" value="Save" className="btn-contact"/>

                </form>

            </div>
            

        </div>
        
        <FooterComponent/>                                                                                      

            
        <div >
            <a href="/historyChats"id="add"><b>!</b></a>
        </div>


        <div >
            <a href="/cactusHome" id="back"><b>&larr;</b></a>
        </div>
    </div>
    );
}

export default FromChatComponent;