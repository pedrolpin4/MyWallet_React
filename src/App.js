import { BrowserRouter as Router,
        Switch,
        Route,
    } from "react-router-dom";
import { useEffect, useState } from "react";
import UserContext from "./context/UserContext";
import GlobalStyles from "./styles/GlobalStyles";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import CashFlow from "./components/CashFlow";
import Theme from "./styles/Theme";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    const [userData, setUserData] = useState({});
    const [themeType, setThemeType] = useState('dark');
    
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
                            <CashFlow setThemeType = {setThemeType} themeType = {themeType}/>
                        </Route>
                        <Route exact path = "/register" component = {Register} />
                        <Route exact path = "/home">
                            <Dashboard setThemeType = {setThemeType} themeType = {themeType}/>
                        </Route>
                    </Switch>
                </Router>
                <ToastContainer 
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Theme>
        </UserContext.Provider>  
    )
}

export default App