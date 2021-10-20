import { BrowserRouter as Router,
        Switch,
        Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import GlobalStyles from "./sharedStyles/GlobalStyles";

const App = () => {
    return(
    <Router>
        <GlobalStyles />
        <Switch>
            <Route exact path = "/" component = {SignIn} />
            <Route exact path="/sign-up" component={SignUp} />
        </Switch>
    </Router>
    )
}

export default App