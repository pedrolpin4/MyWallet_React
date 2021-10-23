import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import IncomesExpenses from "../sharedStyles/IncomesExpenses";
import validations from "../validation/JoiValidations";
import UserContext from "../context/UserContext";
import CurrencyInput from 'react-currency-input';
import service from "../service/serviceFunctions";

const Expenses = () => {
    const {
        LaunchingHeader,
        LaunchingContainer,
        LaunchingForm,
        CancelButton,
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

        const result = await service.postExpenses(forms, userData.token)

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
                New Expense
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
            <Link to = {"/cash-flow"}>
                <CancelButton>
                    Cancel Expense
                </CancelButton>
            </Link>
        </LaunchingContainer>
    )
}

export default Expenses