import { useState } from "react";
import { Link } from "react-router-dom";
import UserRegistration from "../sharedStyles/UserRegistration";
import Joi from "joi";

const SignIn = () => {
    const {
        RegistrationContainer,
        Logo,
        RegistrationForm,
        PageTransitionMessage,
        ErrorMessage
    } = UserRegistration;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const signInValidator = Joi.object({
        email: Joi.string().email({ tlds: {allow: false} }).required(),
        password: Joi.string().min(6).max(12).required(),
    })

    const forms = {
        email,
        password
    };


    const signInFunction = (e) => {
        e.preventDefault();

        if(signInValidator.validate(forms).error){
            setMessage(signInValidator.validate(forms).error.details[0].message);
            return;
        }
    
    }
    
    return(
        <RegistrationContainer>
            <Logo>MyWallet</Logo>
            <RegistrationForm onSubmit = {signInFunction}>
                <input placeholder = "Email"  value = {email} 
                    onChange = {e => setEmail(e.target.value)}/>
                <input placeholder = "Password" value = {password} 
                    onChange = {e => setPassword(e.target.value)}/>
                <button>Enter</button>
            </RegistrationForm>
            <ErrorMessage>
                {message}
            </ErrorMessage>
            <Link to = {"/sign-up"}> 
                <PageTransitionMessage>
                    First time on MyWallet? Sign-up now!
                </PageTransitionMessage>
            </Link>
        </RegistrationContainer>
    )
}

export default SignIn
