/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react"
import { IoMenuOutline } from  "react-icons/io5";
import { useHistory } from "react-router";
import { DashboardTitle, ChartHolder, MetricsComponent, MetricsHolder, MetricsValue } from "../styles/DashboardStyles";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import styled from "styled-components"
import financialRecords from "../service/financialRecords";
import { HeadersContainer, HelloMessage, TransactionBox } from "../styles/Shared";
import Sidebar from "./Sidebar";
import UserContext from "../context/UserContext";
import { BsGraphDown, BsGraphUp } from "react-icons/bs";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import categoriesServices from "../service/categories";
import Loading from "../assets/Loading";

const DashBoard = ({setThemeType, themeType}) => {
    const history = useHistory();
    Chart.register(...registerables);
    const { userData } = useContext(UserContext);
    const [ isLoading, setIsLoading ] = useState(true)
    const [incomeCategories, setIncomeCategories] = useState([]);
    const [expenseCategories, setExpenseCategories] = useState([])
    const [transactions, setTransactions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [ visibility, setVisibility ] = useState(false)
    const [sidebar, setSidebar] = useState(false);

    if(!localStorage.getItem("userLogin")){
        history.push("/");
    }

    const sumTransactions = (filter) =>{
        let sum = 0;
        if(filter === 'incomes') {
            transactions.filter(t => Number(t.value) > 0).forEach(t =>{
                sum += Number(t.value)
            })
            return sum
        }

        if(filter === 'expenses') {
            transactions.filter(t => Number(t.value) < 0).forEach(t =>{
                sum -= Number(t.value)
            })
            return sum
        }

        transactions.forEach(t =>{
            sum += Number(t.value)
        })
        return sum;
    }

    const categoriesStats = async (token, type) => {
        const result = await categoriesServices.getCategoryStatsByType(token, type);
        if(result.data && type === 'income'){
            setIsLoading(false)
            setIncomeCategories(result.data);
            return;
        }

        if(result.data) {
            setIsLoading(false)
            setExpenseCategories(result.data);
            return;
        }

        setIsLoading(false)
        setErrorMessage(result.message);
        return;
    };

    const cashFlowFunction = async (token) =>  {
        const result = await financialRecords.getCashFlow(token)

        if(result.data){
            setTransactions(result.data);
            return;
        }

        setErrorMessage(result.message);
        return;
    }

    useEffect(() => {
        categoriesStats(JSON.parse(localStorage.getItem("userLogin"))?.token, 'income');
        categoriesStats(JSON.parse(localStorage.getItem("userLogin"))?.token, 'expense');
        cashFlowFunction(JSON.parse(localStorage.getItem("userLogin"))?.token);
    }, [])

    return(
        <CashFlowContainer>
            <Sidebar sidebar = {sidebar} setSidebar = {setSidebar} 
              setThemeType = {setThemeType} themeType = {themeType}/>
            <HeadersContainer> 
                <HelloMessage>
                    Hello, {userData.name}
                </HelloMessage>
                <IoMenuOutline size = {30} className = "menu" onClick = {() => setSidebar(true)}/>
            </HeadersContainer>
            {
                isLoading ? 
                <Loading spinnerSize={70} color={"#fff"}/> :
                <div className="effect">
                    <BalanceBox>
                        <BalanceText>
                            <p>Balance</p>  
                            {
                                visibility ? 
                                    <AiOutlineEye size = {30} onClick={() => setVisibility(false)}/> :
                                    <AiOutlineEyeInvisible  size = {30} onClick={() => setVisibility(true)}/>}
                        </BalanceText>
                        <BalanceValue
                            className = {visibility ? sumTransactions() < 0 ? "red" : "green" : 'white'}
                        >
                            { visibility ? 
                                sumTransactions() < 0 ?
                                `-${`$${Math.abs(sumTransactions()).toFixed(2)}`}`:
                                `+${`$${Math.abs(sumTransactions()).toFixed(2)}`}`
                                : `???`
                            }
                        </BalanceValue>
                    </BalanceBox>
                    <DashboardTitle>
                        Metrics
                    </DashboardTitle>
                    <MetricsHolder>
                        <MetricsComponent >
                            <div>
                                <BsGraphUp size = {30} />
                                <p>Incomes</p>
                            </div>
                            <MetricsValue className="green">
                            { visibility ? 
                            `+$${sumTransactions('incomes').toFixed(2)}` :
                                '???'
                            }
                            </MetricsValue>
                        </MetricsComponent>
                        <MetricsComponent >
                            <div>
                                <BsGraphDown size = {30} />
                                <p>Expenses</p>   
                            </div>
                            <MetricsValue className="red">
                            { visibility ? 
                            `-$${sumTransactions('expenses').toFixed(2)}` :
                                '???'
                            }                
                            </MetricsValue>
                        </MetricsComponent>
                    </MetricsHolder>
                    {
                        expenseCategories.length ?
                    <>
                    <DashboardTitle>
                        Expenses by Category
                    </DashboardTitle>
                    <ChartHolder>
                        <Doughnut 
                            height={300}
                            width={500}
                            data = {{
                                    labels: expenseCategories.map(expense => expense.name),
                                    datasets: [{
                                        label: 'Number of Votes',
                                        data: expenseCategories.map(expense => expense.sum),
                                        backgroundColor: [
                                                'rgba(255, 99, 132, 0.2)',
                                                'rgba(54, 162, 235, 0.2)',
                                                'rgba(255, 206, 86, 0.2)',
                                                'rgba(75, 192, 192, 0.2)',
                                                'rgba(153, 102, 255, 0.2)',
                                                'rgba(255, 159, 64, 0.2)'
                                            ],
                                            borderColor: [
                                                'rgba(255, 99, 132, 1)',
                                                'rgba(54, 162, 235, 1)',
                                                'rgba(255, 206, 86, 1)',
                                                'rgba(75, 192, 192, 1)',
                                                'rgba(153, 102, 255, 1)',
                                                'rgba(255, 159, 64, 1)'
                                            ],
                                            borderWidth: 1
                                    }]
                                }}
                                options={{
                                    maintainAspectRatio: false,
                                    aspectRatio: 1,
                                    plugins: {
                                        legend: {
                                            position: "right",
                                            labels: {
                                                boxWidth: 10,
                                                boxHeight: 10,
                                            }
                                        },
                                    },
                                    scales: {
                                        y:{
                                            grid: {
                                                display: false,
                                            },
                                            ticks:{
                                                display: false,
                                            },
                                            beginAtZero: true
                                        },
                                    },
                            }}
                        />
                    </ChartHolder> </>: ''}
                    {
                        incomeCategories.length ? 
                    <>
                        <DashboardTitle>
                            Incomes by Category
                        </DashboardTitle>
                        <ChartHolder>
                            <Doughnut 
                                height={300}
                                width={500}
                                data = {{
                                        labels: incomeCategories.map(income => income.name),
                                        datasets: [{
                                            label: 'Number of Votes',
                                            data: incomeCategories.map(income => income.sum),
                                            backgroundColor: [
                                                    'rgba(255, 102, 250, 0.2)',
                                                    'rgba(23, 130, 255, 0.2)',
                                                    'rgba(105, 206, 106, 0.2)',
                                                ],
                                                borderColor: [
                                                    'rgba(255, 102, 250, 1)',
                                                    'rgba(23, 130, 255, 1)',
                                                    'rgba(105, 206, 106, 1)',
                                                ],
                                                borderWidth: 1
                                        }]
                                    }}
                                    options={{
                                        maintainAspectRatio: false,
                                        aspectRatio: 1,
                                        plugins: {
                                            legend: {
                                                position: "right",
                                                labels: {
                                                    boxWidth: 10,
                                                    boxHeight: 10,
                                                }
                                            },
                                        },
                                        scales: {
                                            y:{
                                                grid: {
                                                    display: false,
                                                },
                                                ticks:{
                                                    display: false,
                                                },
                                                beginAtZero: true
                                            },
                                        },
                                }}
                            />
                        </ChartHolder>
                    </> : ''
                    }
                    {
                    transactions.length ?
                    <>
                        <DashboardTitle>
                            Last Transactions
                        </DashboardTitle>
                        <WhiteBox hasTransactions = {transactions.length}>
                            <TransactionsContainer>
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
                        <SeeMore onClick={() => history.push('/cash-flow')}>See more</SeeMore>
                    </WhiteBox> 
                    </> :
                    <NoTransactionsMessage>
                        {errorMessage}
                    </NoTransactionsMessage>
                }
            </div> // effect
        }
        </CashFlowContainer>
    )
}
const CashFlowContainer = styled.div`
    font-family: 'Raleway', sans-serif;
    overflow: hidden;
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
    .white{
        color: ${({ theme: { colors } } ) => colors.secondaryAdaptable};
    }
    .effect {
        animation: moveInRight .5s ease-in-out;
    }
`

const WhiteBox = styled.div`
    position: relative;
    width: 100%;
    overflow-y: hidden;
    margin-bottom: 13px;
    padding-top: 11px;
    display: flex;
    flex-direction: column;
    justify-content: ${props => props.hasTransactions ? "flex-start" : "center"};
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
    max-height: 220px;
    overflow-y: hidden;
    margin-bottom: 20px;
    padding-bottom: 11px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
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

    span { 
        font-size: 8px;
    }
`
const BalanceBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 2;
    width: 100%;
    margin: 90px 0px 30px 0px;
`

const BalanceText = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 25px;
    line-height: 20px;
    margin-bottom: 20px;
    color: ${({ theme: { colors } } ) => colors.secondaryAdaptable};

    svg {
        cursor: pointer;
    }
`

const BalanceValue = styled.div`
    font-size: 36px;
    align-self: center;
    color: ${({ theme: { colors } } ) => colors.terciary};
`

const SeeMore = styled.div`
    position: relative;
    font-size: 18px;
    margin-bottom: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 35px;
    border-radius: 17.5px;
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
        border-radius: 17.5px;
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

export default DashBoard