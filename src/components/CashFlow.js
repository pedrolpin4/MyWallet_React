import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react"
import { IoMenuOutline } from  "react-icons/io5";
import { useHistory } from "react-router";
import styled from "styled-components"
import UserContext from "../context/UserContext"
import financialRecords from "../service/financialRecords";
import { HelloMessage, TransactionBox } from "../styles/Shared";
import Loading from "../assets/Loading";
import Sidebar from "./Sidebar";

const CashFlow = ({setThemeType, themeType}) => {
    const history = useHistory();
    const [ isLoading, setIsLoading ] = useState(true)
    const { userData } = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [sidebar, setSidebar] = useState(false);

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

    useEffect(() => cashFlowFunction(JSON.parse(localStorage.getItem("userLogin"))?.token), [])

    return(
        <CashFlowContainer>
                    <Sidebar sidebar = {sidebar} setSidebar = {setSidebar} 
                        setThemeType = {setThemeType} themeType = {themeType}/>
                    <HeadersBox> 
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
                                                    <TransactionBox key = {t.id}>
                                                        <TransactionDate>
                                                            {dayjs(t.date).format('DD/MM')}
                                                        </TransactionDate>
                                                        <TransactionDescription>
                                                            {t.description}
                                                        </TransactionDescription>
                                                        <TransactionValue 
                                                            className = {Number(t.value) < 0 ? "red" : "green"}
                                                        >
                                                            {
                                                                Number(t.value) < 0 ?
                                                                `- $${Number(Math.abs(t.value)).toFixed(2)}`:
                                                                `+ $${Number(Math.abs(t.value)).toFixed(2)}` 
                                                            }
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
        </CashFlowContainer>    
    )
}

const HeadersBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
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
    padding: 25px;
    .red{
        color: ${({ theme: { colors } } ) => colors.quarternary};
    }
    .green{
        color: ${({ theme: { colors } } ) => colors.terciary};
    }
`


const WhiteBox = styled.div`
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

`

const TransactionDate = styled.div`
    width: 30px;
    font-size: 16px;
    line-height: 19px;
    color: ${({ theme: { colors } } ) => colors.secondaryDark};
`

const TransactionDescription = styled.div`
    width: calc(100vw - 250px);
    text-align: start;
    overflow-x: hidden;
    font-size: 16px;
    line-height: 19px;
    color: ${({ theme: { colors } } ) => colors.inputs};
`

const TransactionValue = styled.div`
    width: 100px;
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