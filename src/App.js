import { BrowserRouter as Router,
        Switch,
        Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const App = () => {
    return(
    <Router>
        <Switch>
            <Route exact path = "/" content = {SignIn} />
            <Route exact path="/sign-up" component={SignUp} />
        </Switch>
    </Router>
    )
}

export default App