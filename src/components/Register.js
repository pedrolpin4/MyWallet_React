import { useContext, useState } from "react";
import {  useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import IncomesExpenses from "../styles/IncomesExpenses";
import validations from "../validation/JoiValidations";
import CurrencyInput from "react-currency-input"
import financialRecords from "../service/financialRecords";
import {IoHomeSharp} from 'react-icons/io5'
import Options from "./Options";

const Register = () => {
    const {
        LaunchingHeader,
        LaunchingContainer,
        LaunchingForm,
        ErrorMessage,
        SeeMore,
    } = IncomesExpenses;
    
    const history = useHistory();
    const { userData } = useContext(UserContext)
    const [value, setValue] = useState("");
    const [ isVisible, setIsVisible ] = useState(false);
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const categories = [
        {
            id: 0, 
            name: 'Food'
        },{
            id: 1, 
            name: 'Rent'
        },{
            id: 2, 
            name: 'Health Care'
        },{
            id: 3, 
            name: 'Taxes'
        },{
            id: 4, 
            name: 'Fun'
        }
    ];

    if(!localStorage.getItem("userLogin")){
        history.push("/")
    }

    const saveRegister = async e => {
        e.preventDefault();
        const forms = {
            value: Number(value.replace("$", "").replace(",", "")),
            description,
            type,
            category: category.name,
        }
        setDisabled(true);

        const RegisterValidator = validations.IncomesExpenses

        if(RegisterValidator.validate(forms).error){
            setErrorMessage(RegisterValidator.validate(forms).error.details[0].message);
            setDisabled(false);
            return;
        }
        
        let result;
        
        if(type === 'income') {
            result = await financialRecords.postIncomes(forms, userData.token)
        }

        if(type === 'expense') {
            result = await financialRecords.postExpenses(forms, userData.token)
        }
        
        if(result.success){
            setDisabled(false);
            setValue('');
            setType('');
            setCategory('');
            setDescription('');
            setErrorMessage(`Your ${ Number(value.replace("$", "").replace(",", ""))} dolars transaction was successfully registered`)
            return;
        }

        setDisabled(false);
        setErrorMessage(result.message)
        return;
    }

    return(
        <LaunchingContainer>
            <LaunchingHeader>
                <h1>New Register</h1>
                <IoHomeSharp color = {"#fff"} size = {20} className = "home"
                    onClick = {() => history.push("/cash-flow")}/>
            </LaunchingHeader>
            <LaunchingForm onSubmit = {saveRegister}>
                <CurrencyInput value = {value}  prefix = "$" disabled = {disabled} className = "currency"
                    onChangeEvent = {e => setValue(e.target.value)}/>
                <input placeholder = "Description" value = {description} disabled = {disabled}
                    onChange = {e => setDescription(e.target.value)}/>
                <Options  categories = {categories} category = {category} setCategory = {setCategory}
                    isVisible={isVisible} setIsVisible = {setIsVisible}/>
                <div className="group">
                    <div class="radio-group" onClick={() => {
                        setType('income')
                        if(type !== 'income') {
                            setCategory('')
                        }
                    }}>
                        <input type="radio" class="radio-input" id="small" name="size" />
                        <label for="small" class="radio-label">
                            <span class="radio-button"></span>
                            Income
                        </label>
                    </div>
                    <div class="radio-group" onClick={() => {
                        setType('expense')
                        if(type !== 'expense') {
                            setCategory('')
                        }
                    }}>                             
                        <input type="radio" class="radio-input" id="large" name="size" />
                        <label for="large" class="radio-label margin-bottom-small">
                            <span class="radio-button"></span>
                            Expense
                        </label>  
                    </div>
                </div>
                <SeeMore disabled = {disabled} className = "save">Save Register</SeeMore>
            </LaunchingForm>
            <ErrorMessage valid = {errorMessage.includes('dolars')}>
                {errorMessage}
            </ErrorMessage>
        </LaunchingContainer>
    )
}

export default Register