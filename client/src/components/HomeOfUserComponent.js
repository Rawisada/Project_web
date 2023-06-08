import { getEmail } from "../services/authorize";
import { useState,useEffect } from "react";
import axios from "axios";
import "../FileCSS/cactusComponent.css"
import heart from "../FileCSS/heart.png"
import heart_full from "../FileCSS/heart-full.png"
import save from "../FileCSS/save.png"
import save_full from "../FileCSS/save-full.png"
import NavbarOfUserComponent from "./NaberOfUserComponent";
import FooterComponent from "./FooterComponent";
import "../FileCSS/HomeComponent.css";
import "../FileCSS/Login.css"
const HomeOfUserComponent=(prop)=>{
    const[cactuss, setCactus] = useState([])
    const[user, setUser] = useState([])



    const fetchData=(prop)=>{
        axios.get(`${process.env.REACT_APP_API}/cactusBylimit`)
        .then(response=>{
            setCactus(response.data)
            
            console.log()
            }).catch(err=>alert(err));
        axios.get(`${process.env.REACT_APP_API}/getCactusOfUser/${getEmail()}`)
        .then(response=>{
            setUser(response.data)
                //console.log(response.data)
        }).catch(err=>alert(err));

    }
    useEffect(()=>{
        fetchData()
    },[prop])
       
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
    
    return(
        <div>
        <div className="container p-3" id="backgroudHome">
            <header>
                <nav>
                <NavbarOfUserComponent/>
                </nav>
            </header>

            <main>
                <section id="bottom-collection">
                    
                    <header >
                        <h2 id="wel">We provide the best <br></br>"CACTUS" collection <br></br> for you</h2>
                    </header>
                </section>
                <p id="pop"> ------- Popular Cactus ------- </p>
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
           
            </main>


        </div>
            <footer>
                <FooterComponent/>
            </footer>
        </div>
    )

}

export default HomeOfUserComponent;