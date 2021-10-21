import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserRegistration from "../sharedStyles/UserRegistration";
import service from "../service/serviceFunctions";
import validations from "../validation/JoiValidations";

const SignUp = () => {
    const history = useHistory();

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
    const [errorMessage, setErrorMessage] = useState("");
    const [enabled, setEnabled] = useState("");
    
    const signUpValidator = validations.signUp;

    const forms = {
        name,
        email,
        password,
        repeatPassword
    };

    const signUpFunction = async e => {
        e.preventDefault();

        if(signUpValidator.validate(forms).error){
            setErrorMessage(signUpValidator.validate(forms).error.details[0].message);
            return;
        }

        if(repeatPassword !== password){
            setErrorMessage("Your password and its confirmation are not the same");
            return;
        }

        const result = await service.postSignUp(forms);
        
        if(result.success){
            history.push("/")
            return;
        }

        setErrorMessage(result.message)
    }
    
    return(
        <RegistrationContainer>
            <Logo>MyWallet</Logo>
            <RegistrationForm onSubmit = {signUpFunction}>
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
                {errorMessage}
            </ErrorMessage>
            <Link to = {"/"}> 
                <PageTransitionMessage>
                    Already have an account? Enter now!                   
                </PageTransitionMessage>
            </Link>
        </RegistrationContainer>
    )
}

export default SignUp
