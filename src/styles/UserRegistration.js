import styled from "styled-components"

const RegistrationContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;
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
`

const RegistrationForm = styled.form`
    display: flex;
    width: min(100%, 700px);
    flex-direction: column;
    
    input{
        width: calc(100% - 50px);
        align-self: center;
        height: 58px;
        background: ${({ theme: { colors } } ) => colors.secondary};
        border-radius: 5px;
        margin-bottom: 13px;
        font-size: 20px;
        line-height: 23px;
        color: ${({ theme: { colors } } ) => colors.inputs};
        padding: 15px;
        animation: moveInRight .5s ease-in-out;

        ::placeholder{
            font-family: 'Raleway', sans-serif;
            font-size: 20px;
            line-height: 23px;
            color: ${({ theme: { colors } } ) => colors.inputs};
        }
    }

    button{
        width: calc(100% - 50px);
        cursor: pointer;
        align-self: center;
        height: 58px;
        background: ${ ( { theme: {colors} } ) => colors.primary };
        border-radius: 5px;
        color: ${({ theme: { colors } } ) => colors.secondaryAdaptable};
        font-size: 20px;
        line-height: 23px;
        margin-bottom: 32px;
        text-align: center;
        transition: all .3s;
        animation: moveInRight .5s ease-in-out;

        &:hover{
            box-shadow: 0px  2px 2px ${({ theme: { colors } } ) => colors.inputs === '#fff' ? 'rgba(256, 256, 256, 0.7)' : 'rgba(0, 0, 0, 0.5)'};
            transform: translateY(-3px);
        }

        &:active{
            box-shadow: 0px  .5px 1px ${({ theme: { colors } } ) => colors.inputs === '#fff' ? 'rgba(256, 256, 256, 0.5)' : 'rgba(0, 0, 0, 0.5)'};
            transform: translateY(-1px);
        }
    }

`

const Logo = styled.h1`
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    line-height: 50px;
    margin-bottom: 28px;
    color: ${({ theme: { colors } } ) => colors.secondaryAdaptable};
    animation: moveInRight .5s ease-in-out;
`

const PageTransitionMessage = styled.p`
    font-family: Raleway;
    font-size: 15px;
    line-height: 18px;
    color: ${({ theme: { colors } } ) => colors.secondaryAdaptable};
    font-weight: 700;
    animation: moveInRight .5s ease-in-out;
` 
const ErrorMessage = styled.p`
    font-family: Raleway;
    align-self: center;
    font-size: 15px;
    line-height: 18px;
    margin-bottom: 13px;
    color: crimson;
    font-weight: 700;
    animation: moveInRight .5s ease-in-out;
`

const UserRegistration = {
    RegistrationContainer,
    RegistrationForm,
    Logo,
    PageTransitionMessage,
    ErrorMessage
}

export default UserRegistration