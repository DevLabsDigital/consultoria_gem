import React from 'react';
import styled from "styled-components";
import {TextNormal} from "../../../styles/Typography";
import {AddButton} from "../../../components/buttons/Button";
import {Row} from "../../../styles/Flex";

const ModalSimples = ({title, confirm, children, isEditing}) => {
    return (
        <ModalContainer>
            <ModalTitle>{title}</ModalTitle>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
                <AddButton label={isEditing ? 'Salvar' : 'Adicionar'} onClick={confirm}/>
            </ModalFooter>
        </ModalContainer>
    );
};

export default ModalSimples;

const ModalContainer = styled.div`
padding: 3.2rem 3.7rem;
background-color: ${({theme}) => theme.white};
`

const ModalTitle = styled.div`
margin-bottom: 3.8rem;
${TextNormal};
font-size: 1.2rem;
color: ${({theme}) => theme.blueLight};
font-weight: 500;
letter-spacing: 0.6px;
`

const ModalBody = styled.div`

`

const ModalFooter = styled.div`
${Row};
justify-content: flex-end;
margin-top: 2rem;
`