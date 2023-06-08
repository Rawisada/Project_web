import { useState,useEffect } from "react";
import NavbarOfUserComponent from "./NaberOfUserComponent";
import axios from "axios";
import Swal from "sweetalert2";
import "react-quill/dist/quill.snow.css"

import "../FileCSS/ItemComponent.css";
import renderHTML from "html-react-parser";
import { getEmail } from "../services/authorize";
import FooterComponent from "./FooterComponent";

const HistoryChatsComponent=(props)=>{
    const [chats,setCahts] = useState([])

    
    

    const fetchData=()=>{
        axios.get(`${process.env.REACT_APP_API}/getChat/${getEmail()}`)
        .then(response=>{
            setCahts(response.data)
            console.log(response.data)
        }).catch(err=>alert(err));
    }
    useEffect(()=>{
        fetchData()
      },[])

    return(
        <div>
        <div className="container p-3">
            <NavbarOfUserComponent/>
            

            <table class="table table-hover" >
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col" >Message</th>
                        <th scope="col" >Admin</th>
                        <th scope="col" >Status</th>

                    </tr>
                </thead>
                <tbody>
                    {chats.map((chat,index)=>(
                        <tr  key={index} >
                            <td>{new Date(chat.createdAt).toLocaleString()}</td>
                            <td>{chat.user_Message}</td>
                            <td>{chat.admin_Message}</td>
                            <td>{chat.status}</td>
                            
    
                            
                        </tr>
                    ))}
                    
   
                </tbody>
            </table>

      <br/>
      

    </div>
        <FooterComponent/>
            
        <div >
            <a href="javascript:window.history.back()" id="back"><b>&larr;</b></a>
        </div>
       
    </div>
        
    )

}

export default HistoryChatsComponent;