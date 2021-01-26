import React, {useEffect, useState} from 'react';
import BaseModal from "../../../modais/BaseModal";
import {useDispatch, useSelector} from "react-redux";
import Input from "../../../components/Input";
import ModalSimples from "../../action_plan/modais/ModalSimples";
import {closeCopyCardModal, copyCard} from "../../../store/reducers/actionPlanDetail";
import Select from "../../../components/Select";

const ModalCopyCard = () => {

    const {cardId, listId, visible: isVisible} = useSelector(state => state.actionPlanDetail.modalCopyCard)
    const dispatch = useDispatch()

    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if(isVisible === false) setInputValue('')
    }, [isVisible])


    const closeModal = () => {
        if (isVisible) dispatch(closeCopyCardModal())
    }

    const save = () => {
        dispatch(copyCard({cardId, listId, value: {id: cardId, title: inputValue, saddlebag_list_id: listId}}))
    }

    return (
        <BaseModal isVisible={isVisible} closeModal={closeModal} width={'36.8rem'} zIndex={50}>
            <ModalSimples title={'COPIAR TAREFA'} confirm={save}>
                <Input placeholder={'Defina um nome'} label={'Nome da tarefa'} value={inputValue}
                       onChange={e => setInputValue(e.target.value)}/>
                       <div style={{marginTop: '2rem'}}>
                       <Select label={'Defina a lista'}>
                           <option>Previsto</option>
                           <option>Em andamento</option>
                           <option>Atrasado</option>
                           <option>Concluido</option>
                       </Select>
                       </div>
            </ModalSimples>
        </BaseModal>
    );
};

export default ModalCopyCard;