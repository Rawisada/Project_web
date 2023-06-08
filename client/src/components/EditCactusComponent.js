import { useEffect, useState } from "react"
import axios from "axios"
import NavbarComponent from "./NaberComponent"
import Swal from "sweetalert2";
import ReactQuil from "react-quill";
import FooterComponent from "./FooterComponent";
const EditCactusComponent=(props)=>{
    // const [state,setState] = useState({
    //     namepicture:"",
    //     reference:""
    // })
    const[namepicture,setNamepicture] = useState('')
    const[reference,setReference] = useState('')
    const[content, setContent] = useState('')
    const[type, setType] = useState('')
    const[typesAll,setTypesAll] = useState([])
    const[image, setImage] = useState('')
    const[originImg, setOriginImg] = useState('')
    
    

    //ดึงข้อมูล
    useEffect(()=>{
        console.log(props.match.params.slug)
        axios.get(`${process.env.REACT_APP_API}/getCactus/${props.match.params.slug}`)
        .then(response=>{
            console.log(response.data)
            console.log(response.data.namepicture)
            const {namepicture,image,type,content,reference} = response.data
            setNamepicture(namepicture)
            setReference(reference)
            setContent(content)
            setType(type)
            setImage(image)
            setOriginImg(image)
            console.log(image)
           
            //console.log(namepicture)
        }).catch(err=>alert(err))
    },[])

    // const inputValue = name => event =>{
    //     setState({...state,[name]:event.target.value});
    // }

    const submitNamepicture=(even)=>{
        setNamepicture(even.target.value)
    }

    const submitReference=(even)=>{
        setReference(even.target.value)
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
        console.log(image)
        console.log(even.target.files[0])
        setImage(even.target.files[0])
        console.log(image)
        let myprofile = document.getElementById("ImgCactus")
        let reader = new FileReader();
        reader.readAsDataURL(even.target.files[0]);
        reader.onload =()=>{
            console.log(reader.result);
            myprofile.src = reader.result
        }

    }

    const fetchData=()=>{
        axios.get(`${process.env.REACT_APP_API}/types`)
        .then(response=>{
          setTypesAll(response.data)
        })
        .catch(err=>alert(err));
    }
    useEffect(()=>{
        fetchData()
    },[])


    const submitForm=(e)=>{
        e.preventDefault();
        console.log("API URL =", process.env.REACT_APP_API)
        
        console.log(image == originImg)
        if(image == originImg){
            console.log("dgsgshsf")
            const formdata = new FormData()
            formdata.append('namepicture',namepicture)
            formdata.append('type', type)
            formdata.append('content', content)
            formdata.append('reference',reference)
            console.log(props.match.params.slug)
            console.log(formdata)
            axios
            .put(`${process.env.REACT_APP_API}/update/cactusNoImg/${props.match.params.slug}`,{namepicture,type,content,reference})
            .then(response=>{
            //alert("บันทึกข้อมูลเรียบร้อย");
                Swal.fire(
                    'Succcess!',
                    'แกไขข้อมูลเรียบร้อย',
                    'success'
                    )
                const{namepicture,image,type,content,reference} = response.data
                //setState({...state,namepicture:namepicture, reference:reference})
                setNamepicture(namepicture)
                setReference(reference)
                setContent(content)
                setType(type)
                setImage(image)
                setOriginImg(image)
              
            }).catch(err=>{
            //alert(err.response.data.error);
                Swal.fire(
                    'Error!',
                    err.response.data.error,
                    'error'
                )
            })
        }else{
            const formdata = new FormData()
            formdata.append('namepicture',namepicture)
            formdata.append('image',image)
            formdata.append('type', type)
            formdata.append('content', content)
            formdata.append('reference',reference)
            console.table({namepicture,image,type,content,reference})
            console.log(props.match.params.slug)
            console.log(formdata)
            console.log(image)
            axios
            .put(`${process.env.REACT_APP_API}/update/cactus/${props.match.params.slug}`,formdata)
            .then(response=>{
                //alert("บันทึกข้อมูลเรียบร้อย");
                Swal.fire(
                    'Succcess!',
                    'แกไขข้อมูลเรียบร้อย',
                    'success'
                
                )
                const{namepicture,image,type,content,reference} = response.data
                //setState({...state,namepicture:namepicture, reference:reference})
                setNamepicture(namepicture)
                setReference(reference)
                setContent(content)
                setType(type)
                setImage(image)
                setOriginImg(image)
              
            }).catch(err=>{
            //alert(err.response.data.error);
                Swal.fire(
                    'Error!',
                    err.response.data.error,
                    'error'
                )
            })
        }
        
    

    }

  
    function findNameType(element, id){
        axios.get(`${process.env.REACT_APP_API}/types/${id}`)
        .then(response=>{
            //setNametype(response.data)
            //console.log(response.data)
            //document.getElementsByClassName("thtype").value = `${response.data}`

            document.getElementById("thtype").innerHTML = `${response.data}`;
        }).catch(err=>alert(err))
        
    }

  

    function myfunction(){
        document.getElementById("thtype").style.display = "none"
    }
   

    return (
        <div>
        <div className="container p-3 ">
            <NavbarComponent/>
            <div className="background">

            
            <h1>Edit User</h1> 
            <form onSubmit={submitForm} enctype="multipart/form-data" >

                
                <div className="form-group">
                    <img width={100} height={100} id="ImgCactus" className="showItem" src={`http://localhost:5500/${image}`}/>
                    <input type="file" className="form-control" name="image" accept="image/*"  onChange={submitImage} />
                </div>

                <div className="form-group">
                    <label>Name Picture</label>
                    <input type="text" className="form-control" value={namepicture} onChange={submitNamepicture}/>
                </div>
                
                <br></br>
                <div className="form-group">
                    <label>Type :</label>
                    &nbsp;
                    <select id="selectTypes"  onChange={submitTypes} onClick={()=>myfunction()}>
                        <option selected id="thtype" onChange={findNameType(this,type)}></option>
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
                        placeholder="เขียนรายละเอียดบทความของคุณ"
                        
                    />
                </div>

                <div className="form-group">
                    <label>Reference</label>
                    <input type="text" className="form-control" value={reference}  onChange={submitReference}/>
                </div>


            <br></br>
                <input type="submit" value="Update" className="btn btn-primary"/>

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

export default EditCactusComponent;