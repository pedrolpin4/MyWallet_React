import dayjs from "dayjs";
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { IoMenuOutline } from  "react-icons/io5";
import { useHistory } from "react-router";
import styled from "styled-components"
import UserContext from "../context/UserContext"
import financialRecords from "../service/financialRecords";
import { HelloMessage, TransactionBox } from "../styles/Shared";
import Loading from "../assets/Loading";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import EditModal from "./Edit";

const CashFlow = ({setThemeType, themeType}) => {
    const history = useHistory();
    const scrollRef = useRef();
    const [ isLoading, setIsLoading ] = useState(true)
    const { userData } = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [ edited, setEdited ] = useState();
    const [reload, setReload] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [sidebar, setSidebar] = useState(false);
    const modalRef = useRef();
    
    function closeModal(e) {
        if (modalRef.current === e.target) {
          setShowModal(false);
        }
    }
    
    const modalKeyEvents = useCallback((e) => {
        if (e.key === 'Escape' && showModal) {
            setShowModal(false);
        }
    }, [setShowModal, showModal]);

    useEffect(() => {
        document.addEventListener('keydown', modalKeyEvents);
    }, [modalKeyEvents]);


    if(!localStorage.getItem("userLogin")){
        history.push("/");
    }

    const sumTransactions = () =>{
        let sum = 0;
        transactions.forEach(t =>{
            sum += Number(t.value)
        })
        return sum;
    }

    const cashFlowFunction = async (token) =>  {
        setIsLoading(true)
        const result = await financialRecords.getCashFlow(token)

        if(result.data){
            setIsLoading(false)
            setTransactions(result.data);
            return;
        }

        setIsLoading(false)
        setErrorMessage(result.message);
        return;
    }

    useEffect(() => {
        scrollRef.current.scrollIntoView(true);
        toast.info('Click on the record to edit or delete')
    }, [])

    useEffect(() => {
        cashFlowFunction(JSON.parse(localStorage.getItem("userLogin"))?.token)
    }, [reload])

    return(
        <CashFlowContainer themeType = {themeType}>
                    <Sidebar sidebar = {sidebar} setSidebar = {setSidebar} 
                        setThemeType = {setThemeType} themeType = {themeType}/>
                    <HeadersBox ref = {scrollRef}> 
                        <HelloMessage>
                            Hello, {userData.name}
                        </HelloMessage>
                        <IoMenuOutline size = {30} className = "menu" onClick = {() => setSidebar(true)}/>
                    </HeadersBox>
                {
                    isLoading ? 
                    <Loading spinnerSize={70} color={"#fff"}/> :
                    <>
                        <WhiteBox hasTransactions = {transactions.length}>
                            {
                                transactions.length 
                                ?
                                    <>
                                        <TransactionsContainer>
                                            <BalanceBox>
                                                <BalanceText>
                                                    Balance
                                                </BalanceText>
                                                <BalanceValue
                                                    className = {sumTransactions() < 0 ? "red" : "green"}
                                                >
                                                    { 
                                                        sumTransactions() < 0 ?
                                                        `- ${`$${Math.abs(sumTransactions()).toFixed(2)}`}`:
                                                        `+ ${`$${Math.abs(sumTransactions()).toFixed(2)}`}`
                                                    }
                                                </BalanceValue>
                                            </BalanceBox>
                                            {transactions.map(t => {
                                                return (
                                                    <TransactionBox key = {t.id} onClick = {() => {
                                                        setShowModal(true)
                                                        setEdited(t)
                                                    }}>
                                                        <TransactionDate>
                                                            <p>{dayjs(t.date).format('DD/MM')}</p>
                                                        </TransactionDate>
                                                        <TransactionDescription>
                                                            <p className="mb-5">{t.description}</p>
                                                            <p className="category">{t.category}</p>
                                                        </TransactionDescription>
                                                        <TransactionValue>
                                                            <p className = {Number(t.value) < 0 ? "red" : "green"}>{
                                                                Number(t.value) < 0 ?
                                                                `- $${Number(Math.abs(t.value)).toFixed(2)}`:
                                                                `+ $${Number(Math.abs(t.value)).toFixed(2)}` 
                                                            }</p>
                                                        </TransactionValue>
                                                    </TransactionBox>
                                            )})} 
                                        </TransactionsContainer>
                                    </>
                                    :
                                    <NoTransactionsMessage>
                                        {errorMessage}
                                    </NoTransactionsMessage>
                            }
                        </WhiteBox>
                        <SeeMore onClick={() => history.push('/home')}>
                            Dashboard
                        </SeeMore>
                    </>
                }
                <>
                {
                    showModal ?
                    <EditModal modalRef = {modalRef} closeModal = {closeModal} setReload = {setReload} 
                        edited = {edited} setShowModal = {setShowModal}/> : ''
                }
                </>
        </CashFlowContainer>    
    )
}

const HeadersBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 25px 0px 30px 0px;
    transition: all .2s ease-in;

    svg{
        cursor: pointer;
        color: ${({ theme: { colors } } ) => colors.secondaryAdaptable};
        &:hover{
            transform: translateY(-1px);
        }
        &:active{
            transform: translateY(0);
        }
    }
`


const CashFlowContainer = styled.div`
    font-family: 'Raleway', sans-serif;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0px 25px 25px 25px;
    overflow: hidden;
    .red{
        color: ${props => props.themeType === 'light'  ? '#C70000' : '#FF2B20'};
    }
    .green{
        color: ${props => props.themeType === 'light' ? "#03AC00" : "#02FF09"};
    }
`


const WhiteBox = styled.div`
    animation: moveInRight .5s ease-in-out;
    position: relative;
    width: 100%;
    height: calc(100vh - 220px);
    padding-top: 11px;
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.hasTransactions ? "flex-start" : "center"};
    background: ${({ theme: { colors } } ) => colors.secondary};
    align-items:${props => props.hasTransactions ? "flex-start" : "center"} ;
    border-radius: 5px;
`

const NoTransactionsMessage = styled.h2`
    width: 250px;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: ${({ theme: { colors } } ) => colors.secondaryDark};
`

const TransactionsContainer = styled.div`
    width: 100%;
    height: calc(100vh - 288px);
    overflow-y: scroll;
    margin: 60px 0px 10px 0px;
    padding-bottom: 11px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: ${({ theme: { colors } } ) => colors.secondary};

    svg {
        cursor: pointer;
        margin-right: 5px;
    }
`

const TransactionDate = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 10px;
    font-size: 16px;
    color: ${({ theme: { colors } } ) => colors.secondaryDark};
`

const TransactionDescription = styled.div`
    width: calc(100vw - 250px);
    text-align: start;
    overflow-x: hidden;
    font-size: 16px;
    color: ${({ theme: { colors } } ) => colors.inputs};

    .mb-5 {
        margin-bottom: 5px;
    }

    .category {
        color: ${({ theme: { colors } } ) => colors.secondaryDark};
        font-size: 12px;
    }
`

const TransactionValue = styled.div`
    min-width: 80px;
    height: 100%;
    font-size: 16px;
    line-height: 19px;
    text-align: end;
`
const BalanceBox = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme: {colors} } ) => colors.inputs === '#fff'  ? "rgba(255, 255, 255, 0.5)": "rgba(0, 0, 0, 0.5)"};
    z-index: 2;
    top: 0px;
    left: 0px;
    width: 100%;
    padding: 20px;
`

const BalanceText = styled.div`
    font-weight: bold;
    font-size: 22px;
    line-height: 20px;
    color: ${({ theme: { colors } } ) => colors.inputs};
`

const BalanceValue = styled.div`
    font-size: 22px;
    line-height: 20px;
    text-align: right;
    color: ${({ theme: { colors } } ) => colors.terciary};
`

const SeeMore = styled.div`
    position: relative;
    font-size: 18px;
    margin-top: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 180px;
    height: 45px;
    border-radius: 27.5px;
    background-color: #fff;
    color: #333;
    align-self: center;
    transition: all .4s;
    animation: moveInBottom .5s ease-in-out;
    cursor: pointer; 

    &::after{
        content: "";
        background-color: #fff;
        z-index: -1;
        display: inline-block;
        height: 100%;
        width: 100%;
        border-radius: 27.5px;
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

export default CashFlow