import axios from "axios";
import { useState,useEffect } from "react";
import NavbarOfUserComponent from "./NaberOfUserComponent";
import renderHTML from "html-react-parser";
import {getEmail } from "../services/authorize";
import { useHistory } from "react-router-dom";
import "../FileCSS/cactusComponent.css"
import heart from "../FileCSS/heart.png"
import heart_full from "../FileCSS/heart-full.png"
import save from "../FileCSS/save.png"
import save_full from "../FileCSS/save-full.png"
import FooterComponent from "./FooterComponent";
const SingleCactusComponent=(props)=>{

    const[cactus, setCactus] = useState('')
    const[cactuss, setCactuss] = useState([])
    const[user, setUser] = useState([])
    const[type,setType] = useState('')
    
    const fetchData=()=>{
        axios.get(`${process.env.REACT_APP_API}/getCactusById/${props.match.params.id}`)
        .then(response=>{
            setCactus(response.data)
            axios.get(`${process.env.REACT_APP_API}/getCactusByType/${response.data.type}`)
            .then(response=>{
                setCactuss(response.data)
                //console.log(response.data)
            }).catch(err=>alert(err));
        
            axios.get(`${process.env.REACT_APP_API}/types/${response.data.type}`)
            .then(response=>{
                setType(response.data)
            }).catch(err=>alert(err))

            axios.get(`${process.env.REACT_APP_API}/getCactusOfUser/${getEmail()}`)
            .then(response=>{
                setUser(response.data)
                    //console.log(response.data)
            }).catch(err=>alert(err));
        }).catch(err=>alert(err))

    }   
    useEffect(()=>{
            fetchData()
    },[props])

    const itemscactus  = document.querySelectorAll(".row")
    const listCactus = [...itemscactus]
    
    const likeImgMain = document.getElementById("likeImgMain")
    const saveImgMain = document.getElementById("saveImgMain")

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
            //save and like
            if(listSave.includes(cactuss[i]._id) == true && buffer.includes(getEmail()) == true){
                console.log("1")
                like_img.src = heart_full;
                save_img.src = save_full;

                if(cactuss[i]._id == cactus._id){
                    likeImgMain.src = heart_full;
                    saveImgMain.src = save_full;
                    
                }
                    
                    
            }else if(listSave.includes(cactuss[i]._id) == true && buffer.includes(getEmail()) == false){                                                                                                                                        
                console.log("2")
                like_img.src = heart;
                save_img.src = save_full;

                
                if(cactuss[i]._id == cactus._id){
                    likeImgMain.src = heart;
                    saveImgMain.src = save_full;
                    
                }

            }else if(listSave.includes(cactuss[i]._id) == false && buffer.includes(getEmail()) == true){
                console.log("3")
                like_img.src = heart_full;
                save_img.src = save;
                
                if(cactuss[i]._id == cactus._id){
                    likeImgMain.src = heart_full;
                    saveImgMain.src = save;
                    
                }
            }else{
                console.log("4")
                like_img.src = heart;
                save_img.src = save;
                
                if(cactuss[i]._id == cactus._id){
                    likeImgMain.src = heart;
                    saveImgMain.src = save;
                    
                }
                
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

    // likeImgMain.onclick = function(){
    //     if(this.src === heart){
    //         console.log("L")
    //         this.src = heart_full;
    //         console.log(cactus.like)
    //         const user = getEmail()
    //         let like = cactus.like + 1
    //         axios.put(`${process.env.REACT_APP_API}/cactus/${cactus.slug}`, {user})
    //         .then(response=>{
    //             console.log(cactus.user)
    //             console.log(like)
    //             axios.put(`${process.env.REACT_APP_API}/updateLike/${cactus.slug}`, {like})
    //             .then(response=>{
    //                 console.log(cactus.like)
    //             }).catch(err=>alert(err));
    //             window.location.reload()
    //         }).catch(err=>alert(err));
        
    //     }else{
    //         console.log("LF")
    //         this.src = heart;
    //         const user = getEmail()
    //         const like = cactus.like - 1
    //         axios.put(`${process.env.REACT_APP_API}/pullcactus/${cactus.slug}`, {user})
    //         .then(response=>{
    //             console.log(cactus.user)
    //             axios.put(`${process.env.REACT_APP_API}/updateLike/${cactus.slug}`, {like})
    //             .then(response=>{
    //                 console.log(cactus.like)
    //             }).catch(err=>alert(err));
    //                 window.location.reload()
    //         }).catch(err=>alert(err));

            
        
    //     }
    // }

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
                }).catch(err=>alert(err))
            }
        };
    
    };


    function mylike(element){
        if(likeImgMain.src === heart){
            console.log("L")
            likeImgMain.src = heart_full;
            console.log(cactus.like)
            const user = getEmail()
            let like = cactus.like + 1
            axios.put(`${process.env.REACT_APP_API}/cactus/${cactus.slug}`, {user})
            .then(response=>{
                console.log(cactus.user)
                console.log(like)
                axios.put(`${process.env.REACT_APP_API}/updateLike/${cactus.slug}`, {like})
                .then(response=>{
                    console.log(cactus.like)
                }).catch(err=>alert(err));
                window.location.reload()
            }).catch(err=>alert(err));
                
        }else{
            console.log("LF")
            likeImgMain.src = heart;
            const user = getEmail()
            const like = cactus.like - 1
            axios.put(`${process.env.REACT_APP_API}/pullcactus/${cactus.slug}`, {user})
            .then(response=>{
                console.log(cactus.user)
                axios.put(`${process.env.REACT_APP_API}/updateLike/${cactus.slug}`, {like})
                .then(response=>{
                    console.log(cactus.like)
                }).catch(err=>alert(err));
                window.location.reload()
            }).catch(err=>alert(err));
        
        }
    }

    function mySave(element){
        if(saveImgMain.src === save){
            console.log("S")
            saveImgMain.src = save_full;
            const item = cactus._id
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
            saveImgMain.src = save;
            const item = cactus._id
            console.log(item)
            console.log(getEmail())
            axios.put(`${process.env.REACT_APP_API}/pullCollection/${getEmail()}`,{item})
            .then(response=>{
                //setCactus(response.data)
                console.log("pull item succeed")
                window.location.reload()
            }).catch(err=>alert(err))
        }
    }


    
    
    return ( 
        <div>
        <div className="container p-3">
            <NavbarOfUserComponent/>
            {cactus && <div id="showSingleCactus">
                <div class="content">
                    <img className="imageItem-single" src={`http://localhost:5500/${cactus.image}`}/>
                {/* <p id="thtype" onChange={findNameType(this,cactus.type)}></p> */}
                </div>
                <div class="content detail">
                    <h1 id="text-namepicture">{cactus.namepicture} </h1>
                    <hr></hr>
                    <p className="tagLike-single">Like by {cactus.like} people</p>
                    <p>Type : {type}</p>
                    <p id="text-cotent">{renderHTML(cactus.content)}</p>

                    <p>Reference : {cactus.reference}</p>
                    <p className="text-author">Authsor : {cactus.author}, Published time : {new Date(cactus.createdAt).toLocaleString()}</p>

                    <img id="likeImgMain"  src={heart} onClick={()=>mylike()}/>
                    <img id="saveImgMain"  src={save} onClick={()=>mySave()}/>
                </div>
            </div>}
            <br></br>
            <h1 className="h1-OtherCactus">Other Picture</h1>
        
            <hr></hr>
            <br></br>
            <div class="d-flex align-content-stretch flex-wrap" >
                {cactuss.map((cactuss,index)=>(
                <div className="row" >
                    <a href={`/cactusItems/${cactuss._id}`} className="imgCactus">
                    <img className="imgCactus" src={`http://localhost:5500/${cactuss.image}`} />
                    <p className="tagName">{cactuss.namepicture} |<a className="tagLike"> Like : {cactuss.like}</a></p>
                    
                    </a>
                </div>

                ))}
        
            </div>
            
        </div>
        
        <FooterComponent/>
            <div >
                <a href="/createItems"id="add"><b>+</b></a>
            </div>
            
            
            <div >
                <a href="javascript:window.history.back()" id="back"><b>&larr;</b></a>
            </div>
    </div>

    )
}

export default SingleCactusComponent;