import NavbarComponent from "./NaberComponent";
import "../FileCSS/HomeComponent.css";
import { getEmail } from "../services/authorize";
import FooterComponent from "./FooterComponent";
const HomeAdminComponent=(prop)=>{
    return(
        <div>
            <div className="container p-3" >
                <header>
                    <nav>
                        <NavbarComponent/>
                    </nav>
                </header>

                <section class="content about">
                    
                    <header>
                        {/* <h2 id="wel">Welcome Admin {getEmail()}</h2> */}
                       
                    </header>
                </section>
 
            </div>
        
            <FooterComponent/>
        
        </div>
    )

}

export default HomeAdminComponent;