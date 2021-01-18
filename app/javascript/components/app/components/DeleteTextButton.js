import React from 'react';
import styled from "styled-components";
import TextAction from "./TextAction";

const DeleteTextButton = () => {
    return (
        <DeleteTextButtonStyled>
        <TextAction>
            Deletar
        </TextAction>
        </DeleteTextButtonStyled>
    );
};

export default DeleteTextButton;


const DeleteContainer = () => {
    return (
        <DeleteContainerStyled>
            <DeleteContainerHeader>Deseja E</DeleteContainerHeader>
        </DeleteContainerStyled>
    );
};


const DeleteContainerStyled = styled.div`
position: absolute;
top: -1rem;
right: 1rem;
width: 30rem;
background-color: #FFF;
border-radius: 4px;
border: solid .05rem ${({theme}) => theme.borderColor};
box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.1);
padding: 1rem;
`

const DeleteContainerHeader = styled.div`
padding: 1rem;
display: flex;
justify-content: space-between;
`

const DeleteTextButtonStyled = styled.div`
position: relative;
`
