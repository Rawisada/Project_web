
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {getEmail } from "../services/authorize";
import { useHistory } from "react-router-dom";
import "../FileCSS/Login.css";
import cactus from "../FileCSS/R.png"
const SignupComponent=()=>{
    const [state,setState] = useState({
        email:"",
        fname:"",
        lname:"",
        password:""
    })

    const{email, fname, lname, password} = state
 
    const inputValue = name => event =>{
        setState({...state,[name]:event.target.value});
    }

    const submitForm=(e)=>{
        e.preventDefault();
        //console.table({email, fname, lname, password})
        console.log("API URL =", process.env.REACT_APP_API)
        axios
        .post(`${process.env.REACT_APP_API}/register`, {email, fname, lname, password})
        .then(response=>{
            //alert("บันทึกข้อมูลเรียบร้อย");
            Swal.fire(
                'Succcess!',
                'บันทึกข้อมูลเรียบร้อย',
                'success'
              )
            setState({...state,email:"",fname:"",lname:"",password:""});
           
        }).catch(err=>{
            //alert(err.response.data.error);
            Swal.fire(
                'Error!',
                err.response.data.error,
                'error'
              )
        })

    }

    //let history = useHistory()
    //getEmail() && history.push('/')

    return(
        <div className="container p-5 login">
        <img className="logo"src={cactus}/> 
        <h1 id="wordlogin">Sign up</h1> 
       

        <form onSubmit={submitForm}>
            <div className="form-group ">
                <label>Email</label>
                <input type="email" className="form-input" value={email} onChange={inputValue("email")} placeholder="Email"/>
            </div>

            <div className="form-group">
                <label>First name</label>
                <input type="text" className="form-input" value={fname} onChange={inputValue("fname")} placeholder="First name"/>
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input type="text" className="form-input" value={lname} onChange={inputValue("lname")} placeholder="Last name"/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-input" value={password}  onChange={inputValue("password")} placeholder="Password"/>
            </div>

            <br/>
            
            <input type="submit" value="Sign up" className="btn btn-primary"/>

            <p className="wordlogin2">Already a member? <b><a href="/login" className="wordlogin3">Log in</a></b></p>

        </form>
      
        </div>
    )
}

export default SignupComponent;