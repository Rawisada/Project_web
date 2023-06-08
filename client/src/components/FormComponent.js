import { useState,useEffect } from "react";
import NavbarComponent from "./NaberComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuil from "react-quill";
import "react-quill/dist/quill.snow.css"
import axois from "axios";


const FormComponent=(props)=>{
    const [state,setState] = useState({
        namepicture:"",
        reference:"",
        author:""
    })
    const{namepicture,reference,author} = state
    const[content, setContent] = useState('')
    const[type, setType] = useState('')
    const[typesAll,setTypesAll] = useState([])
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

    //กำหนดค่าให้กับ state
    const inputValue = name => event =>{
        //name = ชื่อฟิลที่อยู่ใน object state และ event.target.value = ค่าที่เราป้อนในแบบฟอร์ม
        // เอาค่าที่พิมกำหนดลงไปที่ state
        // ...state จะเข้าไปในฟิล state
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

    const submitForm=(e)=>{
        e.preventDefault();
        //console.table({title,content,author});
        console.log("API URL =", process.env.REACT_APP_API)
        axios
        .post(`${process.env.REACT_APP_API}/create`,{namepicture,type,content,reference,author})
        .then(response=>{
            //alert("บันทึกข้อมูลเรียบร้อย");
            Swal.fire(
                'Succcess!',
                'บันทึกข้อมูลเรียบร้อย',
                'success'
              )
            setState({...state,namepicture:"",reference:"",author:""});
            setContent("")
            setType("")
        }).catch(err=>{
            //alert(err.response.data.error);
            Swal.fire(
                'Error!',
                err.response.data.error,
                'error'
              )
        })
    }



    return (
        <div className="container p-5">
            <NavbarComponent/>
            <h1>เขียนบทความ</h1> 
           

            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label>ชื่อรูปภาพ</label>
                    <input type="text" className="form-control" value={namepicture} onChange={inputValue("namepicture")}/>
                </div>

                <div className="form-group">
                    <label>ประเภท</label>
                    
                    {/* {types.map((types,index)=>(

                        <div className="row" key={index}>
                            <select>
                                <option value={types.id}>{types.type}</option>
                            </select>
                               
                        </div>
                        
                       
                    ))} */}
                    <select value={type} id="selectTypes" onChange={submitTypes}>
                        {typesAll.map(type => (
                            <option  value={type.id}>
                                {type.type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>รายละเอียดบทความ</label>
                    <ReactQuil
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        className="pb-2 mb-3"
                        placeholder="เขียนรายละเอียดบทความของคุณ"
                        
                    />
                </div>

                <div className="form-group">
                    <label>แหล่งอ้างอิง</label>
                    <input type="text" className="form-control" value={reference}  onChange={inputValue("reference")}/>
                </div>


                <div className="form-group">
                    <label>ผู้แต่ง</label>
                    <input type="text" className="form-control" value={author}  onChange={inputValue("author")}/>
                </div>

                <br/>
                
                <input type="submit" value="Save" className="btn btn-primary"/>

            </form>
          
        </div>
      );
}

export default FormComponent;