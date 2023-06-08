import {useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {authenticate} from "./services/authorize";
import {useHistory } from "react-router-dom";
import cactus from "./FileCSS/R.png"
import { getEmail } from "./services/authorize";
import NavbarComponent from "./components/NaberComponent";

import FooterComponent from "../src/components/FooterComponent";

function App() {
  

  return (
    <div>
    <div className="container p-3">
           
            <header>
                <nav>
                <NavbarComponent/>
                </nav>
            </header>

           
                <br></br>
            <div class="content about ">
                    <hr></hr>
                    <br></br>
                  <div className="text-about">
                    <img className="logoAbout"src={cactus} alt="cactus"/>
                    <br></br>
              
                    <h4>Welcome Admin <br></br> "{getEmail()}"</h4>
                    <br></br>
     
                  </div>
                  <hr></hr>

                    
            </div>
               
        

        </div>
        <FooterComponent/>
        </div>
  );
}

export default App;
