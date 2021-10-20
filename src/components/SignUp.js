import { useState } from "react";
import { Link } from "react-router-dom";
import Joi from "joi";
import UserRegistration from "../sharedStyles/UserRegistration"

const SignUp = () => {
    const {
        RegistrationContainer,
        Logo,
        RegistrationForm,
        PageTransitionMessage,
        ErrorMessage
    } = UserRegistration;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setrepeatPassword] = useState("");
    const [message, setMessage] = useState("")

    const signUpValidator = Joi.object({
        name: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(12).required(),
        repeatPassword: Joi.string().required()
    })

    const forms = {
        name,
        email,
        password,
        repeatPassword
    };

    const signUpFunction = () => {
        if(!signUpValidator.validate(forms).error && repeatPassword === password){
            console.log("sou bobão");
            return;
        }
        
        setMessage(signUpValidator.validate(forms).error.details[0].message)
        return;
    }
    
    return(
        <RegistrationContainer>
            <Logo>MyWallet</Logo>
            <RegistrationForm onSubmit = {() => signUpFunction()}>
                <input placeholder = "Name" value = {name} 
                    onChange = {e => setName(e.target.value)}/>
                <input placeholder = "Email"  value = {email} 
                    onChange = {e => setEmail(e.target.value)}/>
                <input placeholder = "Password" value = {password} 
                    onChange = {e => setPassword(e.target.value)}/>
                <input placeholder = "Confirm your password" value = {repeatPassword} 
                    onChange = {e => setrepeatPassword(e.target.value)} />
                <button>Enter</button>
            </RegistrationForm>
            <ErrorMessage>
                {message}
            </ErrorMessage>
            <Link to = {"/"}> 
                <PageTransitionMessage>
                    First time on MyWallet? Sign-in now!
                </PageTransitionMessage>
            </Link>
        </RegistrationContainer>
    )
}

export default SignUp
