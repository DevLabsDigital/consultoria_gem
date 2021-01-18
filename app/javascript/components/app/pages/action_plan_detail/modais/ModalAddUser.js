import React, {useEffect, useState} from 'react';
import BaseModal from "../../../modais/BaseModal";
import {useDispatch, useSelector} from "react-redux";
import ModalSimples from "../../action_plan/modais/ModalSimples";
import {closeAddUserModal, handleAddUser} from "../../../store/reducers/actionPlanDetail";
import api from "../../../core/network";
import Select from "react-select";

const ModalAddUser = () => {

    const {cardValue, modalUser} = useSelector(state => state.actionPlanDetail.item)
    const {visible: isVisible} = modalUser
    const dispatch = useDispatch()

    const [userSelected, setUserSelected] = useState(null)
    const [usersList, setUsersList] = useState([])

    useEffect(() => {
        if (isVisible === false) {
            setUserSelected(null)
        } else {
            api.get('/users').then(response => {
                setUsersList(response.data.data)
            })
        }
    }, [isVisible])

    const save = () => {
        dispatch(handleAddUser({userIds: [userSelected], cardId: cardValue.id}))
    }

    return (
        <BaseModal isVisible={isVisible} closeModal={(e) => {
            if(isVisible && !e?.target?.id.includes('react-select')) {
                dispatch(closeAddUserModal())
            }
        }} width={'36.8rem'} zIndex={50}>
            <ModalSimples title={'ADICIONAR NOVO USUARIO'} confirm={save}>
                <Select
                    onChange={v => setUserSelected(v?.value)}
                    isMulti={false}
                    options={usersList && usersList.length ? usersList.map(user => ({label: user.attributes.name, value: user.id})) : []}
                />
            </ModalSimples>
        </BaseModal>
    );
};

export default ModalAddUser;
