import { useState,useEffect } from "react";
import NavbarComponent from "./NaberComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuil from "react-quill";
import "react-quill/dist/quill.snow.css"
import axois from "axios";
import { getEmail} from "../services/authorize";
import picture from "../FileCSS/400x4005.png";
import FooterComponent from "./FooterComponent";
import {useHistory } from "react-router-dom";

const FromCactusForAdminComponent=(props)=>{
    const [state,setState] = useState({
        namepicture:"",
        reference:"",
        
    })

    const{namepicture,reference} = state
    const[content, setContent] = useState('')
    const[type, setType] = useState('')
    const[typesAll,setTypesAll] = useState([])
    const[image, setImage] = useState('')
    const[imageView, setImageView] = useState('')
    const author = getEmail()
   
    const fetchData=()=>{
      axois.get(`${process.env.REACT_APP_API}/types`)
      .then(response=>{
        setTypesAll(response.data)
      })
      .catch(err=>alert(err));
    }
    useEffect(()=>{
      fetchData()
    },[])

    const inputValue = name => event =>{
        setState({...state,[name]:event.target.value});
    }

    const submitContent=(even)=>{
        setContent(even)
    }

    const submitTypes=(even)=>{
        let e = document.getElementById("selectTypes")
        console.log(e.value)
        axios.get(`${process.env.REACT_APP_API}/typesID/${e.value}`)
        .then(response=>{
            console.log(response.data)
            setType(response.data)
        })
    }


    const submitImage=(even)=>{
        setImage(even.target.files[0])
        console.log(even.target.files[0])
        let reader = new FileReader();
        reader.readAsDataURL(even.target.files[0]);
        reader.onload =()=>{
            console.log(reader.result);
            setImageView(reader.result);
        }

    }

    let history = useHistory()
    const submitForm=(e)=>{
        e.preventDefault();
        console.log("API URL =", process.env.REACT_APP_API)
        const formdata = new FormData
        formdata.append('namepicture', namepicture)
        formdata.append('image',image)
        formdata.append('type',type)
        formdata.append('content',content)
        formdata.append('reference', reference)
        formdata.append('author', author)
        axios
        .post(`${process.env.REACT_APP_API}/createCactusForAdmin`,formdata)
        .then(response=>{
            Swal.fire(
                'Succcess!',
                'บันทึกข้อมูลเรียบร้อย',
                'success'
              )
            setState({...state,namepicture:"",reference:""});
            setContent("")
            setType("")
            setImage("")
            setImageView("")
           
   
        }).catch(err=>{
            Swal.fire(
                'Error!',
                err.response.data.error,
                'error'
              )
        })
        window.location.reload()
    }



    return (


        <div>
        <div className="container p-3">
            <NavbarComponent/>
            
    
            <div className="background">
            <h1>Add Cactus</h1> 
            <form onSubmit={submitForm} enctype="multipart/form-data" >

                
                <div className="form-group">
                    {/* <label>Add Picture</label> */}
                    <br></br>
                    {/* {image=="" || image==null?"": <img width={100} height={100} src={imageView} className="showItem"/>} */}
                    <img width={100} height={100} src={imageView || picture} className="showItem"/>
                    <br></br>
                    <input type="file"  className="form-control" name="image" accept="image/*" onChange={submitImage} />
                 
                </div>

                <div className="form-group">
                    <label>Name Picture</label>
                    <input type="text" className="form-control" value={namepicture} onChange={inputValue("namepicture")}/>
                </div>
                
                <br></br>
                <div className="form-group">
                    <label>Type :</label>
                    &nbsp;
                    <select id="selectTypes"  onChange={submitTypes}>
                        <option selected>Type</option>
                        {typesAll.map(type => (
                            <option  value={type.id}>
                                {type.type}
                            </option>
                    ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Details</label>
                    <ReactQuil
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        className="pb-2 mb-3"
                        placeholder="Write your article description."
                        
                    />
                </div>

                <div className="form-group">
                    <label>Reference</label>
                    <input type="text" className="form-control" value={reference}  onChange={inputValue("reference")}/>
                </div>


                {/* <div className="form-group">
                    <label>ผู้แต่ง</label>
                    <input type="text" className="form-control" value={author}  onChange={inputValue("author")}/>
                </div> */}

                <br/>
                
                <input type="submit" value="Save" className="btn btn-primary"/>

            </form>
            </div>

            
        </div>
        <FooterComponent/>
            
            <div >
                <a href="javascript:window.history.back()" id="back"><b>&larr;</b></a>
            </div>

        </div>

      );
}

export default FromCactusForAdminComponent;