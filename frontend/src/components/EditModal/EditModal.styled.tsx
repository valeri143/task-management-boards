import styled from "styled-components";
import { Form, Field, ErrorMessage } from 'formik';
import { fadeIn } from "../CustomModal/CustomModal.styled";

export const StyledForm = styled(Form)`
  margin-top: 2px;
  margin-left: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.5s cubic-bezier(.17,.67,.83,.67);
`;

export const StyledField = styled(Field)`
  margin: 10px;
  padding: 10px;
  width: 80%;
`;

export const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  margin: 5px 0;
`;