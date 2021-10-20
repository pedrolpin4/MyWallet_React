import { useState } from "react";
import { Link } from "react-router-dom";
import UserRegistration from "../sharedStyles/UserRegistration"

const SignIn = () => {
    const {
        RegistrationContainer,
        Logo,
        RegistrationForm,
        PageTransitionMessage
    } = UserRegistration;

    const {email, setEmail} = useState("");
    const {password, setPassword} = useState("");

    const signInFunction = () => {

    }
    
    return(
        <RegistrationContainer>
            <Logo>MyWallet</Logo>
            <RegistrationForm onSubmit = {() => signInFunction()}>
                <input placeholder = "Email"  value = {email} 
                    onChange = {e => setEmail(e.target.value)}/>
                <input placeholder = "Password" value = {password} 
                    onChange = {e => setPassword(e.target.value)}/>
                <button>Enter</button>
            </RegistrationForm>
            <Link to = {"/sign-in"}> 
                <PageTransitionMessage>
                    Already have an account? Enter now!
                </PageTransitionMessage>
            </Link>
        </RegistrationContainer>
    )
}

export default SignIn
