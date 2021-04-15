import React, {useEffect, useState} from 'react';
import BaseModal from "../../../modais/BaseModal";
import {useDispatch, useSelector} from "react-redux";
import ModalSimples from "../../action_plan/modais/ModalSimples";
import {closeAddUserModal, handleAddUser} from "../../../store/reducers/actionPlanDetail";
import api from "../../../core/network";
import Select from "react-select";
import CheckboxRow from "../../../components/CheckboxRow";

const ModalAddUser = () => {

    const {cardValue, modalUser} = useSelector(state => state.actionPlanDetail.item)
    const {visible: isVisible} = modalUser
    const dispatch = useDispatch()

    const [userSelected, setUserSelected] = useState(null)
    const [usersList, setUsersList] = useState([])
    const [isMainUser, setIsMainUser] = useState(false)

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
        dispatch(handleAddUser({userIds: [userSelected], cardId: cardValue.id, isMainUser}))
        setIsMainUser(false)
        
    }

    return (
        <BaseModal isVisible={isVisible} closeModal={(e) => {
            if(isVisible && !e?.target?.id.includes('react-select')) {
                dispatch(closeAddUserModal())
            }
        }} width={'36.8rem'} zIndex={50}>
            <ModalSimples title={'ADICIONAR NOVO USUÁRIO'} confirm={save}>
                <Select
                    onChange={v => setUserSelected(v?.value)}
                    isMulti={false}
                    options={usersList && usersList.length ? usersList.map(user => ({label: user.attributes.name, value: user.id})) : []}
                />
                
                <CheckboxRow label={'Lider'} checked={isMainUser}  onChange={(value)=> {setIsMainUser(value)}}/>
            </ModalSimples>
        </BaseModal>
    );
};

export default ModalAddUser;
