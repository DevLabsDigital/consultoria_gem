import React, {useEffect, useState} from 'react';
import BaseModal from "../../../modais/BaseModal";
import {useDispatch, useSelector} from "react-redux";
import Input from "../../../components/Input";
import ModalSimples from "../../action_plan/modais/ModalSimples";
import {closeNewCardModal, createNewCardActionPlan} from "../../../store/reducers/actionPlanDetail";
import {listBoardRequest} from "../../../store/reducers/actionPlan";
const ModalNewCard = () => {

    const {visible: isVisible, listId, boardId} = useSelector(state => state.actionPlanDetail.newCard)
    const dispatch = useDispatch()

    const closeModal = () => {
        if (isVisible) dispatch(closeNewCardModal())
    }

    const [inputValue, setInputValue] = useState('')
    useEffect(() => {
        if(isVisible === false) setInputValue('')
    }, [isVisible])

    const save = () => {
        dispatch(createNewCardActionPlan({title: inputValue, listId, boardId}))
    }

    return (
        <BaseModal isVisible={isVisible} closeModal={closeModal} width={'36.8rem'}>
            <ModalSimples title={'ADICIONAR TAREFA'} confirm={save}>
                <Input placeholder={'Defina um nome'} label={'Nome da tarefa'} value={inputValue}
                       onChange={e => setInputValue(e.target.value)}/>
            </ModalSimples>
        </BaseModal>
    );
};

export default ModalNewCard;