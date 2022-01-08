import styled from "styled-components";

const DashBoardContainer = styled.div`
    position: relative;
    margin: 20px 15px;
    border-radius: 10px;
    background: #0c0931;
`

const MetricsHolder = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 90vw;
    padding: 0px 20px;
    margin: 30px 0px 30px 0px;
    flex-shrink: 1;
`

const Card = styled.div`
    border: 1px solid ${({ theme: { colors } } ) => colors.secondaryAdaptable};
    margin-top: ${props => `${props.mt}px`};
    margin-bottom: 15px;
    padding: 12px;
    border-radius: 5px;
`

const MetricsComponent = styled.div`
    display: flex;
    width: 100%;
    color: #fff;
    margin: 20px 0px;
    border-radius: 10px;
    font-size: 21px;
    align-items: center;
    justify-content: space-between;

    div {
        display: flex;
    }

    svg {
        color: ${({ theme: { colors } } ) => colors.secondaryAdaptable};
        margin-right: 20px
    }

    .red{
        color: ${({ theme: { colors } } ) => colors.quarternary};
    }
    .green{
        color: ${({ theme: { colors } } ) => colors.terciary};
    }
`

const MetricsName = styled.h2`
    font-family: 'Raleway', sans-serif;
    font-size: 15px; 
    margin-bottom: 15px;
    color: ${({ theme: { colors } } ) => colors.secondaryAdaptable};

`

const MetricsValue = styled.h1`
    font-family: 'Raleway', sans-serif;
    font-size: 21px; 
    color: ${({ theme: { colors } } ) => colors.secondaryAdaptable};

    span { 
        font-size: 12px;
    }
`

const ChartHolder = styled.div`
    margin-top: 50px;
    width: 90vw;
    height: 30vh;
    overflow: visible;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const DashboardTitle = styled.h2`
    font-weight: bold;
    font-size: 25px;
    line-height: 31px;
    color: ${({ theme: { colors } } ) => colors.secondaryAdaptable};

`

export {
    DashBoardContainer,
    MetricsComponent,
    MetricsName,
    MetricsValue,
    MetricsHolder,
    ChartHolder,
    DashboardTitle,
    Card,
}