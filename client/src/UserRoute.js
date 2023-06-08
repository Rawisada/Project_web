import { Component, } from "react";
import { getEmail, getRole } from "./services/authorize";
import { Route, Redirect } from "react-router-dom";



const UserRoute=({component:Component,...rest}, props)=>(

    <Route 
        {...rest} 
        render={props=>
            getEmail() && getRole() !=="admin"?  
            (<Component {...props}/>) :
            (<Redirect to={{pathname:"/login",state:{from:props.location}}} target="_parent"/>)

        }
    />
 
)
export default UserRoute;