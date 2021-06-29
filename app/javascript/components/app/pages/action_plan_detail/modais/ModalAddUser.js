import React, {useEffect, useState} from 'react';
import BaseModal from "../../../modais/BaseModal";
import {useDispatch, useSelector} from "react-redux";
import ModalSimples from "../../action_plan/modais/ModalSimples";
import {closeAddUserModal, handleAddUser, handleDeleteUser} from "../../../store/reducers/actionPlanDetail";
import api from "../../../core/network";
import Select from "react-select";
import CheckboxRow from "../../../components/CheckboxRow";
import styled,{css} from "styled-components";

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

    const removeUser = (user) =>{
        dispatch(handleDeleteUser({userId: user.id, cardId: cardValue.id}))
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
            {<TagContainer>
                {
                    cardValue?.attributes?.users?.map(user => (
                        <TagLine>    
                            <img src={user.avatar} 
                                style={{width: 21, height: 21, borderRadius: 20, overflow: 'hidden', border: 'none'}}/>
                            <div>
                                {user.name}
                                <i onClick={()=> removeUser(user)} style={{marginLeft: 10, cursor: 'pointer', fontSize: 14}} className={'fa fa-trash'}></i>
                            </div>
                                
                        </TagLine>
                    ))
                }
            </TagContainer>}
        </BaseModal>
    );
};

export default ModalAddUser;
export const TextNormal = css`
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
`
export const Row = css`
    display: flex;
    align-items: center;
`

const TagContainer = styled.div`
    padding: 0 35px 35px;
    background: white;
`

const TagLine = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.4rem;
    ${TextNormal};
    line-height: 1.12;
    letter-spacing: 0.7px;
    height: 2.2rem;
    ${Row};
    padding: 0 .7rem;
    background-color: #617e94;
    border-radius: .5rem;
    color: ${({theme}) => theme.white};
    margin-bottom: 1rem;
    opacity: ${({isDisabled}) => isDisabled ? '.3' : '1'};
    white-space: nowrap;
    height: 32px;
    text-transform: uppercase;
    font-size: 11px;
`