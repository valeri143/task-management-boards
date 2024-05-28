import styled from "styled-components";
import {Field, Form, ErrorMessage } from 'formik';

export const StyledForm = styled(Form)`
    display: flex;
    gap: 15px;
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 30px;
`;

export const StyledField = styled(Field)`
    min-width: 180px;
	font-size: 13px;
	padding: 12px 0 8px 12px;
	border: 1px solid #cecece;
	background: #F6F6f6;
	border-radius: 8px;
    @media (min-width: 680px) {
        width: 300px;
    }
`;

export const StyledButton = styled.button`
    font-weight: bold;
	border: 1px solid #cecece;
	background: #f6f6f6;
	box-shadow: inset 0px 20px 20px #ffffff;
	border-radius: 8px;
	padding: 9.5px 8px;
	width: 120px;
    transition: all 0.3s ease;
    &:hover, &:focus {
        box-shadow: inset 0px -20px 20px #ffffff;
    };
    &:active {
        margin-top: 1px;
	    margin-bottom: -1px;
	    scale: 1.2;
    };
`;

export const StyledErrorMessage = styled(ErrorMessage)`
    font-weight: bold;
    text-align: left;
    color: red;
`

export {};