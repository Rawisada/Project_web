import "../FileCSS/HomeComponent.css";
import { getEmail } from "../services/authorize";
import logo_facebook from "../FileCSS/logo_facebook.png"
import ig_logo from "../FileCSS/Ig_logo.png"
const FooterComponent=(prop)=>{
    return(
        <div id="myfoorter">
            <p id="text-nameweb">CACTUS LAND</p>
            {/* <p id="text-follow">FOLLOW ME</p> */}
            {/* <a href="#"><img id="logo_1" src={logo_facebook}/></a>
            <a href="#"><img id="ig" src={ig_logo}/></a> */}
            <p id="text-contact">CONTACT US</p>
            <p id="contact-detail">PHONE : 000-0000000 <br></br> EMAIL : cactus@gmail.com</p>
            <div id="Line_2"></div>
        </div>
    )

}

export default FooterComponent;