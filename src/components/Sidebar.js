import { useContext, useRef } from "react";
import { IoCloseOutline, IoMoonSharp, IoPencilSharp, IoSunnySharp, IoTrash } from "react-icons/io5";
import UserContext from "../context/UserContext"
import styled from "styled-components";

const Sidebar = ({sidebar, logOut, setSidebar, setThemeType, themeType}) => {
    const {
        userData
    } = useContext(UserContext)

    const sidebarRef = useRef();

    const closeModal = (e) => {
        if (sidebarRef.current === e.target) {
          setSidebar(false);
        }
    }

    return(
        <>
        <NavOverlay sidebar = {sidebar} onClick = {closeModal} ref = {sidebarRef}>
        </NavOverlay>
        <NavMenu sidebar = {sidebar}>
            <NavMenuHeader>
                <p>Welcome, {userData.name}</p>
                <IoCloseOutline size = {25} onClick = {() => setSidebar(false)}/>    
            </NavMenuHeader>
            <NavOption onClick = {() => {
                setThemeType(prev => prev === 'light' ? 'dark' : 'light');
                localStorage.setItem("myWalletTheme", themeType === 'light' ? 'dark' : 'light')
            }}>
                { themeType === 'dark' ? <IoMoonSharp size = {20}/> : <IoSunnySharp size = {20}/> }
                <p>Change your theme</p>
            </NavOption>
            <NavOption onClick = {() => null}>
                <IoPencilSharp size = {20} />
                <p>Edit your records</p>
            </NavOption>
            <NavOption onClick = {() => null}>
                <IoTrash size = {20} />
                <p>Delete your records</p>
            </NavOption>
            <LogoutButton onClick = {logOut}>
                LOGOUT
            </LogoutButton>
        </NavMenu>
        </>
    )
}

const NavOverlay = styled.div`
    position: fixed;
    top: 0;
    left: ${props => props.sidebar ? "0" : "100vw"};
    right: 0;
    bottom: ${props => props.sidebar ? "0" : "100vh"};
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 4;
`

const NavMenu = styled.div`
    background-color: ${({ theme: { colors } } ) => colors.primaryDark };
    color: ${({ theme: { colors } } ) => colors.secondaryAdaptable};
    width: 350px;
    height: calc(100vh - 10px);
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    top: 10px;
    right: ${props => props.sidebar ? "10px" : "-350px"};
    transition: .3s;
    overflow-y: scroll;
    overflow-x: hidden;
    z-index: 5;

    @media(max-width: 500px) {
        width: 280px;
    }
`

const NavMenuHeader = styled.div`
    width: 350px;
    height: 50px;
    font-size: 18px;
    padding: 15px;
    border-bottom: 1px solid ${({ theme: { colors } } ) => colors.inputs === '#fff' ? 'rgba(256, 256, 256, 0.5)' : 'rgba(200, 200, 200, 0.5)'};;
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg{
        cursor: pointer;
    }

    @media(max-width: 500px) {
        width: 280px;
    }
`

const NavOption = styled.div `
    cursor: pointer;
    width: 100%;
    margin-top: 15px;
    padding: 5px 20px;
    display: flex;
    justify-content: flex-start;

    svg{
        margin-right: 15px;
    }
`

const LogoutButton = styled.div `
    cursor: pointer;
    position: absolute;
    left: 10%;
    bottom: 80px;
    width: 80%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    transition: all .5s;
    border: .7px solid #fff;
    font-size: 16px;

    &:hover{
        background-color: #ddd;
        color: #333;
    }
`

export default Sidebar;