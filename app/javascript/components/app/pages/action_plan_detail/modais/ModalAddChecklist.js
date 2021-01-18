import React, {useEffect, useState} from 'react';
import BaseModal from "../../../modais/BaseModal";
import {useDispatch, useSelector} from "react-redux";
import Input from "../../../components/Input";
import ModalSimples from "../../action_plan/modais/ModalSimples";
import {closeAddChecklistModal, handleAddNewCheckList} from "../../../store/reducers/actionPlanDetail";

const ModalAddChecklist = () => {

    const {cardValue, modalChecklist} = useSelector(state => state.actionPlanDetail.item)
    const {visible: isVisible} = modalChecklist
    const dispatch = useDispatch()

    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if(isVisible === false) setInputValue('')
    }, [isVisible])


    const closeModal = () => {
        if (isVisible) dispatch(closeAddChecklistModal())
    }

    const save = () => {
        dispatch(handleAddNewCheckList({title: inputValue, cardId: cardValue.id}))
    }

    return (
        <BaseModal isVisible={isVisible} closeModal={closeModal} width={'36.8rem'} zIndex={50}>
            <ModalSimples title={'ADICIONAR CHECKLIST'} confirm={save}>
                <Input placeholder={'Defina um nome'} label={'Nome do checklist'} value={inputValue}
                       onChange={e => setInputValue(e.target.value)}/>
            </ModalSimples>
        </BaseModal>
    );
};

export default ModalAddChecklist;