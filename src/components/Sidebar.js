import { useContext, useRef } from "react";
import { IoAddCircleOutline, IoCloseOutline, IoMoonSharp, IoPencilSharp, IoSunnySharp } from "react-icons/io5";
import { GoGraph } from 'react-icons/go'
import { AiOutlineHome } from 'react-icons/ai'
import UserContext from "../context/UserContext"
import {
    NavOverlay,
    NavOption,
    NavMenuHeader,
    NavMenu,
    LogoutButton,
} from '../styles/SidebarStyles'
import { useHistory } from "react-router-dom";

const Sidebar = ({sidebar, logOut, setSidebar, setThemeType, themeType}) => {
    const history = useHistory()
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
                history.push('/home')
                setSidebar(false)
            }}>
                <AiOutlineHome size = {20} />
                <p>Home</p>
            </NavOption>
            <NavOption onClick = {() => history.push('/cash-flow')}>
                <GoGraph size = {20} />
                <p>Cash Flow</p>
            </NavOption>
            <NavOption onClick = {() => history.push('/register')}>
                <IoAddCircleOutline size = {22} />
                <p>Register transaction</p>
            </NavOption>
            <NavOption onClick = {() => null}>
                <IoPencilSharp size = {20} />
                <p>Edit your records</p>
            </NavOption>
            <NavOption onClick = {() => {
                setThemeType(prev => prev === 'light' ? 'dark' : 'light');
                localStorage.setItem("myWalletTheme", themeType === 'light' ? 'dark' : 'light')
            }}>
                { themeType === 'dark' ? <IoMoonSharp size = {20}/> : <IoSunnySharp size = {20}/> }
                <p>Change your theme</p>
            </NavOption>
            <LogoutButton onClick = {logOut}>
                LOGOUT
            </LogoutButton>
        </NavMenu>
        </>
    )
}


export default Sidebar;