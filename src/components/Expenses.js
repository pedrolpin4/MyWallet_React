import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import IncomesExpenses from "../sharedStyles/IncomesExpenses";
import UserContext from "../context/UserContext";

const Expenses = () => {
    const {
        LaunchingHeader,
        LaunchingContainer,
        LaunchingForm,
        CancelButton
    } = IncomesExpenses
    const history = useHistory();
    const {userData, setUserData} = useContext(UserContext);
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const [disabled, setDisabled] = useState(false);

    if(!userData.token){
        history.push("/")
    }

    const saveExpense = e => {
        e.preventDefault();
        return;
    }

    return(
        <LaunchingContainer>
            <LaunchingHeader>
                New Expense
            </LaunchingHeader>
            <LaunchingForm onSubmit = {saveExpense}>
                <input placeholder = "Value"  value = {value} disabled = {disabled}
                    onChange = {e => setValue(e.target.value)}/>
                <input placeholder = "Description" value = {description} disabled = {disabled}
                    onChange = {e => setDescription(e.target.value)}/>
                <button disabled = {disabled}>Save Expense</button>
            </LaunchingForm>
            <Link to = {"/cash-flow"}>
                <CancelButton>
                    Cancel Expense
                </CancelButton>
            </Link>
        </LaunchingContainer>
    )
}

export default Expenses