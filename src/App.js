import { BrowserRouter as Router,
        Switch,
        Route } from "react-router-dom";
import { useEffect, useState } from "react";
import UserContext from "./context/UserContext";
import GlobalStyles from "./sharedStyles/GlobalStyles";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import CashFlow from "./components/CashFlow";

const App = () => {
    const [userData, setUserData] = useState({});
    
    useEffect(() => {
        const userLogin = JSON.parse(localStorage.getItem("userLogin"));
        if(userLogin){
            setUserData(userLogin);
        } 
    }, []);
    
    return(
    <UserContext.Provider
        value={{userData,setUserData}}
    >
        <Router>
            <GlobalStyles />
            <Switch>
                <Route exact path = "/" component = {SignIn} />
                <Route exact path="/sign-up" component={SignUp} />
                <Route exact path = "/cash-flow" component = {CashFlow} />
            </Switch>
        </Router>
    </UserContext.Provider>  
    )
}

export default App