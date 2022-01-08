import { IoArrowDown } from "react-icons/io5";
import { ExamSelect, SelectContainer, Option, OptionsContainer } from "../styles/OptionStyles";

const Options = ({categories, category, setCategory, isVisible, setIsVisible}) => (
        <SelectContainer onClick={() => setIsVisible(!isVisible)} isVisible = {isVisible}>
                <ExamSelect category = {category}>
                    <p> {category ? category.name : 'Category'}</p>
                    <IoArrowDown size={25} className={ isVisible ? "show-options" : "show-options active"} />
                </ExamSelect>
                {
                    <OptionsContainer isVisible = {isVisible}>
                        {
                            categories.map((cat) => (
                                <Option key = {cat.id} onClick = {() => {
                                        setCategory(cat)
                                        setIsVisible(false)
                                    }} isVisible = {isVisible}>
                                    {cat.name}
                                </Option>
                            ))
                        }
                    </OptionsContainer>
                }
        </SelectContainer>
);


export default Options