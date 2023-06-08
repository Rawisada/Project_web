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
const SaveCactusbyUser=(props)=>{
    const[cactuss, setCactus] = useState([])
    const[user, setUser] = useState([])
    const[words, setWord] = useState('')
    const[typesAll,setTypesAll] = useState([])
    const[type, setType] = useState('')




    
    const fetchData=()=>{
        axios.get(`${process.env.REACT_APP_API}/getCactusOfUser/${getEmail()}`)
        .then(response=>{
            setUser(response.data)
        }).catch(err=>alert(err));
        axios.get(`${process.env.REACT_APP_API}/cactus`)
        .then(response=>{
            setCactus(response.data)
            }).catch(err=>alert(err));

    
    }
    useEffect(()=>{
        fetchData()
    },[props])
    console.log(cactuss)

    let listCactusUser = []

     
    //     // fetchData()
    const itemscactus  = document.querySelectorAll(".row")
    const listCactus = [...itemscactus]
    
   
    let listSave = []
    for (let key in user){
        const i = user[key]
        console.log(i.item)
        listSave.push(i.item)
    }
    console.log(listSave)

    for(let key in cactuss){
        if(listSave.includes(cactuss[key]._id)){
            listCactusUser.push(cactuss[key])
        }
    }
    console.log(listCactusUser)


    for(let i=0 ; i < listCactus.length;i++){
        if(itemscactus[i].childNodes[2] == null){

            const like_img = document.createElement("img");
            const save_img = document.createElement("img");
            let buffer = []
            console.log(listCactusUser[i].user)
            let listUser = listCactusUser[i].user
            for (let key in listUser){
                const j = listUser[key]
                console.log(j.user)
                buffer.push(j.user)
            }
            
            if(buffer.includes(getEmail()) == true){
                like_img.src = heart_full;
   
            }else{
                like_img.src = heart;
            } 
            save_img.src = save_full;
            
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
                console.log(listCactusUser[i].like)
                const user = getEmail()
                let like = listCactusUser[i].like + 1
                axios.put(`${process.env.REACT_APP_API}/cactus/${listCactusUser[i].slug}`, {user})
                .then(response=>{
                    console.log(cactuss[i].user)
                    console.log(like)
                    axios.put(`${process.env.REACT_APP_API}/updateLike/${listCactusUser[i].slug}`, {like})
                    .then(response=>{
                        console.log(cactuss[i].like)
                    }).catch(err=>alert(err));
                    window.location.reload()
                }).catch(err=>alert(err));
            
            }else{
                console.log("LF")
                this.src = heart;
                const user = getEmail()
                const like = listCactusUser[i].like - 1
                axios.put(`${process.env.REACT_APP_API}/pullcactus/${listCactusUser[i].slug}`, {user})
                .then(response=>{
                    console.log(listCactusUser[i].user)
                    axios.put(`${process.env.REACT_APP_API}/updateLike/${listCactusUser[i].slug}`, {like})
                    .then(response=>{
                        console.log(listCactusUser[i].like)
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
                const item = listCactusUser[i]._id
                console.log(item)
                console.log(getEmail())
                axios.put(`${process.env.REACT_APP_API}/collection/${getEmail()}`,{item})
                .then(response=>{
                //setCactus(response.data)
                    console.log("add item succeed")
                    window.location.reload()
                }).catch(err=>alert(err));
            }else{
                console.log("SF")
                this.src = save;
                const item = listCactusUser[i]._id
                console.log(item)
                console.log(getEmail())
                axios.put(`${process.env.REACT_APP_API}/pullCollection/${getEmail()}`,{item})
                .then(response=>{
                    //setCactus(response.data)
                    console.log("pull item succeed")
                    window.location.reload()
                }).catch(err=>alert(err));
            }
        };
    
    }
    

    return(

        <div>
        <div className="container p-3">
            <NavbarOfUserComponent/>
            <h1 className="h1-collection">My Collection</h1>
            <hr></hr>
            <div class="d-flex align-content-stretch flex-wrap" >
               
                {listCactusUser.map((cactus,index)=>(
                    <div className="row" >
                        <a href={`/cactusItems/${cactus._id}`} className="imgCactus">
                        <img className="imgCactus" src={`http://localhost:5500/${cactus.image}`} />
                        <p className="tagName">{cactus.namepicture} |<a className="tagLike"> Like : {cactus.like}</a></p>
                        
                        </a>
                    </div>

                ))}
        
            </div>

            </div>
            
            <FooterComponent/>
            <div >
                <a href="/cactusHome" id="back"><b>&larr;</b></a>
            </div>

            
        </div>

    )




    

}
export default SaveCactusbyUser;