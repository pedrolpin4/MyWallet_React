/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from 'react';
import CurrencyInput from 'react-currency-input';
import { toast } from 'react-toastify';
import UserContext from '../context/UserContext';
import categoriesServices from '../service/categories';
import financialRecords from '../service/financialRecords';
import IncomesExpenses from '../styles/IncomesExpenses';
import {
    Modal,
    ModalBackground,
    TopSection,
} from '../styles/ModalStyle';
import validations from '../validation/JoiValidations';
import Options from './Options';

const EditModal = ({ setShowModal, modalRef, closeModal, edited, setReload }) => { 
    const {
        LaunchingForm,
        SeeMore,
    } = IncomesExpenses;
    
    const { userData } = useContext(UserContext)
    const [value, setValue] = useState("");
    const [ isVisible, setIsVisible ] = useState(false);
    const [type, setType] = useState(edited.value > 0 ? 'income' : 'expense');
    const [ categories, setCategories ] = useState([]);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState("");
    const [disabled, setDisabled] = useState(false);

    const updateRegister = async (e) => {
        e.preventDefault()

        const forms = {
            value: Number(value) ? value : Number(value.replace("$", "").replace(",", "")),
            description,
            type,
            categoryId: category.id,
        };

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

        const result = await financialRecords.updateTransaction(forms, edited.id, userData.token, type);

        if(result.success) {
            toast.success(` Your record was successfully edited`);
            setReload(prev => prev + 1);
            setShowModal(false)
            return;
        }

        setDisabled(false);
        toast.error(result.message);
        return;
    };

    const deleteRegister = async (e) => {
        e.preventDefault()
        const result = await financialRecords.deleteTransaction(edited.id, userData.token);

        if(result.success) {
            toast.success(` Your record was successfully deleted`);
            setReload(prev => prev + 1);
            setShowModal(false)
            return;
        }

        toast.error(result.message);
        return;
    };

    const getCategories = async (type) => {
        const result = await categoriesServices.getCategoriesByType(type);
        if(result.success) {
            setCategories(result.data);
            return;
        }

        setCategories(result.message);
    }

    useEffect(() => {
        setValue(Math.abs(edited.value))
        setDescription(edited.description);
        setCategory({
            id: edited.category_id,
            name: edited.category
        })
    }, [])

    useEffect(() => {
        getCategories(type)
    }, [type])

    return (
        <>
            <ModalBackground ref={modalRef} onClick={(e) => closeModal(e)} />
            <Modal>
                <TopSection>
                    <h2>Edit Transaction</h2>
                    <button type="button" onClick={() => setShowModal(false)}>
                        <p>X</p>
                    </button>
                </TopSection>
                <LaunchingForm onSubmit = {updateRegister}>
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
                        {edited.value > 0 ? 
                            <input type="radio" class="radio-input" id="small" name="size" defaultChecked/> : 
                            <input type="radio" class="radio-input" id="small" name="size" />
                        }                            
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
                        {edited.value < 0 ? 
                            <input type="radio" class="radio-input" id="large" name="size" defaultChecked/> : 
                            <input type="radio" class="radio-input" id="large" name="size" />
                        }                            
                            
                            <label for="large" class="radio-label margin-bottom-small">
                                <span class="radio-button"></span>
                                Expense
                            </label>  
                        </div>
                    </div>
                    <div className='button-group'>
                        <SeeMore disabled = {disabled} className = "delete" type="button" onClick={deleteRegister}> Delete </SeeMore>
                        <SeeMore disabled = {disabled} className = "edit" type='submit'>Update</SeeMore>
                    </div>
                </LaunchingForm>
            </Modal>
        </>
    )
}

export default EditModal;
