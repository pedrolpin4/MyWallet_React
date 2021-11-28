import { useContext, useRef } from "react";
import { IoExitOutline } from "react-icons/io5";
import UserContext from "../context/UserContext"
import styled from "styled-components";

const Sidebar = ({sidebar, logOut, setSidebar}) => {
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
                <IoExitOutline size = {20} onClick = {logOut}/>    
            </NavMenuHeader>
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
    color: ${({ theme: { colors } } ) => colors.secondary};
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
`


const NavMenuHeader = styled.div`
    width: 350px;
    height: 50px;
    font-size: 18px;
    padding: 15px;
    border-bottom: 1px solid rgba(200, 200, 200, 0.2);
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export default Sidebar;