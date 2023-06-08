import {Link,  useHistory} from "react-router-dom";
import { getEmail, logout } from "../services/authorize";
import profile from "../FileCSS/profile.png"
import "../FileCSS/Naber.css"
import { useState, useEffect } from "react";
import axios from "axios";




const NavbarCactusComponent=(props)=>{
    return(
        
        <nav>
            <ul className="list-group list-group-flush">
                <li className="nav-item pr-2 pb-2"><Link to={'/cactusAllByLatest/-/-'} className="nav-link " target="_parent">Latest &rarr; Oldest</Link></li>
                <li className="nav-item pr-2 pb-2"><Link to={'/cactusAll/-/-'} className="nav-link " target="_parent">Oldest &rarr; Latest</Link></li>
                <li className="nav-item pr-2 pb-2"><Link to={'/cactusAllByLikeMore/-/-'} className="nav-link" target="_parent">Popular &rarr; Least View </Link></li>
                <li className="nav-item pr-2 pb-2"><Link to={'/cactusAllByLikeLess/-/-'} className="nav-link" target="_parent" >Least View &rarr; Popular</Link></li>


            </ul>
        </nav>
        
    )
}

export default NavbarCactusComponent;