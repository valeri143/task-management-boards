import styled from 'styled-components'

export const StyledH2 = styled.h2`
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 10px;
`

export const StyledDiv = styled.div`
    border: 1px solid #cecece;
    background: #f6f6f6;
    box-shadow: inset 0px 20px 20px #ffffff;
    border-radius: 5px;
    padding: 20px 15px;
    min-width: 220px;
    min-height: 200px;
    height: 350px;
    overflow-y: auto;
    transition: all 0.3s ease;
    &:hover, &:focus {
    box-shadow: inset 0px -20px 20px #ffffff;
};
`

export const StyledButton = styled.button`
    border: 1px solid #cecece;
    background: #f6f6f6;
    box-shadow: inset 0px 20px 20px #ffffff;
    border-radius: 5px;
    padding: 10px 5px 5px 10px;
    width: 216px;
    height: 110px;
    margin-bottom: 20px;
    transition: all 0.3s ease;
    &:hover, &:focus {
    box-shadow: inset 0px -20px 20px #ffffff;
    }
`