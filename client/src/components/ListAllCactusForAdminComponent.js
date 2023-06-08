import { useState,useEffect } from "react";
import NavbarComponent from "./NaberComponent";
import axios from "axios";
import "../FileCSS/ItemComponent.css";
import renderHTML from "html-react-parser";
import {Link,  useHistory} from "react-router-dom";
import Swal from "sweetalert2";
import FooterComponent from "./FooterComponent";

const ListAllCactusForAdminComponent=()=>{
    const[cactuss, setCactus] =useState([])
    const[types,setType] = useState([])

    const fetchData=()=>{
        axios.get(`${process.env.REACT_APP_API}/cactus`)
        .then(response=>{
            setCactus(response.data)
            axios.get(`${process.env.REACT_APP_API}/types`)
            .then(response=>{
                setType(response.data)
            }).catch(err=>alert(err))
        }).catch(err=>alert(err));
    }
    useEffect(()=>{
        fetchData()
    },[])

    

    let listType=[];
    console.log(types)
    const tabletype  = document.querySelectorAll(".thtype")
    function findNameType(){
        for(let i=0; i < cactuss.length; i++){
            for(let j=0; j < types.length; j++){
                if(cactuss[i].type == types[j]._id){
                    tabletype[i].innerHTML = `${types[j].type}`
                }
            }
           
        }
        
     
        
    }


    


    function deleteCactus(element,slug){
        
        axios.delete(`${process.env.REACT_APP_API}/cactus/${slug}`)
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
   

    findNameType()

    // showNameType()
    return(
        <div>
        <div className="container p-3">
            <NavbarComponent/>
            <div class="d-flex align-content-stretch flex-wrap" >

            <table class="table table-hover" >
                <thead>
                    <tr>
                        <th scope="col" id="thimage">Picture</th>
                        <th scope="col" id="thname">Name Picture</th>
                        <th scope="col" >Type</th>
                        <th scope="col" id="thcontent">Content</th>
                        <th scope="col" id="thauthor">Author</th>
                        <th scope="col" >Referemce</th>
                        <td scope="col" >Like</td>
                        <th scope="col" id="thdate">Date</th>
                        <th scope="col"id="thnotation">Function</th>
                    </tr>
                </thead>
                <tbody>
                {cactuss.map((cactus,index)=>(
                        <tr  key={index} >
                            <td ><img className="imageItem" src={`http://localhost:5500/${cactus.image}`}/></td>
                            <td >{cactus.namepicture}</td>
                            {/* <td id="tdtype" value={nametype} onChange={typeName(item.type)}></td> */}
                            {/* <td className="thtype" onChange={findNameType(this,cactus.type)}></td> */}
                            {/* <td></td> */}
                            <td className="thtype"></td>
                            <td>{renderHTML(cactus.content)}</td>
                            <td>{cactus.author}</td>
                            <td>{cactus.reference}</td>
                            <td>{cactus.like}</td>
                            <td>{new Date(cactus.createdAt).toLocaleString()}</td>
                            <td><Link to={`/cactus/${cactus.slug}`} className="btn btn-outline-secondary function"  target="_parent">EDIT</Link>
                                <button className="btn btn-outline-secondary function "onClick={()=>deleteCactus(this,cactus.slug)}>DELETE</button></td>
                            
                        </tr>
                    ))}
 
                    
   
                </tbody>
            </table>

        
            </div>
        </div>
        <FooterComponent/>
            
            <div >
                <a href="javascript:window.history.back()" id="back"><b>&larr;</b></a>
            </div>
            <div >
                <a href="/createCactusForAdmin"id="add"><b>+</b></a>
            </div>
        </div>
  

    )




    

}
export default ListAllCactusForAdminComponent;