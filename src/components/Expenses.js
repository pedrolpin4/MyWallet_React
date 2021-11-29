import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import IncomesExpenses from "../styles/IncomesExpenses";
import validations from "../validation/JoiValidations";
import UserContext from "../context/UserContext";
import CurrencyInput from 'react-currency-input';
import financialRecords from "../service/financialRecords";
import {IoHomeSharp} from 'react-icons/io5'

const Expenses = () => {
    const {
        LaunchingHeader,
        LaunchingContainer,
        LaunchingForm,
        ErrorMessage
    } = IncomesExpenses;
    
    const history = useHistory();
    const { userData } = useContext(UserContext);
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    if(!localStorage.getItem("userLogin")){
        history.push("/")
    }

    const saveExpense = async e => {
        e.preventDefault();
        const forms = {
            value: Number(value.replace("$", "").replace(",", "")),
            description
        }
        setDisabled(true)

        const ExpenseValidator = validations.IncomesExpenses

        if(ExpenseValidator.validate(forms).error){
            setErrorMessage(ExpenseValidator.validate(forms).error.details[0].message);
            setDisabled(false);
            return;
        }

        const result = await financialRecords.postExpenses(forms, userData.token)

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
                <h1>New Expense</h1>
                <IoHomeSharp color = {"#fff"} size = {20} onClick = {() => history.push("/cash-flow")}/>
            </LaunchingHeader>
            <LaunchingForm onSubmit = {saveExpense}>
                <CurrencyInput value = {value}  prefix = "$" disabled = {disabled}
                    onChangeEvent = {e => setValue(e.target.value)}/>
                <input placeholder = "Description" value = {description} disabled = {disabled}
                    onChange = {e => setDescription(e.target.value)}/>
                <button disabled = {disabled}>Save Expense</button>
            </LaunchingForm>
            <ErrorMessage>
                {errorMessage}
            </ErrorMessage>
        </LaunchingContainer>
    )
}

export default Expenses