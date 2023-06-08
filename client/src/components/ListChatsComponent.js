import { useState,useEffect } from "react";
import NavbarComponent from "./NaberComponent"
import axios from "axios";
import Swal from "sweetalert2";
import "react-quill/dist/quill.snow.css"

import "../FileCSS/ItemComponent.css";
import renderHTML from "html-react-parser";
import FooterComponent from "./FooterComponent";


const ListChatsComponent=(props)=>{
    const [chats,setCahts] = useState([])
    const [Message, setMessge] = useState('')
    const [id, setId] = useState('')
    const fetchData=()=>{
        axios.get(`${process.env.REACT_APP_API}/getChatAll/Waiting`)
        .then(response=>{
            setCahts(response.data)
            console.log(response.data)
        }).catch(err=>alert(err));
    }
    useEffect(()=>{
        fetchData()
      },[])

    const submitMessage=(even)=>{
        setMessge(even.target.value)
        console.log(Message)
    }
    function myEdit(element, id){
        let x = document.getElementById("edit");
        if (window.getComputedStyle(x).display === "none") {
          x.style.display = "block";
          console.log(id)
          setId(id)
          console.log(id)
        } else {
          x.style.display = "none";
          let btn1 = document.getElementById("btnEditClear")
          btn1.addEventListener('click', ()=>clearEdits())
        }
    }
    function mySubmitEdit(element,id,Message){
        console.log(Message)
        console.log(id)
        const status = "Replied"
        axios.put(`${process.env.REACT_APP_API}/updateChats/${id}`,{status,Message})
        .then(response=>{
            console.log("updata message")
            setMessge("")
            setId("")
        }).catch(err=>alert(err))
    }
    const clearEdits=(even)=>{
        setMessge("")
        setId("")
        
    }


    return(
        <div>
        <div className="container p-3">
            
            
            <NavbarComponent/>
            <table class="table table-hover" >
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col" >Message</th>
                        <th scope="col" >Function</th>

                    </tr>
                </thead>
                <tbody>
                    {chats.map((chat,index)=>(
                        <tr  key={index} >
                            <td>{new Date(chat.createdAt).toLocaleString()}</td>
                            <td>{chat.user_Message}</td>
                            <td><button className="btn btn-success function" onClick={()=>myEdit(this,chat._id)}>Reply</button></td>
                            
                            
    
                            
                        </tr>
                    ))}
                    
   
                </tbody>
            </table>

      <br/>
      <form id="edit">
            <p>You reply to the user</p>
            
            <input type="text" className="form-input" value={Message} onChange={submitMessage} placeholder="Reply"/>
            <button className="btn btn-success functionDenial" id="btnEdit" onClick={()=>mySubmitEdit(this,id,Message)}>Submit</button>
            &nbsp;
            <button className="btn btn-outline-secondary functionDenial" id="btnEditClear">Cencel</button>
        </form>
      

    </div>
        <FooterComponent/>
            
        <div >
            <a href="javascript:window.history.back()" id="back"><b>&larr;</b></a>
        </div>
    </div>
    )
}
export default ListChatsComponent;