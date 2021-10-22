import { useContext, useEffect, useState } from "react"
import { FiMinusCircle, FiPlusCircle } from  "react-icons/fi";
import { IoExitOutline } from  "react-icons/io5";
import styled from "styled-components"
import UserContext from "../context/UserContext"
import service from "../service/serviceFunctions";

const CashFlow = () => {
    const { userData } = useContext(UserContext);
    const [transactions, setTransactions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("")

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
                    Olá, {userData.name}
                </HelloMessage>
                <IoExitOutline color = {"#fff"} size = {30}/>
            </HeadersContainer>
            <TransactionsContainer>
                {
                    transactions.length 
                    ?
                        transactions.map(t => (
                            <TransactionContainer>
                                <TransactionDate>
                                    {t.date}
                                </TransactionDate>
                                <TransactionDescription>
                                    {t.description}
                                </TransactionDescription>
                                <TransactionValue>
                                    {t.value}
                                </TransactionValue>
                            </TransactionContainer>
                        )) 
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
            </TransactionsContainer>
            <RegisterContainer> 
                <RegisterBox>
                    <FiPlusCircle color = {"#fff"} size = {25}/>
                    <RegisterMessage> 
                        New Income 
                    </RegisterMessage>
                </RegisterBox>
                <RegisterBox>
                    <FiMinusCircle color = {"#fff"} size = {25}/>
                    <RegisterMessage> 
                        New Expense
                    </RegisterMessage>
                </RegisterBox>
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

const TransactionsContainer = styled.div`
    width: 100%;
    height: calc(100vh - 221px);
    margin-bottom: 13px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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

const TransactionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const TransactionDate = styled.div`
    font-size: 16px;
    line-height: 19px;
    color: #C6C6C6;
`

const TransactionDescription = styled.div`
    font-size: 16px;
    line-height: 19px;
    color: #C6C6C6;
`

const TransactionValue = styled.div`
    font-size: 16px;
    line-height: 19px;
    color: #C6C6C6;
`

export default CashFlow