import styled from "styled-components";

const SelectContainer = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    height: auto;
    overflow: hidden;

    .show-options{
        position: absolute;
        top: 15px;
        right: 15px;
        color: ${({ theme: { colors } } ) => colors.inputs};
        transition: all .4s;
        transform: ${props => props.isVisible ? 'rotateX(-180deg)' : 'none'};
    }
`

const ExamSelect = styled.div`
    cursor: pointer;
    padding: 15px;
    width: 100%;
    height: 58px;
    font-size: 20px;
    color: ${({ theme: { colors } } ) => colors.inputs};
    background: ${({ theme: { colors } } ) => colors.secondary};
    outline: none;
    border: none;
    border-radius: 5px;
    
    p{
        opacity: ${props => props.category ? '1' : '0.6'};
    }
`

const OptionsContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 200px;
    overflow-y: scroll;
    transition: all .4s;
    transform: ${props => props.isVisible ? 'scaleY(1)' : 'scaleY(0)'};
    transform-origin: top;
    height: auto;
    border-radius: 5px;
`

const Option = styled.div`
    cursor: pointer;
    flex-shrink: 0;
    opacity: ${props => props.isVisible ? '1' : '0'};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 15px;
    width: 100%;
    transition: all .4s;
    height: ${props => props.isVisible ? '50px' : '0px'};
    color: white;
    background: ${props => props.isVisible ? 'rgba(120, 120, 120, 0.5)' : ''};
    
    :hover{
        background: rgba(120, 120, 120, 0.5);
    }
`

export {
    Option,
    OptionsContainer,
    ExamSelect,
    SelectContainer,
}