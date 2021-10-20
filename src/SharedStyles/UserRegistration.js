import styled from "styled-components"

const RegistrationContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Logo = styled.h1`
    font-family: 'Saira Stencil One', cursive;
    font-size: 32px;
    line-height: 50px;
    color: #FFFFFF;
`

const UserRegistration = {
    RegistrationContainer,
    Logo
}

export default UserRegistration