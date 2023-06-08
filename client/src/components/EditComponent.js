import { useState, useEffect } from "react";
import NavbarComponent from "./NaberComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuil from "react-quill";
import "react-quill/dist/quill.snow.css"
import {getEmail } from "../services/authorize";
import { useHistory } from "react-router-dom";

const EditComponent=(props)=>{
    const [state,setState] = useState({
        title:"",
        author:"",
        slug:""
    })
    const{title,author,slug} = state

    
    const[content, setContent] = useState('')

    const submitContent=(even)=>{
        setContent(even)
    }

    //ดึงข้อมูล
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
        .then(response=>{
            const {title,content,author,slug} = response.data
            setState({...state,title,author,slug})
            setContent(content)
            //setBlog(response.data)
        }).catch(err=>alert(err))
    },[])

    const showUpdateFrom=()=>(
        <form onSubmit={submitForm}>
        <div className="form-group">
            <label>ชื่อบทความ</label>
            <input type="text" className="form-control" value={title} onChange={inputValue("title")}/>
        </div>

        <div className="form-group">
            <label>รายละเอียดบทความ</label>
            <ReactQuil
                        value={content}
                        onChange={submitContent}
                        theme="snow"
                        className="pb-5 mb-3"
                        placeholder="เขียนรายละเอียดบทความของคุณ"
                        
                    />
        </div>

        <div className="form-group">
            <label>ผู้แต่ง</label>
            <input type="text" className="form-control" value={author}  onChange={inputValue("author")}/>
        </div>

        <br/>
        
        <input type="submit" value="Update" className="btn btn-primary"/>

        </form>
    )
    //กำหนดค่าให้กับ state
    const inputValue = name => event =>{
        //name = ชื่อฟิลที่อยู่ใน object state และ event.target.value = ค่าที่เราป้อนในแบบฟอร์ม
        // เอาค่าที่พิมกำหนดลงไปที่ state
        // ...state จะเข้าไปในฟิล state
        setState({...state,[name]:event.target.value});
    }

    const submitForm=(e)=>{
        e.preventDefault();
        //console.table({title,content,author});
        console.log("API URL =", process.env.REACT_APP_API)
        axios
        .put(`${process.env.REACT_APP_API}/blog/${slug}`, {title,content,author})
        .then(response=>{
            //alert("บันทึกข้อมูลเรียบร้อย");
            Swal.fire(
                'Succcess!',
                'แกไขข้อมูลเรียบร้อย',
                'success'
                
              )
              const {title,content,author,slug} = response.data
              setState({...state,title,author,content,slug})
        }).catch(err=>{
            //alert(err.response.data.error);
            Swal.fire(
                'Error!',
                err.response.data.error,
                'error'
              )
        })

      


    }
    //let history = useHistory();
    //!getEmail() && history.push('/login')
    return (
        <div className="container p-5">
            <NavbarComponent/>
            <h1>แก้ไขบทความ</h1> 
            {showUpdateFrom()}

          
        </div>
      );
}

export default EditComponent;