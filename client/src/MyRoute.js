import {BrowserRouter, Switch, Route} from "react-router-dom";
import App from "./App";
import FormComponent from "./components/FormComponent";
import SingleComponent from "./components/SingleComponent";
import EditComponent from "./components/EditComponent";
import LoginComponent from "./components/LoginComponent";
import HomeAdminComponent from "./components/HomeAdminComponent";
import SignupComponent from "./components/SignupComponent";
import FromTypeComponent from "./components/FromTypeComponent"
import FromItemComponent from "./components/FromItemComponent";
import HomeOfUserComponent from "./components/HomeOfUserComponent";
import FromCactusComponent from "./components/FromCactusComponent";
import ListAllCactusComponent from "./components/ListAllCactusComponent";
import ListAllUserComponent from "./components/ListAllUserComponent";
import ListAllCactusForAdminComponent from "./components/ListAllCactusForAdminComponent";
import BanListUserComponent from "./components/BanListUserComponent";
import EditUserComponent from "./components/EditUserComponent";
import EditCactusComponent from "./components/EditCactusComponent";
import ListAllTypeComponent from "./components/ListAllTpyesComponent";
import HistoryRequestComponent from "./components/HistoryRequestComponent";
import SingleCactusComponent from "./components/SingleCactusComponent";
import ListAllcactusComponentByLikeMore from "./components/ListAllcactusComponentByLikeMore";
import ListAllCactusComponentByLikeLess from "./components/ListAllCactusComponentByLikeLess";
import ListAllCactusComponentByLatest from "./components/ListAllCactusComponentByLatest";
import FromChatComponent from "./components/FromChatComponent";
import HistoryChatsComponent from "./components/HistoryChatsComponent";
import ListChatsComponent from "./components/ListChatsComponent";
import AboutusComponent from "./components/AboutusComponent";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import SaveCactusbyUser from "./components/SaveCactusbyUser";
import FromCactusForAdminComponent from "./components/FromCactusForAdminComponent";
const MyRoute=()=>{
    return(
        <BrowserRouter>
            <Switch>

                <Route path="/login" exact component={LoginComponent}/>
                <Route path="/register" exact component={SignupComponent}/>
                <AdminRoute path="/" exact component={App} />
                <AdminRoute path="/homeAdmin" exact component={HomeAdminComponent}/>
                <AdminRoute path="/create" exact component={FormComponent}/>
                <AdminRoute path="/createCactus" exact component={FromCactusComponent}/>
                <AdminRoute path="/createCactusForAdmin" exact component={FromCactusForAdminComponent}/>
                <AdminRoute path="/createType" exact component={FromTypeComponent} />
                <AdminRoute path="/listType" exact component={ListAllTypeComponent} />
                <AdminRoute path="/blog/:slug" exact component={SingleComponent}/>
                <AdminRoute path="/blog/edit/:slug" exact component={EditComponent}/>
                <AdminRoute path="/listAllUser" exact component={ListAllUserComponent}/>
                <AdminRoute path="/banlistAllUser" exact component={BanListUserComponent}/>
                <AdminRoute path="/listChat" exact component={ListChatsComponent}/>
                <Route path="/user/:email" exact component={EditUserComponent}/>
                <AdminRoute path="/cactus/:slug" exact component={EditCactusComponent}/>
                <AdminRoute path="/listAllCactus" exact component={ListAllCactusForAdminComponent}/>
                <UserRoute path="/createItems" exact component={FromItemComponent}/>
                <UserRoute path="/cactusHome" exact component={HomeOfUserComponent}/>
                <UserRoute path="/cactusAll/:word/:type" exact component={ListAllCactusComponent}/>
                <UserRoute path="/cactusAllByLikeMore/:word/:type" exact component={ListAllcactusComponentByLikeMore}/>
                <UserRoute path="/cactusAllByLikeLess/:word/:type" exact component={ListAllCactusComponentByLikeLess}/>
                <UserRoute path="/cactusAllByLatest/:word/:type" exact component={ListAllCactusComponentByLatest}/>
                <UserRoute path="/cactusItems/:id" exact component={SingleCactusComponent}/>
                <UserRoute path="/history/request" exact component={HistoryRequestComponent}/>
                <UserRoute path="/mycollection" exact component={SaveCactusbyUser}/>
                <UserRoute path="/contactAdmin" exact component={FromChatComponent}/>
                <UserRoute path="/historyChats" exact component={HistoryChatsComponent}/>
                <UserRoute path="/AboutUs" exact component={AboutusComponent}/>
                
            </Switch>
        </BrowserRouter>
    );
}

export default MyRoute;