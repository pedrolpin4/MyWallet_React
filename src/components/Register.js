/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import {  useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import IncomesExpenses from "../styles/IncomesExpenses";
import validations from "../validation/JoiValidations";
import CurrencyInput from "react-currency-input"
import financialRecords from "../service/financialRecords";
import {IoHomeSharp} from 'react-icons/io5'
import Options from "./Options";
import categoriesServices from "../service/categories";
import { toast } from "react-toastify";

const Register = () => {
    const {
        LaunchingHeader,
        LaunchingContainer,
        LaunchingForm,
        SeeMore,
    } = IncomesExpenses;
    
    const history = useHistory();
    const { userData } = useContext(UserContext)
    const [value, setValue] = useState("");
    const [ isVisible, setIsVisible ] = useState(false);
    const [type, setType] = useState('income');
    const [ categories, setCategories ] = useState([]);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState("");
    const [disabled, setDisabled] = useState(false);

    if(!localStorage.getItem("userLogin")){
        history.push("/")
    }

    const saveRegister = async e => {
        e.preventDefault();
        const forms = {
            value: Number(value.replace("$", "").replace(",", "")),
            description,
            type,
            categoryId: category.id,
        }
        setDisabled(true);

        const RegisterValidator = validations.IncomesExpenses

        if(RegisterValidator.validate(forms).error){
            toast.error(RegisterValidator.validate(forms)
                .error.details[0].message
                .replace('"description"', 'Description')
                .replace('"value"', 'Value')
                .replace('"categoryId"', 'Category')
            );
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
            setCategory('');
            setDescription('');
            toast.success(` Your transaction was successfully registered`);
            return;
        }

        setDisabled(false);
        toast.error(result.message);
        return;
    }

    const getCategories = async () => {
        const result = await categoriesServices.getCategoriesByType(type);
        if(result.success) {
            setCategories(result.data);
            return;
        }

        setCategories(result.message);
    }

    useEffect(() => getCategories(), [type])

    return(
        <LaunchingContainer>
            <LaunchingHeader>
                <h1>New Record</h1>
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
                        <input type="radio" class="radio-input" id="small" name="size" defaultChecked/>
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
                <SeeMore disabled = {disabled} className = "save">Save Record</SeeMore>
            </LaunchingForm>
        </LaunchingContainer>
    )
}

export default Register