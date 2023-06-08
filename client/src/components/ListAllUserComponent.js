import { useState, useEffect} from "react";
import axios from "axios";
import NavbarComponent from "./NaberComponent";
import "../FileCSS/ItemComponent.css";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";
const ListAllUserComponent=(props)=>{
    const[users, setUser] = useState([])

    const fetchData=()=>{
        axios.get(`${process.env.REACT_APP_API}/getUserEnable/true`)
        .then(response=>{
            setUser(response.data)
            //console.log(response.data)
        }).catch(err=>alert(err));
    }
    useEffect(()=>{
        fetchData()
    },[])

    function changeRole(element,email,role){
        
        axios.put(`${process.env.REACT_APP_API}/user/role/${email}`,{role})
        .then(response=>{
            Swal.fire(
                'Succcess!',
                'Update Role',
                'success'
              )
            //window.location.reload()

           
        }).catch(err=>{
            //alert(err.response.data.error);
            Swal.fire(
                'Error!',
                err.response.data.error,
                'error'
              )
        })
    }

    function changeEnable(element,email,enable){
        
        axios.put(`${process.env.REACT_APP_API}/user/enable/${email}`,{enable})
        .then(response=>{
            Swal.fire(
                'Succcess!',
                'Update Enable',
                'success'
              )
            //window.location.reload()
           
        }).catch(err=>{
            //alert(err.response.data.error);
            Swal.fire(
                'Error!',
                err.response.data.error,
                'error'
              )
        })
    }

    function deleteUser(element,email){
        
        axios.delete(`${process.env.REACT_APP_API}/user/${email}`)
        .then(response=>{
            Swal.fire(
                'Succcess!',
                'Delete User',
                'success'
              )
            window.location.reload()
           
        }).catch(err=>{
            //alert(err.response.data.error);
            Swal.fire(
                'Error!',
                err.response.data.error,
                'error'
              )
        })
    }
   




    return(
        <div className="container p-3">
            <NavbarComponent/>
            <div class="d-flex align-content-stretch flex-wrap" >
            <a href="/banlistAllUser" className="btn btn-success function">Ban list of user</a>

            <table class="table table-hover" >
                <thead>
                    <tr>
                        <th scope="col" id="thimage">Email</th>
                        <th scope="col" >FirstName</th>
                        <th scope="col" >LastName</th>
                        <th scope="col" >Role</th>
                        <th scope="col"id="thnotation">Function</th>
                    </tr>
                </thead>
                <tbody>
                {users.map((user,index)=>(
                        <tr  key={index} >
                            <td >{user.email}</td>
                            <td>{user.fname}</td>
                            <td>{user.lname}</td>
                            <td >
                                <p className="role">{user.role}</p>
                                {
                                  user.role === 'user' && (<button className="btn btn-success function " onClick={()=>changeRole(this,user.email, "admin")} >Admin</button>) 
                                }
                                                                {
                                  user.role === 'admin' && (<button className="btn btn-success function " onClick={()=>changeRole(this,user.email, "user")} >User</button>) 
                                }
                                
                                </td>
                            <td>
                                <button className="btn btn-secondary function" onClick={()=>changeEnable(this,user.email, false)} >BAN</button>
                                <button className="btn btn-secondary function"  onClick={()=>deleteUser(this,user.email)}>DELETE</button></td>
                            
                        </tr>
                    ))}
                    
   
                </tbody>
            </table>
            </div>
            </div>
        )
}

export default ListAllUserComponent ;
{/* <Link to={`/user/${user.email}`} className="btn btn-outline-secondary function" target="_parent">EDIT</Link> */}