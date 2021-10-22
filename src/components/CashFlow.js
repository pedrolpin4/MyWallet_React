import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react"
import { FiMinusCircle, FiPlusCircle } from  "react-icons/fi";
import { IoExitOutline } from  "react-icons/io5";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components"
import UserContext from "../context/UserContext"
import service from "../service/serviceFunctions";

const CashFlow = () => {
    const history = useHistory();
    const { userData, setUserData } = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    if(!userData.token){
        history.push("/")
    }

    const logOut = () => {
        localStorage.removeItem("userLogin");
        setUserData({});
        history.push("/");
    }

    const sumTransactions = () =>{
        let sum = 0;
        transactions.forEach(t =>{
            sum += t.value
        })
        return sum;
    }

    const cashFlowFunction = async (token) =>  {
        const result = await service.getCashFlow(token)
        
        if(result?.data){
            setTransactions(result.data);
            console.log(transactions);
            return;
        }

        setErrorMessage(result?.message);
        return;
    }

    useEffect(() => cashFlowFunction(userData.token), [userData])

    return(
        <CashFlowContainer>
            <HeadersContainer> 
                <HelloMessage>
                    Hello, {userData.name}
                </HelloMessage>
                <IoExitOutline color = {"#fff"} size = {30} onClick = {logOut}/>
            </HeadersContainer>
            <WhiteBox>
                {
                    transactions.length 
                    ?
                        <>
                            <TransactionsContainer>
                                {transactions.map(t => (
                                        <TransactionBox key = {t.id}>
                                            <TransactionDate>
                                                {dayjs(t.date).format('DD/MM')}
                                            </TransactionDate>
                                            <TransactionDescription>
                                                {t.description}
                                            </TransactionDescription>
                                            <TransactionValue>
                                                {`$${t.value}.00`}
                                            </TransactionValue>
                                        </TransactionBox>
                                ))} 
                            </TransactionsContainer>
                            <BalanceBox>
                                <BalanceText>
                                    BALANCE
                                </BalanceText>
                                <BalanceValue>
                                    {`$${sumTransactions()}.00`}
                                </BalanceValue>
                            </BalanceBox>
                        </>
                        :
                        <NoTransactionsMessage>
                            {
                                errorMessage ?
                                    errorMessage :
                                    `There are no incomes or expenses 
                                    registered in your account`
                            }
                        </NoTransactionsMessage>

                }
            </WhiteBox>
            <RegisterContainer> 
                <Link to = {"/incomes"}>
                    <RegisterBox>
                        <FiPlusCircle color = {"#fff"} size = {25}/>
                        <RegisterMessage> 
                            New Income 
                        </RegisterMessage>
                    </RegisterBox>
                </Link>
                <Link to = {"/expenses"}>
                    <RegisterBox>
                        <FiMinusCircle color = {"#fff"} size = {25}/>
                        <RegisterMessage> 
                            New Expense
                        </RegisterMessage>
                    </RegisterBox>
                </Link>
            </RegisterContainer>
        </CashFlowContainer>
    )
}

const CashFlowContainer = styled.div`
    font-family: 'Raleway', sans-serif;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 25px;
`

const HelloMessage = styled.h1`
    font-weight: bold;
    font-size: 26px;
    line-height: 31px;
    color: #FFFFFF;
` 

const HeadersContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 23px;

    svg{
        cursor: pointer;
    }
`

const WhiteBox = styled.div`
    position: relative;
    width: 100%;
    height: calc(100vh - 231px);
    margin-bottom: 13px;
    padding-top: 11px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: #FFFFFF;
    border-radius: 5px;
`

const NoTransactionsMessage = styled.h2`
    width: 250px;
    font-weight: normal;
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: #868686;
`

const RegisterBox = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    width: calc((100vw - 65px)/2);
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
`

const RegisterContainer = styled.div`
    width: 100%;
    height: 114px;
    display: flex;
    justify-content: space-between;
`

const RegisterMessage = styled.p`
    width: 80px;
    font-weight: bold;
    font-size: 17px;
    line-height: 20px;
    color: #FFFFFF;
`

const TransactionsContainer = styled.div`
    width: 100%;
    height: calc(100vh - 288px);
    overflow-y: scroll;
    margin-bottom: 41px;
    padding-bottom: 11px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background: #FFFFFF;

`

const TransactionBox = styled.div`
    width: 100%;
    padding: 12px;
    display: flex;
    justify-content: space-between;
`

const TransactionDate = styled.div`
    font-size: 16px;
    line-height: 19px;
    color: #C6C6C6;
`

const TransactionDescription = styled.div`
    width: calc(100vw - 230px);
    text-align: start;
    overflow-x: hidden;
    font-size: 16px;
    line-height: 19px;
    color: #000000;
`

const TransactionValue = styled.div`
    font-size: 16px;
    line-height: 19px;
    color: #C70000;
`

const BalanceBox = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-between;
    height: 25px;
    z-index: 2;
    bottom: 10px;
    left: 0px;
    width: 100%;
    padding: 0 12px;
`

const BalanceText = styled.div`
    font-weight: bold;
    font-size: 17px;
    line-height: 20px;
    color: #000000;
`

const BalanceValue = styled.div`
    font-size: 17px;
    line-height: 20px;
    text-align: right;
    color: #03AC00;
`

export default CashFlow