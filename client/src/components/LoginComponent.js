import {useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {authenticate} from "../services/authorize";
import {useHistory } from "react-router-dom";
import cactus from "../FileCSS/R.png"
import "../FileCSS/Login.css";

const LoginComponent=(props)=>{
    console.log("loadd")
    const [state,setState] = useState({
        email:"",
        password:""
    })

    const{email, password} = state

    const inputValue = name => event =>{
        setState({...state,[name]:event.target.value});
    }

    //let history = useHistory();
    let history = useHistory()



    const submitForm=(e)=>{
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/login`, {email, password})
        .then(response=>{
            //login สำเร็จ
            if(response.data.role === 'user'){
                authenticate(response,()=>history.push("/cactusHome"))
                window.location.reload()
            }if (response.data.role === 'admin') {
                authenticate(response,()=>history.push("/"))
                window.location.reload()
            } 
        }).catch(err=>{
            Swal.fire('แจ้งเตือน', err.response.data.error,'error')
            
        })

    }

    //getEmail() && history.push('/')
    
 
    return(
        <div className="container p-5 login">
            <img className="logo"src={cactus} alt="cactus"/>    
            <h1 id="wordlogin" className="aspect-11"> LOG IN</h1> 
       
        
            <form onSubmit={submitForm}>
                <div className="form-group">

                    <label className="col-3">Email</label>
                    <input type="email" className="form-input" value={email} onChange={inputValue("email")} placeholder="Email"/>
                </div>
           
                <div className="form-group">
                    <label className="col-3">Password</label>
                    <input type="password" className="form-input" value={password}  onChange={inputValue("password")} placeholder="Password"/>
                </div>

                <br/>
            
                <input type="submit" value="Sign in" className="btn btn-primary" target="_parent"/>
                <br></br>
                <p className="wordlogin2">Don't have an account? <b><a href="/register" className="wordlogin3">Sign up</a></b></p>

            </form>

        </div>
    );
}

export default LoginComponent;