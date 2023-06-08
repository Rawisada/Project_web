import { useState,useEffect } from "react";
import NavbarOfUserComponent from "./NaberOfUserComponent";
import axios from "axios";
import "../FileCSS/cactusComponent.css"
import heart from "../FileCSS/heart.png"
import heart_full from "../FileCSS/heart-full.png"
import save from "../FileCSS/save.png"
import save_full from "../FileCSS/save-full.png"
import {getEmail } from "../services/authorize";
import {Link, useHistory} from "react-router-dom";
import NavbarCactusComponent from "./NaberCactusComponent";
import FooterComponent from "./FooterComponent";
const ListAllCactusComponent=(props)=>{
    const[cactuss, setCactus] = useState([])
    const[user, setUser] = useState([])
    const[words, setWord] = useState('')
    const[typesAll,setTypesAll] = useState([])
    const[type, setType] = useState('')


    console.log(props.match.params.type)
    console.log(props.match.params.word)


    const fetchData=()=>{
        axios.get(`${process.env.REACT_APP_API}/cactusByword/${props.match.params.word}/${props.match.params.type}`)
        .then(response=>{
            setCactus(response.data)
            if (props.match.params.word != "-" ){
                setWord(props.match.params.word)
                
            }
            setType(props.match.params.type)
        
            }).catch(err=>alert(err));
        axios.get(`${process.env.REACT_APP_API}/getCactusOfUser/${getEmail()}`)
        .then(response=>{
            setUser(response.data)
                //console.log(response.data)
        }).catch(err=>alert(err));
        axios.get(`${process.env.REACT_APP_API}/types`)
        .then(response=>{
            setTypesAll(response.data)
        })
        .catch(err=>alert(err));
    }
    useEffect(()=>{
        fetchData()
    },[props])
        // fetchData()
    const itemscactus  = document.querySelectorAll(".row")
    const listCactus = [...itemscactus]
    
   
    let listSave = []
    for (let key in user){
        const i = user[key]
        console.log(i.item)
        listSave.push(i.item)
    }

    for(let i=0 ; i < listCactus.length;i++){
        if(itemscactus[i].childNodes[2] == null){

            const like_img = document.createElement("img");
            const save_img = document.createElement("img");
            let buffer = []
                    console.log(cactuss[i].user)
            let listUser = cactuss[i].user
            for (let key in listUser){
                const j = listUser[key]
                console.log(j.user)
                buffer.push(j.user)
            }
           
            if(listSave.includes(cactuss[i]._id) == true && buffer.includes(getEmail()) == true){
                console.log("1")
                like_img.src = heart_full;
                save_img.src = save_full;
                    
                    
            }else if(listSave.includes(cactuss[i]._id) == true && buffer.includes(getEmail()) == false){                                                                                                                                        
                console.log("2")
                like_img.src = heart;
                save_img.src = save_full;
            }else if(listSave.includes(cactuss[i]._id) == false && buffer.includes(getEmail()) == true){
                console.log("3")
                like_img.src = heart_full;
                save_img.src = save;
            }else{
                console.log("4")
                like_img.src = heart;
                save_img.src = save;
                
            } 
            
            like_img.style.width = '22%'
            like_img.style.height = '11%'
            save_img.style.margin = '0px 0px 0px 55%'
            save_img.style.width = '22%'
            save_img.style.height = '10%'
        
            like_img.className = "likeImg"
            save_img.className = "saveImg"
            
            listCactus[i].appendChild(like_img)
            listCactus[i].appendChild(save_img)
                
                
            }
        }

    const likeClass = document.querySelectorAll(".likeImg")
    for(let i=0; i < listCactus.length;i++){
        likeClass[i].onclick = function(){
            if(this.src === heart){
                console.log("L")
                this.src = heart_full;
                console.log(cactuss[i].like)
                const user = getEmail()
                let like = cactuss[i].like + 1
                axios.put(`${process.env.REACT_APP_API}/cactus/${cactuss[i].slug}`, {user})
                .then(response=>{
                    console.log(cactuss[i].user)
                    console.log(like)
                    axios.put(`${process.env.REACT_APP_API}/updateLike/${cactuss[i].slug}`, {like})
                    .then(response=>{
                        console.log(cactuss[i].like)
                    }).catch(err=>alert(err));
                    window.location.reload()
                }).catch(err=>alert(err));
            
            }else{
                console.log("LF")
                this.src = heart;
                const user = getEmail()
                const like = cactuss[i].like - 1
                axios.put(`${process.env.REACT_APP_API}/pullcactus/${cactuss[i].slug}`, {user})
                .then(response=>{
                    console.log(cactuss[i].user)
                    axios.put(`${process.env.REACT_APP_API}/updateLike/${cactuss[i].slug}`, {like})
                    .then(response=>{
                        console.log(cactuss[i].like)
                    }).catch(err=>alert(err));
                        window.location.reload()
                }).catch(err=>alert(err));

                
            
            }
        };
    
    }
    
    const saveClass  = document.querySelectorAll(".saveImg")
    console.log(saveClass.length)
    for(let i=0;i < listCactus.length;i++){
        saveClass[i].onclick = function(){
            if(this.src === save){
                console.log("S")
                this.src = save_full;
                const item = cactuss[i]._id
                console.log(item)
                console.log(getEmail())
                axios.put(`${process.env.REACT_APP_API}/collection/${getEmail()}`,{item})
                .then(response=>{
                //setCactus(response.data)
                    console.log("add item succeed")
                }).catch(err=>alert(err));
            }else{
                console.log("SF")
                this.src = save;
                const item = cactuss[i]._id
                console.log(item)
                console.log(getEmail())
                axios.put(`${process.env.REACT_APP_API}/pullCollection/${getEmail()}`,{item})
                .then(response=>{
                    //setCactus(response.data)
                    console.log("pull item succeed")
                }).catch(err=>alert(err));
            }
        };
    
    }
    
    function myShowFilter(element){


        let x = document.getElementById("filter");
        if (window.getComputedStyle(x).display === "none") {
          x.style.display = "block";

        } else {
          x.style.display = "none";
         
        }
    }
    let history = useHistory()
    function myFuntionSearch(element,words){
        
        if(words == "" && type == "" ){
            history.push('/cactusAll/-/-')
            window.location.reload()
        }else if(words == "" && type == "-"){
            history.push('/cactusAll/-/-')
            window.location.reload()
        }else if(words == ""){
            history.push(`/cactusAll/-/${type}`)
            window.location.reload()
        }else if(type == "" ||type == "-"){
            history.push(`/cactusAll/${words}/-`)
            window.location.reload()
        }else{
            history.push(`/cactusAll/${words}/${type}`)
            window.location.reload()
        }
                                                               
    }

    
    const submitWord=(even)=>{
        setWord(even.target.value)

    }

    const submitTypes=(even)=>{
        let e = document.getElementById("selectTypes")
        console.log(e.value)
        if (e.value == "-"){
            setType("-")
        }else{
            axios.get(`${process.env.REACT_APP_API}/typesID/${e.value}`)
            .then(response=>{
                console.log(response.data)
                setType(response.data)
            })
        } 

    }
    function findNameType(element){
        if(type != "-"){
            axios.get(`${process.env.REACT_APP_API}/types/${type}`)
            .then(response=>{
                document.getElementById("thtype").innerHTML = `${response.data}`;
            }).catch(err=>alert(err))
        }else{
            document.getElementById("thtype").innerHTML = `All`;
        }
    }

    function myfunction(){
        document.getElementById("thtype").style.display = "none"
    }
   
    findNameType()


    
    console.log(type)
    return(
        <div>
        <div className="container p-3">
            <NavbarOfUserComponent/>   
            <div className="form-group">
                <input type="text" className="form-search" value={words} onChange={submitWord} placeholder="Search" required/>
                &nbsp;
                <label>Type</label>
                &nbsp;
                <select id="selectTypes"  className="selectTypes-single" onChange={submitTypes} onClick={()=>myfunction()}>
                        {/* <option selected id="thtype" onChange={findNameType(this,type)}></option> */}
                        <option selected id="thtype" ></option>
                        <option  value={"-"}>All</option>
                        {typesAll.map(type => (
                            <option  value={type.id}>
                                {type.type}
                            </option>
                        ))}
                </select>
                &nbsp;
                &nbsp;
                <button className="functionSearch" onClick={()=>myFuntionSearch(this,words)} >Submit</button>
                &nbsp;
                &nbsp;
                <button className="functionFilter" onClick={()=>myShowFilter(this)} >☰</button>
            
            </div>
            <div class="d-flex align-content-stretch flex-wrap" >
                {cactuss.map((cactus,index)=>(
                    <div className="row" >
                        <a href={`/cactusItems/${cactus._id}`} className="imgCactus">
                        <img className="imgCactus" src={`http://localhost:5500/${cactus.image}`} />
                        <p className="tagName">{cactus.namepicture} |<a className="tagLike"> Like : {cactus.like}</a></p>
                        
                        </a>
                    </div>

                ))}
        
            </div>



                <div id="filter">
                    <NavbarCactusComponent/>
                </div>
            
            </div>

            <FooterComponent/>                                                                                      

            
            <div >
                <a href="/createItems"id="add"><b>+</b></a>
            </div>
            
            
            <div >
                <a href="/cactusHome" id="back"><b>&larr;</b></a>
            </div>
        </div>

    )




    

}
export default ListAllCactusComponent;