import styled from 'styled-components';

const Modal = styled.div`
  font-family: Raleway;
  position: fixed;
  top: calc((100vh - 500px) / 2);
  left: calc((100vw - 640px) / 2);
  width: 640px;
  height: 500px;
  background-color: ${({ theme: { colors } } ) => colors.primary};
  opacity: 1;
  z-index: 130;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  animation: moveInTop .5s ease;

  & > p {
    color: #ffffff;
    align-self: flex-start;
    margin: 0 0 30px;
  }
  @media (max-width: 790px) {
    width: 90vw;
    height: auto;
    left: 5vw;
    padding: 5px 15px 20px;
  }
`;

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 0px 15px 0px;
  width: 100%;
  h2 {
    font-weight: bold;
    font-size: 36px;
    line-height: 44px;
    color: #ffffff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0 5px 0 0;
  }
  p {
    cursor: pointer;
    font-size: 19.74px;
    margin: 0 0 20px;
  }
  button {
    background-color: transparent;
    color: #ffffff;
    font-weight: bold;
    border: none;
    font-size: inherit;
    cursor: pointer;
  }
  @media (max-width: 790px) {
    padding: 10px 0;
    h2 {
      font-size: 22px;
      line-height: 28px;
    }
  }
`;

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  right: 0px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 120;
`;


export {
  Modal,
  ModalBackground,
  TopSection,
};