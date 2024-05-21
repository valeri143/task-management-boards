import styled,{ keyframes } from "styled-components";

export const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 999,
    },
  };

export const StyledP = styled.p`
  margin-bottom: 15px;
`

export const StyledButton = styled.button`
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  transition: all 0.3s ease;
  &:hover {
    background-color: #0056b3;
    scale: 1.1;
  }
`
export const fadeIn = keyframes`
  from {
    opacity: 0;
    scale: 0.5;
  }
  to {
    opacity: 1;
    scale: 1;
  }
`;

export const StyledDiv = styled.div`
  text-align: center;
  animation: ${fadeIn} 0.3s ease;
`
