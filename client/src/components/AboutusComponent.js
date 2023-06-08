import NavbarOfUserComponent from "./NaberOfUserComponent";
import "../FileCSS/HomeComponent.css";
import { getEmail } from "../services/authorize";
import cactus from "../FileCSS/R.png"
import About from "../FileCSS/About.jpg"
import FooterComponent from "./FooterComponent";
const AboutusComponent=(prop)=>{
    return(
        <div>
        <div className="container p-3 " id="backgroudHome">
            <header>
                <nav>
                <NavbarOfUserComponent/>
                </nav>
            </header>

            <div class="content about">
                <hr></hr>
                <br></br>
                <div className="text-about">
                    <img className="logoAbout" src={cactus} alt="cactus"/>
                    <br></br>
              
                    <p>Cactus Land is a website for everyone who loves cactus. You can show off your own cactus. and like a lot of cactus of friends We can also collect cactus in our own gallery. We invite you to be a part of us Cactus Land to exchange good feelings with each other.</p>
                </div>
               
              
                <hr></hr>
            </div>
                
           
            
        </div>
        
        <FooterComponent/>
            
            <div >
                <a href="javascript:window.history.back()" id="back"><b>&larr;</b></a>
            </div>
        </div>
    )

}

export default AboutusComponent;