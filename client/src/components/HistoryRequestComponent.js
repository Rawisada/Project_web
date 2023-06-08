import { useState,useEffect } from "react";
import NavbarOfUserComponent from "./NaberOfUserComponent";
import axios from "axios";
import Swal from "sweetalert2";
import "react-quill/dist/quill.snow.css"
import FooterComponent from "./FooterComponent";
import "../FileCSS/ItemComponent.css";
import renderHTML from "html-react-parser";
import { getEmail } from "../services/authorize";


const HistoryRequestComponent=(props)=>{
    const [items,setitem] = useState([])
    const [notations, setNotation] = useState('')
    
    

    const fetchData=()=>{
        axios.get(`${process.env.REACT_APP_API}/myitems/${getEmail()}`)
        .then(response=>{
            setitem(response.data)
            console.log(response.data)
        }).catch(err=>alert(err));
    }
    useEffect(()=>{
        fetchData()
      },[])


    
    let listType =[];
    function findNameType(element, id){

        axios.get(`${process.env.REACT_APP_API}/types/${id}`)
        .then(response=>{
            //setNametype(response.data)
            //console.log(response.data)
            //document.getElementsByClassName("thtype").value = `${response.data}`
            listType.push(response.data)
            showNameType()
        }).catch(err=>alert(err))
        
    }



    function showNameType(){
        for(let i=0; i < listType.length; i++){
            //console.log(i)
            //console.log(listType[i])
            document.getElementsByClassName("thtype")[i].innerHTML = `${listType[i]}`;
        }
    
    }
    
    
    
    
    return(
        <div>
        <div className="container p-3">
            <NavbarOfUserComponent/>
            

            <table class="table table-hover" >
                <thead>
                    <tr>
                        <th scope="col" id="thimage">Picture</th>
                        <th scope="col" id="thname">Name Picture</th>
                        <th scope="col" >Type</th>
                        <th scope="col" id="thcontent">Content</th>
                        <th scope="col" id="thauthor">Author</th>
                        <th scope="col" >Reference</th>
                        <th scope="col" id="thdate">Date</th>
                        <th scope="col"id="thnotation">Status</th>
                        <th scope="col"id="thnotation">Notation</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item,index)=>(
                        <tr  key={index} >
                            <td ><img className="imageItem" src={`http://localhost:5500/${item.image}`}/></td>
                            <td >{item.namepicture}</td>
                            {/* <td id="tdtype" value={nametype} onChange={typeName(item.type)}></td> */}
                            <td className="thtype" onChange={findNameType(this,item.type)}></td>
                            <td>{renderHTML(item.content)}</td>
                            <td>{item.author}</td>
                            <td>{item.reference}</td>
                            <td>{new Date(item.createdAt).toLocaleString()}</td>
                            <td>{item.status}</td>
                            <td>{item.notation}</td>
    
                            
                        </tr>
                    ))}
                    
   
                </tbody>
            </table>

      <br/>
        </div>

        <FooterComponent/>
            
        <div >
                <a href="javascript:window.history.back()"id="back"><b>&larr;</b></a>
        </div>
    

    </div>
        
    )

}

export default HistoryRequestComponent;