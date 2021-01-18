import React, {useEffect, useState} from 'react';
import BaseModal from "../../../modais/BaseModal";
import {useDispatch, useSelector} from "react-redux";
import {closeNewPlanModal, createNewActionPlan} from "../../../store/reducers/actionPlan";
import ModalSimples from "./ModalSimples";
import Input from "../../../components/Input";

const ModalNovoPlanoAcao = () => {

    const {modalNewPlanVisible: isVisible, modalActionPlanData: data} = useSelector(state => state.actionPlan)
    const dispatch = useDispatch()

    const closeModal = () => {
        if (isVisible) dispatch(closeNewPlanModal())
    }

    const [inputValue, setInputValue] = useState('')
    useEffect(() => {
        if(isVisible === false) {
            setInputValue('')
        } else if(data != null) {
            setInputValue(data.title)
        }

    }, [isVisible])

    const save = () => {
        dispatch(createNewActionPlan({title: inputValue, id: data?.id}))
    }

    return (
        <BaseModal isVisible={isVisible} closeModal={closeModal} width={'36.8rem'}>
            <ModalSimples title={data?.id ? 'SALVAR TAREFA' : 'ADICIONAR TAREFA'} confirm={save} isEditing={data?.id}>
                <Input placeholder={'Defina um nome'} label={'Nome da tarefa'} value={inputValue}
                       onChange={e => setInputValue(e.target.value)}/>
            </ModalSimples>
        </BaseModal>
    );
};

export default ModalNovoPlanoAcao;