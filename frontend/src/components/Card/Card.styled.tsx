import styled from 'styled-components';

export const StyledDiv = styled.div`
    text-align: left;
    border: 1px solid #cecece;
    background: #f6f6f6;
    box-shadow: inset 0px 20px 20px #ffffff;
    border-radius: 5px;
    padding: 10px 5px 5px 10px;
    min-width: 100px;
    min-height: 100px;
    margin-bottom: 20px;
    transition: all 0.3s ease;
    &:hover, &:focus {
    box-shadow: inset 0px -20px 20px #ffffff;
    }
`

export const StyledH3 = styled.h3`
    margin-bottom: 5px;  
`

export const StyledP = styled.p`
    font-weight: 350;
    margin-bottom: 20px;
    ;
`
export const StyledSvgDiv = styled.div`
    display: flex;
    gap: 6px;
    justify-content: flex-end;
`