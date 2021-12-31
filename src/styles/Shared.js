import styled from "styled-components"

const HelloMessage = styled.h1`
    font-weight: bold;
    font-size: 26px;
    line-height: 31px;
    color: ${({ theme: { colors } } ) => colors.secondaryAdaptable};
` 

const HeadersContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 3;
    background-color: ${({ theme: { colors } } ) => colors.secondary};
    margin-bottom: 23px;
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

const TransactionBox = styled.div`
    width: 100%;
    padding: 12px;
    display: flex;
    justify-content: space-between;
`


export {
    HeadersContainer,
    HelloMessage,
    TransactionBox,
}