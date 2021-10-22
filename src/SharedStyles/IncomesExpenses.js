import styled from "styled-components"

const LaunchingContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 25px;
    display: flex;
    flex-direction: column;

    a{
        align-self: center;
    }
`

const LaunchingHeader = styled.h1`
    font-weight: bold;
    margin-bottom: 40px;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
`

const LaunchingForm = styled.form`
    display: flex;
    width: 100%;
    flex-direction: column;
    
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

        ::placeholder{
            font-family: 'Raleway', sans-serif;
            font-size: 20px;
            line-height: 23px;
            color: #000000;
        }

    }

    button{
        width: 100%;
        align-self: center;
        height: 58px;
        background: #A328D6;
        border-radius: 5px;
        color: #FFFFFF;
        font-size: 20px;
        line-height: 23px;
        margin-bottom: 18px;
        text-align: center;
    }
`

const CancelButton = styled.div`
    align-self: center;
    font-weight: bold;
    font-size: 20px;
    line-height: 18px;
    color: #FFF;
    opacity: 0.8;
`




const IncomesExpenses = {
    LaunchingHeader,
    LaunchingContainer,
    LaunchingForm,
    CancelButton
}

export default IncomesExpenses