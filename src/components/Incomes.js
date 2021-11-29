import { useContext, useState } from "react";
import {  useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import IncomesExpenses from "../styles/IncomesExpenses";
import validations from "../validation/JoiValidations";
import CurrencyInput from "react-currency-input"
import financialRecords from "../service/financialRecords";
import {IoHomeSharp} from 'react-icons/io5'

const Incomes = () => {
    const {
        LaunchingHeader,
        LaunchingContainer,
        LaunchingForm,
        ErrorMessage
    } = IncomesExpenses;
    
    const history = useHistory();
    const { userData } = useContext(UserContext)
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    if(!localStorage.getItem("userLogin")){
        history.push("/")
    }

    const saveIncome = async e => {
        e.preventDefault();
        const forms = {
            value: Number(value.replace("$", "").replace(",", "")),
            description
        }
        setDisabled(true)

        const IncomeValidator = validations.IncomesExpenses

        if(IncomeValidator.validate(forms).error){
            setErrorMessage(IncomeValidator.validate(forms).error.details[0].message);
            setDisabled(false);
            return;
        }

        const result = await financialRecords.postIncomes(forms, userData.token)
        
        if(result.success){
            history.push("/cash-flow");
            return;
        }

        setDisabled(false)
        setErrorMessage(result.message)
        return;
    }

    return(
        <LaunchingContainer>
            <LaunchingHeader>
                <h1>New Income</h1>
                <IoHomeSharp color = {"#fff"} size = {20} className = "home"
                    onClick = {() => history.push("/cash-flow")}/>
            </LaunchingHeader>
            <LaunchingForm onSubmit = {saveIncome}>
                <CurrencyInput value = {value}  prefix = "$" disabled = {disabled} className = "currency"
                    onChangeEvent = {e => setValue(e.target.value)}/>
                <input placeholder = "Description" value = {description} disabled = {disabled}
                    onChange = {e => setDescription(e.target.value)}/>
                <button disabled = {disabled} className = "save">Save Income</button>
            </LaunchingForm>
            <ErrorMessage>
                {errorMessage}
            </ErrorMessage>
        </LaunchingContainer>
    )
}

export default Incomes