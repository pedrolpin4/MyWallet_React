import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import service from "../service/serviceFunctions";
import UserRegistration from "../sharedStyles/UserRegistration";
import validations from "../validation/JoiValidations";

const SignIn = () => {
    const history = useHistory();
    const {
        RegistrationContainer,
        Logo,
        RegistrationForm,
        PageTransitionMessage,
        ErrorMessage
    } = UserRegistration;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const signInValidator = validations.signIn

    const forms = {
        email,
        password
    };

    const signInFunction = async (e) => {
        e.preventDefault();

        if(signInValidator.validate(forms).error){
            setErrorMessage(signInValidator.validate(forms).error.details[0].message);
            return;
        }

        const result = await service.postSignIn(forms)
    
        if(result.success){
            history.push("/cash-flow");
            //save user info
            return;
        }

        setErrorMessage(result.message)
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
                {errorMessage}
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
