import styled from "styled-components"

const LaunchingContainer = styled.div`
    font-family: Raleway;
    width: 100%;
    height: 100%;
    padding: 25px;
    display: flex;
    flex-direction: column;
    animation: moveInRight .5s ease-in-out;

    @keyframes moveInRight{
        0%{
            opacity: 0;
            transform: translateX(300px);
        }

        100%{
            opacity: 1;
            transform: translate(0);
        }
    }

    input{
        width: 100%;
        align-self: center;
        height: 58px;
        background: ${({ theme: { colors } } ) => colors.secondary};
        border-radius: 5px;
        margin-bottom: 13px;
        font-size: 20px;
        line-height: 23px;
        color: ${({ theme: { colors } } ) => colors.inputs};
        padding: 15px;

        ::placeholder{
            font-family: 'Raleway', sans-serif;
            font-size: 20px;
            line-height: 23px;
            opacity: 0.6;
            color: ${({ theme: { colors } } ) => colors.inputs};
        }
    }

    a{
        align-self: center;
    }
`

const LaunchingHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;

    h1 {
        font-weight: bold;
        margin-bottom: 40px;
        font-size: 26px;
        line-height: 31px;
        color: ${({ theme: { colors } } ) => colors.secondaryAdaptable};
    }

    svg {
        cursor: pointer;
        position: relative;
        margin-top: 5px;
    }
`

const LaunchingForm = styled.form`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    
    .group{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 80%;
        max-width: 400px;
        margin-top: 20px;
    }

    .radio-group{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .radio-label{
        font-size: 18px;
        color: ${({ theme: { colors } } ) => colors.secondaryAdaptable};
        cursor: pointer;
        position: relative;
        display: flex;
        width: 100%;
    }

    .radio-input{
        opacity: 0;
    }

    .radio-button{
        height: 25px;
        position: relative;
        width: 25px;
        border-radius: 50%;
        margin-right: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3.5px solid ${({ theme: { colors } } ) => colors.secondaryAdaptable};

        &::after{
            content: "";
            height: 13px;
            width: 13px;
            border-radius: 50%;
            background-color: ${({ theme: { colors } } ) => colors.secondaryAdaptable};
            opacity: 0;
        }
    }

    .radio-input:checked ~ .radio-label .radio-button::after{
        opacity: 1;
    }
`

const SeeMore = styled.button`
    font-family: Raleway;
    position: relative;
    font-size: 22px;
    margin: 25px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 50px;
    border-radius: 25px;
    background-color: #fff;
    color: #333;
    align-self: center;
    transition: all .4s;
    cursor: pointer; 

    &::after{
        content: "";
        background-color: #fff;
        z-index: -1;
        display: inline-block;
        height: 100%;
        width: 100%;
        border-radius: 25px;
        position: absolute;
        top: 0;
        left: 0;
        transition: all .4s;
    }

    &:hover{
        transform: translateY(-3px);
        &::after{
            transform: scaleX(1.4) scaleY(1.6);
            opacity: 0;
        }
    }
    
    &:active{
        transform: translateY(-0.1rem);
        box-shadow: 0 0.5rem 1rem rgba(0,0,0, .2);
    }
`

const IncomesExpenses = {
    LaunchingHeader,
    LaunchingContainer,
    LaunchingForm,
    SeeMore,
}

export default IncomesExpenses