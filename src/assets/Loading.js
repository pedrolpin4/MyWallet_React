import styled from 'styled-components';
import { CgSpinner } from 'react-icons/cg';

export default function Loading({ spinnerSize,
                                  color,
                                  isLogin
                                }) {
    return (
        <LoadingContainer isLogin = {isLogin}>
            <CgSpinner color={color} 
                       size={spinnerSize} 
                       className="spinner"/>
        </LoadingContainer>
    )
}

const LoadingContainer = styled.div`
    width: 100%;
    height: ${props => props.isLogin ? "auto"  : "calc(100vh - 70px)"};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .spinner {
        animation: rotate 1s linear infinite;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`