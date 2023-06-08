import { useState,useEffect } from "react";
import NavbarComponent from "./NaberComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuil from "react-quill";
import "react-quill/dist/quill.snow.css"
import {getEmail } from "../services/authorize";
import { useHistory } from "react-router-dom";
import FooterComponent from "./FooterComponent";

const FormTypeComponent=(props)=>{
    const [state,setState] = useState({
        type:"",
    })
    

    const{type} = state

    

    //กำหนดค่าให้กับ state
    const inputValue = name => event =>{
        //name = ชื่อฟิลที่อยู่ใน object state และ event.target.value = ค่าที่เราป้อนในแบบฟอร์ม
        // เอาค่าที่พิมกำหนดลงไปที่ state
        // ...state จะเข้าไปในฟิล state
        setState({...state,[name]:event.target.value});
    }

    
    const submitForm=(e)=>{
        e.preventDefault();
        //console.table({title,content,author});
        console.log("API URL =", process.env.REACT_APP_API)
        axios
        .post(`${process.env.REACT_APP_API}/createType`, {type})
        .then(response=>{
            //alert("บันทึกข้อมูลเรียบร้อย");
            Swal.fire(
                'Succcess!',
                'บันทึกข้อมูลเรียบร้อย',
                'success'
              )
            setState({...state,type:""});
            
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
                <NavbarComponent/>
                <h1 id="contact">Add Item</h1> 
                <form onSubmit={submitForm}>
                    <div >
                        <label className="label-contact">Types</label>
                        <textarea type="textarea" className="form-contact" value={type} onChange={inputValue("type")} placeholder="Type"/>
                    </div>
                
                    <input type="submit" value="Save"  className="btn-contact"/>

                </form>
          
            </div>
            
            <FooterComponent/>
            
            <div >
                <a href="javascript:window.history.back()" id="back"><b>&larr;</b></a>
            </div>
        
        </div>
      );
}

export default FormTypeComponent;