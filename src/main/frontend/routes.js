import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./components/sites/Home";
import {axios} from "./components/utils/axiosConfig";

const Routes = () => {

    /**
     * As soon as the site loads we check if the user is still logged in (session)
     * This loads user Context inside the store whenever page loads
     * */
    const [user, setUser] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const req = await axios.get("/user");
                setUser(req.data.email);
                setIsLoggedIn(true);
            } catch (e) {
                setIsLoggedIn(false);
                // get Error Message
                const req = await axios.get("/error?message=true");
                if (req.data !== "") {
                    console.error("REASON:", req.data);
                }
            }
        })()
    }, []);

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={
                    (props) => <Home {...props} user={user} loggedIn={isLoggedIn}/>
                }/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
