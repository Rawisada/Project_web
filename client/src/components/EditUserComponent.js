import { useState,useEffect } from "react";
import NavbarComponent from "./NaberComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { getEmail } from "../services/authorize";
import NavbarOfUserComponent from "./NaberOfUserComponent";
import { getRole } from "../services/authorize";
import FooterComponent from "./FooterComponent";
const EditUserComponent=(props)=>{
    const [state,setState] = useState({
        email:"",
        fname:"",
        lname:""
    })
    const{email,fname,lname} = state

    const[profile, setProfile] = useState('')
    const[originImg, setOriginImg] = useState('')

    //ดึงข้อมูล
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/getUser/${getEmail()}`)
        .then(response=>{
            const{email,fname,lname,profile} = response.data
            setState({...state,email:email,fname:fname,lname:lname})
            setProfile(profile)
            setOriginImg(profile)
            console.log(profile)           
        }).catch(err=>alert(err))
    },[])

    const inputValue = name => event =>{
        setState({...state,[name]:event.target.value});
    }

    const submitProfile=(even)=>{
        
        console.log(setProfile)
        console.log(even.target.files[0])
        setProfile(even.target.files[0])
        let myprofile = document.getElementById("changeImgProfile")
        let reader = new FileReader();
        reader.readAsDataURL(even.target.files[0]);
        reader.onload =()=>{
            console.log(reader.result);
            myprofile.src = reader.result
        }

    }

    
   

    const submitForm=(e)=>{
        e.preventDefault();
        //console.table({title,content,author});
        console.log("API URL =", process.env.REACT_APP_API)
        if(profile == originImg){
            axios
            .put(`${process.env.REACT_APP_API}/update/userNoImg/${getEmail}`, {email,fname,lname})
            .then(response=>{
            //alert("บันทึกข้อมูลเรียบร้อย");
                Swal.fire(
                    'Succcess!',
                    'แกไขข้อมูลเรียบร้อย',
                    'success'
                
                )
                const{email,fname,lname,profile} = response.data
                setState({...state,email,fname,lname})
                setProfile(profile)
              
            }).catch(err=>{
                //alert(err.response.data.error);
                Swal.fire(
                    'Error!',
                    err.response.data.error,
                    'error'
                )
            })
        }else{

        const formdata = new FormData()
        formdata.append('email',email)
        formdata.append('fname',fname)
        formdata.append('lname',lname)
        formdata.append('image',profile)
        console.table({email,fname,lname,profile})
        console.log(formdata)
        axios
        .put(`${process.env.REACT_APP_API}/update/user/${getEmail}`, formdata)
        .then(response=>{
            //alert("บันทึกข้อมูลเรียบร้อย");
            Swal.fire(
                'Succcess!',
                'แกไขข้อมูลเรียบร้อย',
                'success'
                
              )
              const{email,fname,lname,profile} = response.data
              setState({...state,email,fname,lname})
              setProfile(profile)
              setOriginImg(profile)
              
        }).catch(err=>{
            //alert(err.response.data.error);
            Swal.fire(
                'Error!',
                err.response.data.error,
                'error'
              )
        })

    }


    }
    //let history = useHistory();
    //!getEmail() && history.push('/login')
    return (
        <div>
        <div className="container p-3 ">

            {
                getRole() ==="admin" && <NavbarComponent/>
            }

            {
                getRole() === "user" && <NavbarOfUserComponent/>
            }
            

        
            <div className="background">

            
            <h1>Edit User</h1> 
            <form onSubmit={submitForm} enctype="multipart/form-data" >
                <div>
                    <img id="changeImgProfile" src={`http://localhost:5500/${profile}`}/>
                    <input type="file"  className="form-control" name="image" accept="image/*" onChange={submitProfile} />
                </div>
             
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
            
            {/* 
            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-input" value={password}  onChange={inputValue("password")} placeholder="Password"/>
            </div> */}

            <br></br>
                <input type="submit" value="Update" className="btn btn-primary"/>

            </form>

            </div>
        </div>
        <FooterComponent/>
        </div>
      );
}
export default EditUserComponent;