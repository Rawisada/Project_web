import { useState,useEffect } from "react";
import NavbarComponent from "./NaberComponent";
import axios from "axios";
import Swal from "sweetalert2";
import "react-quill/dist/quill.snow.css"

import "../FileCSS/ItemComponent.css";
import renderHTML from "html-react-parser";


const ListAllTypeComponent=(props)=>{
    const [typeAll,setTypeAll] = useState([])
    const [type, setType] = useState('')
    const [id, setId] = useState('')
    
      
    const submitEditType=(even)=>{
        setType(even.target.value)

    }

    const submitEditTypeById=(even)=>{
        setId(even.target.value)

    }

    function myEdit(element, id){


        let x = document.getElementById("edit");
        if (window.getComputedStyle(x).display === "none") {
          x.style.display = "block";
          console.log(id)
          setId(id)


        } else {
          x.style.display = "none";
          let btn1 = document.getElementById("btnEditClear")
          btn1.addEventListener('click', ()=>clearEdits())
        }
    }

 
    const clearEdits=(even)=>{
        setType("")
        setId("")
        
    }

    function mySubmitEdit(element,id,type){
        console.log(type)
        console.log(id)
        axios.put(`${process.env.REACT_APP_API}/type/update/${id}`,{type})
        .then(response=>{
            console.log("updata type")
            setType("")
            setId("")
        }).catch(err=>alert(err))
    }

  

    const fetchData=()=>{
        axios.get(`${process.env.REACT_APP_API}/types`)
        .then(response=>{
            setTypeAll(response.data)
            console.log(response.data)
        }).catch(err=>alert(err));
    }
    useEffect(()=>{
        fetchData()
      },[])

    
    function deleteType(element,id){
        console.log(id)
        axios.delete(`${process.env.REACT_APP_API}/type/delete/${id}`)
        .then(response=>{
            Swal.fire(
                'Succcess!',
                'Delete User',
                'success'
              )
            axios.delete(`${process.env.REACT_APP_API}/delectcactusByType/${id}`)
              .then(response=>{
                    console.log("delete cactus by type")
                    axios.delete(`${process.env.REACT_APP_API}/delectItemByType/${id}`)
                .then(response=>{
                  console.log("delete cactus by type")
                   
                }).catch(err=>alert(err));
                 
              }).catch(err=>alert(err));

     
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
            


            <table class="table table-hover" >
                <thead>
                    <tr>
                        <th scope="col" id="thNameType">Name Type</th>
                        <th scope="col" id="thFuntionType">Function</th>
                    </tr>
                </thead>
                <tbody>
                    {typeAll.map((types,index)=>(
                        <tr  key={index} >
                            <td id="tdNameType">{types.type}</td>
                            <td>
                                <button className="btn btn-success function" onClick={()=>myEdit(this,types._id)} >EDIT</button>
                                <button className="btn btn-outline-secondary function" onClick={()=>deleteType(this,types._id)}>DELETE</button></td>
                        </tr>
                    ))}
                    
   
                </tbody>
            </table>

      <br/>

      
      <div >
                <a href="/createType"id="add"><b>+</b></a>
    </div>
      
      <form id="edit">
            <p>EDIT TYPE</p>
            <input type="text" className="form-input" value={type} onChange={submitEditType} placeholder="Type"/>
            <button className="btn btn-success functionDenial" id="btnEdit" onClick={()=>mySubmitEdit(this,id,type)}>Submit</button>
            &nbsp;
            <button className="btn btn-outline-secondary functionDenial" id="btnEditClear">Cencel</button>
        </form>
        </div>
        
    )

}

export default ListAllTypeComponent;

// onClick={()=>mySubmitEdit(this,idFocus,typeEdit)}