import {Link,  useHistory} from "react-router-dom";
import { getEmail, logout } from "../services/authorize";
import profile from "../FileCSS/profile.png"
import "../FileCSS/Naber.css"
import { useState, useEffect } from "react";
import axios from "axios";




const NavbarOfUserComponent=(props)=>{
    let history = useHistory();
    const[users,setUser] = useState([])
    const fetchData=()=>{
        axios.get(`${process.env.REACT_APP_API}/getUser/${getEmail()}`)
        .then(response=>{
            setUser(response.data)
            console.log(response.data)
        }).catch(err=>alert(err));
    }
    useEffect(()=>{
        fetchData()
      },[])

    const onlogout=()=>{
        logout(()=>history.push("/login"))
        window.location.reload()

    }
    const onprofile=()=>{
        let x = document.getElementById("myfunction");
        if (window.getComputedStyle(x).display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
    }

    //const word = "-"
    return(
        <nav>
            <ul className="nav justify-content-end">
                <li className="nav-item pr-2 pb-2"><Link to="/cactusHome" className="nav-link" target="_parent">HOME</Link></li>
                {/* <li className="nav-item pr-2 pb-2"><Link to="/createItems" className="nav-link" target="_parent">ADD CACTUS </Link></li> */}
                <li className="nav-item pr-2 pb-2"><Link to={`/cactusAllByLatest/-/-`} className="nav-link " target="_parent">COLLECTION CACTUS </Link></li>
                <li className="nav-item pr-2 pb-2"><Link to="/contactAdmin" className="nav-link" target="_parent">CONTACT ADMIN </Link></li>
                <li className="nav-item pr-2 pb-2"><Link to="/AboutUs" className="nav-link" target="_parent" >ABOUT US </Link></li>
                <li className="nav-item pr-2 pb-2"><a className="nav-link" onClick={onprofile} id="profile"><img className="myprofile"src={`http://localhost:5500/${users.profile}`}/></a></li>
                {
                    !getEmail() && (
                        <li className="nav-item pr-3 pb-3">
                            <Link to="/login" className="nav-link" target="_parent">Sign in</Link></li>
                        
                    )
                }
                {
                    !getEmail() && (
                        <li className="nav-item pr-3 pb-3">c
                        <Link to="/register" className="nav-link" target="_parent" >Sign up</Link></li>
                        )
                }

            </ul>
            <div id="myfunction">
                <img className="myprofile2" src={`http://localhost:5500/${users.profile}`} />
                <p className="datauser word1">{users.fname} {users.lname}</p>
                <p className="datauser">{users.email}</p>
                <br></br>
                <ul className="nav flex-column">
                    <li className="nav-item "><Link to="/mycollection" className="nav-link detailfunction"  target="_parent">MY COLLECTION</Link></li>
                    <li className="nav-item "><Link to={`/user/${getEmail()}`} className="nav-link detailfunction"  target="_parent">SETTING</Link></li>
                    {
                    getEmail() && (
                        <li className="nav-item">
                            <Link  onClick={onlogout} className="nav-link detailfunction logout" target="_parent" >LOGOUT</Link>
                        </li>
                    )
                }
                </ul>
            </div>
            
        </nav>
        
    );

    
}

export default NavbarOfUserComponent;