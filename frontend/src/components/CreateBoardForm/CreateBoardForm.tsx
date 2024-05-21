import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { StyledForm } from "./CreateBoardForm.styled";
import { StyledErrorMessage, StyledField } from "../EditModal/EditModal.styled";
import { StyledButton } from "../CustomModal/CustomModal.styled";

const CreateBoardForm = ({ handleCreateBoard }: { handleCreateBoard: (values: { name: string }, { resetForm }: { resetForm: () => void }) => void }) => {
    return (
        <Formik
        initialValues={{ name: '' }}
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
        })}
        onSubmit={handleCreateBoard}
      >
        <StyledForm>
            <StyledField name="name" type="text" placeholder="Board name" />
            <StyledButton type="submit">Create Board</StyledButton>
            <StyledErrorMessage name="name" component="div" />
        </StyledForm>
      </Formik>
    );
};

export default CreateBoardForm;