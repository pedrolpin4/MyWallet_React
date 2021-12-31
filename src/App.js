import { BrowserRouter as Router,
        Switch,
        Route,
        useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import UserContext from "./context/UserContext";
import GlobalStyles from "./styles/GlobalStyles";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import CashFlow from "./components/CashFlow";
import Theme from "./styles/Theme";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";

const App = () => {
    const [userData, setUserData] = useState({});
    const [themeType, setThemeType] = useState('dark');
    const history = useHistory();


    const logOut = () => {
        localStorage.removeItem("userLogin");
        setUserData({});
        history.push("/");
    }
    
    useEffect(() => {
        const userLogin = JSON.parse(localStorage.getItem("userLogin"));
        const theme = localStorage.getItem("myWalletTheme");
        if(theme){
            setThemeType(theme)
        }
        if(userLogin){
            setUserData(userLogin);
        }
    }, []);
    
    return(
        <UserContext.Provider value={{userData,setUserData}}>
            <Theme type = {themeType}>
                <Router>
                    <GlobalStyles />
                    <Switch>
                        <Route exact path = "/" component = {SignIn} />
                        <Route exact path="/sign-up" component={SignUp} />
                        <Route exact path = "/cash-flow">
                            <CashFlow setThemeType = {setThemeType} themeType = {themeType} logOut = {logOut}/>
                        </Route>
                        <Route exact path = "/register" component = {Register} />
                        <Route exact path = "/home">
                            <Dashboard setThemeType = {setThemeType} themeType = {themeType} logOut = {logOut}/>
                        </Route>
                    </Switch>
                </Router>
            </Theme>
        </UserContext.Provider>  
    )
}

export default App