import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import service from "../service/serviceFunctions";
import UserRegistration from "../sharedStyles/UserRegistration";
import validations from "../validation/JoiValidations";

//turn on spinner
//disabled no input

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
    const [disabled, setDisabled] = useState("");
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
            return;
        }

        const result = await service.postSignIn(forms)
        setDisabled(false);

        if(result.success){
            history.push("/cash-flow");
            setUserData({...result.data});
            console.log({...result.data});
            localStorage.setItem("userLogin", JSON.stringify({...result.data}));      
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
                <button disabled = {disabled}>Enter</button>
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
