import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import IncomesExpenses from "../sharedStyles/IncomesExpenses"

const Incomes = () => {
    const {
        LaunchingHeader,
        LaunchingContainer,
        LaunchingForm,
        CancelButton
    } = IncomesExpenses;
    const history = useHistory();
    const { userData, setUserData } = useContext(UserContext)
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");
    const [disabled, setDisabled] = useState(false);

    if(!userData.token){
        history.push("/")
    }

    const saveIncome = e => {
        e.preventDefault();
        return;
    }

    return(
        <LaunchingContainer>
            <LaunchingHeader>
                New Income
            </LaunchingHeader>
            <LaunchingForm onSubmit = {saveIncome}>
                <input placeholder = "Value"  value = {value} disabled = {disabled}
                    onChange = {e => setValue(e.target.value)}/>
                <input placeholder = "Description" value = {description} disabled = {disabled}
                    onChange = {e => setDescription(e.target.value)}/>
                <button disabled = {disabled}>Save Income</button>
            </LaunchingForm>
            <Link to = {"/cash-flow"}>
                <CancelButton>
                    Cancel Income
                </CancelButton>
            </Link>
        </LaunchingContainer>
    )
}

export default Incomes