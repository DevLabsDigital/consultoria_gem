import React, {useEffect, useState} from 'react';
import BaseModal from "../../../modais/BaseModal";
import {useDispatch, useSelector} from "react-redux";
import Input from "../../../components/Input";
import ModalSimples from "../../action_plan/modais/ModalSimples";
import {closeAddTagModal, handleAddTag} from "../../../store/reducers/actionPlanDetail";
import CreatableSelect from 'react-select/creatable';
import api from "../../../core/network";

const ModalAddTag = () => {

    const {cardValue, modalTag} = useSelector(state => state.actionPlanDetail.item)
    const {visible: isVisible} = modalTag
    const dispatch = useDispatch()
    const [tags, setTags] = useState([])
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        if(isVisible === false) {
            setInputValue(null)
        } else {

        }
    }, [isVisible])


    const closeModal = () => {
        if (isVisible) dispatch(closeAddTagModal())
    }

    const save = () => {
        dispatch(handleAddTag({name: inputValue, cardId: cardValue.id}))
    }

    const handleChange = (newValue) => {
        setInputValue(newValue.value)
    };

    return (
        <BaseModal isVisible={isVisible} closeModal={() => {}} width={'36.8rem'} zIndex={50}>
            <ModalSimples title={'ADICIONAR TAG'} confirm={save}>
                <CreatableSelect
                    isClearable
                    onChange={handleChange}
                    isMulti={false}
                    options={[]}
                />
            </ModalSimples>
        </BaseModal>
    );
};

export default ModalAddTag;
