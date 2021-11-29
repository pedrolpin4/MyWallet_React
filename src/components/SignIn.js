import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import auth from "../service/auth";
import UserRegistration from "../styles/UserRegistration";
import validations from "../validation/JoiValidations";
import Loading from "../assets/Loading";

const SignIn = () => {
    const {
        RegistrationContainer,
        Logo,
        RegistrationForm,
        PageTransitionMessage,
        ErrorMessage
    } = UserRegistration

    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [disabled, setDisabled] = useState(false);
    const {userData, setUserData} = useContext(UserContext);

    useEffect(() => {
        if(userData.token) {
          history.push("/cash-flow")
        }
    }, [userData, history]);
    

    const signInFunction = async (e) => {
        e.preventDefault();
        setDisabled(true);

        const signInValidator = validations.signIn

        const forms = {
            email,
            password
        };
    
        if(signInValidator.validate(forms).error){
            setErrorMessage(signInValidator.validate(forms).error.details[0].message);
            setDisabled(false);
            return;
        }

        const result = await auth.postSignIn(forms)
        setDisabled(false);

        if(result.success){
            setUserData({...result.data});
            localStorage.setItem("userLogin", JSON.stringify({...result.data}));
            history.push("/cash-flow");      
            return;
        }

        setErrorMessage(result.message)
    }
    
    return(
        <RegistrationContainer>
            <Logo>MyWallet</Logo>
            <RegistrationForm onSubmit = {signInFunction}>
                <input placeholder = "Email"  value = {email} disabled = {disabled}
                    onChange = {e => setEmail(e.target.value)}/>
                <input placeholder = "Password" value = {password} disabled = {disabled}
                   type = "password" onChange = {e => setPassword(e.target.value)}/>
                <button className = "login" disabled = {disabled}>{disabled ?<Loading spinnerSize = {25} color = {"#fff"}/> : "Enter"}</button>
            </RegistrationForm>
            <ErrorMessage>
                {errorMessage}
            </ErrorMessage>
            <Link to = {"/sign-up"}> 
                <PageTransitionMessage className = "toggler">
                    First time on MyWallet? Sign-up now!
                </PageTransitionMessage>
            </Link>
        </RegistrationContainer>
    )
}

export default SignIn
