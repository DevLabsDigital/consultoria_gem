import React, {useEffect, useState} from 'react';
import BaseModal from "../../../modais/BaseModal";
import {useDispatch, useSelector} from "react-redux";
import Input from "../../../components/Input";
import ModalSimples from "../../action_plan/modais/ModalSimples";
import {closeAddTagModal, handleAddTag, removeTag, updateTag} from "../../../store/reducers/actionPlanDetail";
import CreatableSelect from 'react-select/creatable';
import api from "../../../core/network";
import styled,{css} from "styled-components";
import EditableTag from '../../../pages/action_plan_detail/components/EditableTag'

const ModalAddTag = () => {

    const {cardValue, modalTag} = useSelector(state => state.actionPlanDetail.item)
    const {visible: isVisible} = modalTag
    const [editingTitle, setEditingTitle] = useState(false);
    const dispatch = useDispatch()
    const [editModalIsVisible, setEditModalIsVisible] = useState(false)
    //const [tags, setTags] = useState([])
    const {tags} = useSelector(state => state.actionPlanDetail)
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
        dispatch(handleAddTag({name: inputValue, cardId: cardValue?.id, withoutCard: modalTag?.withoutCard}))
    }
    
    const destroyTag = (id) => {
        dispatch(removeTag({id}))
    }

    const saveTagName = (id, name)=>{
        dispatch(updateTag({id, name}))
        setEditingTitle(false)
    }

    const handleChange = (newValue) => {
        setInputValue(newValue.value)
    };

    const renderEditButtons = (id) =>{
        return <div style={{display: editingTitle == id ? "none" : "block"}}>
                <Icon className={'fa fa-edit'} onClick={()=> setEditingTitle(id)} />
                <Icon onClick={()=> destroyTag(id)} className={'fa fa-close'} />
            </div>
        
    }

    return (
        <BaseModal isVisible={isVisible} closeModal={closeModal} width={'36.8rem'} zIndex={50}>
            <ModalSimples title={'ADICIONAR TAG'} confirm={save}>
                <CreatableSelect
                    formatCreateLabel={(label)=> `Criar '${label}'`}
                    noOptionsMessage={()=> "Nenhuma tag corresponde a pesquisa"}
                    placeholder={'Pesquisa de tags'}
                    isClearable
                    onChange={handleChange}
                    isMulti={false}
                    options={tags.map(({attributes})=> ({label: attributes.name, value: attributes.name}))}
                />
                
            </ModalSimples>
            {modalTag?.withoutCard && <TagContainer>
                {
                    tags.map(tag => (
                        <TagLine>    
                            <EditableTag
                            CustomTitle={LimitedSpan}
                            editing={editingTitle == tag.id}
                            redefineTitle={(value)=> saveTagName(tag.id, value)}
                            title={tag?.attributes?.name}
                            >{tag?.attributes?.name}</EditableTag>
                            
                            {renderEditButtons(tag.id)}
                            
                        </TagLine>
                    ))
                }
            </TagContainer>}
            
        </BaseModal>
    );
};

export default ModalAddTag;

const LimitedSpan = styled.span`
    padding: 4px 10px;
`

export const Icon = styled.i`
    margin: 0 8px;
    cursor: pointer;
`
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

