import styled from "styled-components"

const LaunchingContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 25px;
    display: flex;
    flex-direction: column;
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
        background: #FFFFFF;
        border-radius: 5px;
        margin-bottom: 13px;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
        padding: 15px;
        animation: moveInRight .5s ease-in-out;

        ::placeholder{
            font-family: 'Raleway', sans-serif;
            font-size: 20px;
            line-height: 23px;
            color: #000000;
        }
    }

    a{
        align-self: center;
        animation: moveInRight .5s ease-in-out;
    }
`

const LaunchingHeader = styled.h1`
    font-weight: bold;
    margin-bottom: 40px;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
    animation: moveInRight .5s ease-in-out;
`

const LaunchingForm = styled.form`
    display: flex;
    width: 100%;
    flex-direction: column;
    
    button{
        width: 100%;
        cursor: pointer;
        align-self: center;
        height: 58px;
        background: #A328D6;
        border-radius: 5px;
        color: #FFFFFF;
        font-size: 20px;
        line-height: 23px;
        margin-bottom: 18px;
        text-align: center;
        animation: moveInRight .5s ease-in-out;
        transition: all .15s ease-in-out;
        &:hover{
        transform: translateY(-3px);
        box-shadow: 0px 3px 7px 1px rgba(0, 0, 0, 0.3);
        }
        &:active{
            transform: translateY(-1px);
            box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);
        }
    }
`

const CancelButton = styled.div`
    align-self: center;
    font-weight: bold;
    font-size: 20px;
    line-height: 18px;
    color: #FFF;
    &:hover{
        transform: translateY(-3px);
        text-shadow: 0px 3px 7px 1px rgba(0, 0, 0, 0.3);
        }
    &:active{
        transform: translateY(-1px);
        text-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);
    }
`

const ErrorMessage = styled.p`
    font-family: Raleway;
    align-self: center;
    font-size: 15px;
    line-height: 18px;
    margin-bottom: 13px;
    color: crimson;
    font-weight: 700;

`




const IncomesExpenses = {
    LaunchingHeader,
    LaunchingContainer,
    LaunchingForm,
    CancelButton,
    ErrorMessage
}

export default IncomesExpenses