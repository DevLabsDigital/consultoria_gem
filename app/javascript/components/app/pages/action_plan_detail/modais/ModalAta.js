import React from 'react';
import BaseModal from "../../../modais/BaseModal";
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components'
import {Column, Row} from "../../../styles/Flex";
import SimpleRow from "../../../components/SimpleRow";
import {
    closeItemModal,
} from "../../../store/reducers/actionPlanDetail";

import "react-datepicker/dist/react-datepicker.css";



const ModalAta = () => {
    let {visible: isVisible} = useSelector(state => state.actionPlanDetail.item)
    const dispatch = useDispatch()


    const closeModal = () => {
        if (isVisible) dispatch(closeItemModal())
    }

    return (
        <BaseModal isVisible={isVisible} top={10} width={'60rem'}
                   bodyStyle={{marginBottom: '10rem', transform: 'translateX(-50%)'}}
                   closeModal={closeModal}>
            <ModalHeader>
                <SimpleRow>

                </SimpleRow>
            </ModalHeader>
            <Body>

            </Body>
        </BaseModal>
    );
};

export default ModalAta;

const ModalHeader = styled.div`
  padding: 3rem 2.5rem;
  ${Row};
  justify-content: space-between;
  background-color: #fff;
`

const Body = styled.div`
  ${Column};
`

