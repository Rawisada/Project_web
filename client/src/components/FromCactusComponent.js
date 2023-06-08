import { useState,useEffect } from "react";
import NavbarComponent from "./NaberComponent";
import axios from "axios";
import Swal from "sweetalert2";
import "react-quill/dist/quill.snow.css"
import {useHistory } from "react-router-dom";
import "../FileCSS/ItemComponent.css";
import renderHTML from "html-react-parser";


const FromCactusComponent=(props)=>{
    const [items,setitem] = useState([])
    const [notations, setNotation] = useState('')
    const [slug,setSlug] = useState('')
    
    let history = useHistory()
    function mySubmit(element, namepictures, images, contents, types, authors, references, slugs){
        console.table({namepictures, images, contents, types, authors, references, slugs});
        const namepicture = namepictures
        const image = images
        const content = contents
        const type = types
        const author = authors
        const reference =references
        const formdata = new FormData
        formdata.append('namepicture', namepicture)
        formdata.append('image',image)
        formdata.append('content',content)
        formdata.append('type',type)
        formdata.append('author', author)
        formdata.append('reference', reference)
        
        
        console.table({namepicture, image, content, type, author, reference});
        axios
        .post(`${process.env.REACT_APP_API}/createCactus`, {namepicture, image, content, type, author, reference})
        .then(response=>{
            //alert("บันทึกข้อมูลเรียบร้อย");
            Swal.fire(
                'Succcess!',
                'บันทึกข้อมูลเรียบร้อย',
                'success'
              )

            const status = "Succeed"
            const notation = "-"
            axios.put(`${process.env.REACT_APP_API}/items/${slugs}`,{status, notation})
            .then(response=>{
                console.log("updata item")
            }).catch(err=>alert(err))
            
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

    function myDenial(element, slug){
        let x = document.getElementById("denial");
        if (window.getComputedStyle(x).display === "none") {
            x.style.display = "block";
            setSlug(slug)

          
        } else {
            x.style.display = "none";
            let btn1 = document.getElementById("btnDenialClear")
            btn1.addEventListener('click', ()=>clearNotation())
        }
    }

    
    const submitNotation=(even)=>{
        setNotation(even.target.value)
        console.log(notations)
    }

    const clearNotation=(even)=>{
        setNotation("")
        setSlug("")
    }

    function mySubmitDenial(element,slug,notations){
        const status = "Denial"
        console.log(notations)
        axios.put(`${process.env.REACT_APP_API}/items/${slug}`,{status, notations})
        .then(response=>{
            console.log("updata item")
            setNotation("")
            setSlug("")
        }).catch(err=>alert(err))
    }


    const fetchData=()=>{
        axios.get(`${process.env.REACT_APP_API}/getitems/Waiting`)
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
        <div className="container p-3">
            <NavbarComponent/>
            
            {/* {items.map((item,index)=>(
                <div className="row" key={index} style={{borderBottom:'1px solid silver'}}>
                    <div className="col pt-3 pb-2 top-flexbox">
                    <div className="top-item">
                        <img className="imageItem" src={`http://localhost:5500/${item.image}`}/>
                    </div>
                    <div className="top-item data">
                        <br></br>
                        <Link to={`/items/${item.slug}`} target="_parent">
                            <h2>{item.namepicture}</h2>
                        </Link>
                        <p>{renderHTML(item.content)}</p>  
                        <p className="text-muted">ผู้เขียน : {item.author}, เผยแพร่ : {new Date(item.createdAt).toLocaleString()}</p>
                        <button className="btn btn-outline-danger" >Save</button> &nbsp;
                        <button className="btn btn-outline-danger" >Delete</button>
                    </div>

               
                    </div>
                </div>
            ))} */}

            <table class="table table-hover" >
                <thead>
                    <tr>
                        <th scope="col" id="thimage">Picture</th>
                        <th scope="col" id="thname">Name Picture</th>
                        <th scope="col" >Type</th>
                        <th scope="col" id="thcontent">Content</th>
                        <th scope="col" id="thauthor">Author</th>
                        <th scope="col" >Referemce</th>
                        <th scope="col" id="thdate">Date</th>
                        <th scope="col"id="thnotation">Function</th>
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
                            <td><button className="btn btn-success function" onClick={()=>mySubmit(this, item.namepicture,item.image,item.content,item.type,item.author,item.reference,item.slug)}>ACCEPT</button>
                                <button className="btn btn-outline-secondary function" onClick={()=>myDenial(this,item.slug)} >DENIAL</button></td>
                            
                        </tr>
                    ))}
                    
   
                </tbody>
            </table>

      <br/>
      
      <form id="denial">
            <p>You decline the request</p>
            
            <input type="text" className="form-input" value={notations} onChange={submitNotation} placeholder="Notation"/>
            <button className="btn btn-success functionDenial" id="btnDenial" onClick={()=>mySubmitDenial(this,slug,notations)}>Submit</button>
            &nbsp;
            <button className="btn btn-outline-secondary  functionDenial" id="btnDenialClear">Cencel</button>
        </form>
        </div>
        
    )

}

export default FromCactusComponent;