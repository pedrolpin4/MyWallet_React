import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserRegistration from "../styles/UserRegistration";
import auth from "../service/auth";
import validations from "../validation/JoiValidations";
import Loading from "../assets/Loading";

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
    const [disabled, setDisabled] = useState("");
    
    const signUpValidator = validations.signUp;

    const forms = {
        name,
        email,
        password,
        repeatPassword
    };

    const signUpFunction = async e => {
        e.preventDefault();
        setDisabled(true);

        if(signUpValidator.validate(forms).error){
            setErrorMessage(signUpValidator.validate(forms).error.details[0].message);
            setDisabled(false);
            return;
        }

        if(repeatPassword !== password){
            setErrorMessage("Your password and its confirmation are not the same");
            setDisabled(false);
            return;
        }

        const result = await auth.postSignUp(forms);
        setDisabled(false);
        
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
                <input placeholder = "Name" value = {name} disabled = {disabled}
                    onChange = {e => setName(e.target.value)}/>
                <input placeholder = "Email"  value = {email} disabled = {disabled}
                    onChange = {e => setEmail(e.target.value)}/>
                <input placeholder = "Password" value = {password} disabled = {disabled}
                    type = "password" onChange = {e => setPassword(e.target.value)}/>
                <input placeholder = "Confirm your password" value = {repeatPassword} 
                    type = "password" onChange = {e => setrepeatPassword(e.target.value)} disabled = {disabled}/>
                <button className = "register" disabled = {disabled}>{disabled ?<Loading spinnerSize = {25} color = {"#fff"}/> : "Register"}</button>
            </RegistrationForm>
            <ErrorMessage>
                {errorMessage}
            </ErrorMessage>
            <Link to = {"/"}> 
                <PageTransitionMessage className = "toggler">
                    Already have an account? Enter now!                   
                </PageTransitionMessage>
            </Link>
        </RegistrationContainer>
    )
}

export default SignUp