import React, {useEffect, useState} from 'react';
import BaseModal from "../../../modais/BaseModal";
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components'
import {Column, Row} from "../../../styles/Flex";
import UsersContainer, {UserImg} from "../components/UsersContainer";
import IconContainer from "../components/IconContainer";
import Title from "../../../components/Title";
import {TextNormal} from "../../../styles/Typography";
import Divider from "../../../components/Divider";
import SimpleRow from "../../../components/SimpleRow";
import {
    changeNewCommentValue,
    closeItemModal,
    deleteCardActionPlan,
    deleteTag,
    editDescription,
    handleNewCommentRequest,
    handleOpenCardActionPlan,
    openAddChecklistModal,
    openAddTagModal,
    openCopyCardModal,
} from "../../../store/reducers/actionPlanDetail";
import Comment from "../components/Comment";
import Checklist from "../components/Checklist";
import CommentInput from "../../../components/CommentInput";
import DateContainer from "../components/DateContainer";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import MySwal from "sweetalert2";
import api from "../../../core/network";
import {HOST_URL} from "../../../util/values_util";

const noUser = require('../../../assets/user.png')


const ModalItemQuadro = () => {
    const [startDate, setStartDate] = useState(new Date());

    let {visible: isVisible, cardValue, modalChecklist, modalTag, modalUser, newCommentInputValue} = useSelector(state => state.actionPlanDetail.item)
    const dispatch = useDispatch()

    if (!cardValue || !cardValue.attributes) cardValue = {attributes: {checklists: [], tags: [], comments: [], users: []}}

    const {title, description, checklists, tags, comments, users, start_date, finish_date, date_conclusion, id, list} = cardValue.attributes

    const closeModal = () => {
        if (modalChecklist.visible || modalTag.visible || modalUser.visible) return

        if (isVisible) dispatch(closeItemModal())
    }


    const handleRemoveTag = tagId => {
        dispatch(deleteTag({consultoria_tag_id: tagId, cardId: cardValue.id}))
    }

    const changeNewCommentInputValue = (e) => {
        dispatch(changeNewCommentValue(e))
    }

    const handleNewComment = () => {
        dispatch(handleNewCommentRequest({cardId: cardValue.id, value: newCommentInputValue}))
    }

    const [descriptionValue, setDescriptionValue] = useState('')

    useEffect(() => {
        setDescriptionValue(description || "")
    }, [cardValue])

    const handleDescription = () => {
      
        dispatch(editDescription({cardId: cardValue.id, description: descriptionValue}))
        //setDescriptionValue('')
    }

    const defineDate = async (date) => {
            await api.put(`/${list.id}/cards/${id}`, {
                finish_date: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
            })
        dispatch(handleOpenCardActionPlan({listId: list.id, cardId: id}))
    }

    const defineDateConclusion = async (date) => {
            await api.put(`/${list.id}/cards/${id}`, {
                date_conclusion: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
            })
        dispatch(handleOpenCardActionPlan({listId: list.id, cardId: id}))
    }

    const getImage = v => {
        if(v == undefined || v == null) return undefined
        if(!v.avatar) return noUser
        return HOST_URL + v.avatar
    }

    return (
        <BaseModal isVisible={isVisible} top={10} width={'60rem'}
                   bodyStyle={{marginBottom: '10rem', transform: 'translateX(-50%)'}}
                   closeModal={closeModal}>
            <ModalHeader>
                <SimpleRow>
                    <SimpleRow>
                        <DateContainer description={'DATA DE INICIO'} date={start_date}/>
                        {finish_date ? <DatePicker
                            selected={startDate}
                            onChange={defineDate}
                            customInput={<DateContainer description={'DATA DE CONCLUSAO'} date={finish_date}/>}
                        /> : null}
                        {!finish_date ? <DatePicker
                            selected={startDate}
                            onChange={defineDate}
                            customInput={<ButtonAddTag className={'fa fa-plus-circle'}
                                                       style={{marginRight: '20px', marginLeft: '-5px'}}/>}
                        /> : null}
                        {date_conclusion ? <DatePicker
                            selected={startDate}
                            onChange={defineDateConclusion}
                            customInput={<DateContainer description={'2ª DATA DE CONCLUSAO'} date={date_conclusion}/>}
                        /> : null}
                        {!date_conclusion && finish_date ? <DatePicker
                            selected={startDate}
                            onChange={defineDateConclusion}
                            customInput={<ButtonAddTag className={'fa fa-plus-circle'}
                                                       style={{marginRight: '20px', marginLeft: '-5px'}}/>}
                        /> : null}

                    </SimpleRow>
                    <SimpleRow>
                        <UsersContainer img1={getImage(users[0])}
                                        img2={getImage(users[1])}
                                        img3={getImage(users[2])}/>
                    </SimpleRow>
                </SimpleRow>
                <ActionsHeader>
                    <IconContainer onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        dispatch(openCopyCardModal({listId: list.id, cardId: id}))
                    }}><i className="fa fa-clone"/></IconContainer>
                    <IconContainer onClick={(e) => {
                        e.stopPropagation()
                        MySwal.fire({
                            title: 'Tem certeza que deseja deletar este registro?',
                            icon: 'warning',
                            showCancelButton: true,
                            showConfirmButton: true,
                            confirmButtonColor: 'red',
                            confirmButtonText: 'Excluir',
                            cancelButtonText: 'Cancelar'
                        }).then((v) => {
                            if (v.isConfirmed) {
                                dispatch(deleteCardActionPlan({listId: list.id, cardId: id, boardId: list.board_id}))
                            }
                        })
                    }}>
                        <i className="fa fa-trash-alt"/>
                    </IconContainer>
                    <IconContainer><i className="fa fa-ellipsis-v"/></IconContainer>
                </ActionsHeader>
            </ModalHeader>
            <Body>
                <SimpleRow style={{marginBottom: '.8rem', flexWrap: 'wrap',}}>
                    {
                        tags.map((tag, index) => (
                            <Tag key={tag.id} isFirst={index === 0}>{tag.name}<TagCloseIcon
                                onClick={() => handleRemoveTag(tag.id)}/></Tag>
                        ))
                    }
                    <SimpleRow>
                        {!tags.length ? <span style={{color: 'rgb(97, 126, 148)', fontWeight: 'bold'}}>Tag</span> : null}
                        <ButtonAddTag style={{marginLeft: !tags.length ? '10px' : 0}} className={'fa fa-plus-circle'} onClick={() => dispatch(openAddTagModal())}/>
                    </SimpleRow>
                </SimpleRow>
                <Title>{title}</Title>
                <div >
                
                <Description>
                    <Subtitle>DESCRIÇÃO</Subtitle>
                    <CommentInput needFocus placeholder={''} value={descriptionValue}
                                  onChange={(e) => setDescriptionValue(e.target.value)}
                                  confirm={handleDescription}/>
                </Description>
                </div>
                <DividedStyled/>
                <SimpleRow spaceBetween style={{marginBottom: '2rem'}}>
                    <Subtitle>CHECKLIST DE ATIVIDADES</Subtitle>
                    <SimpleRow>
                    {!checklists.length ? <span style={{color: 'rgb(97, 126, 148)', fontWeight: 'bold'}}>Checklist</span> : null}
                    <IconContainer style={{marginLeft: !checklists.length ? '10px' : 0}} onClick={() => dispatch(openAddChecklistModal())}>
                        <i className="fa fa-plus-circle"/></IconContainer>
                    </SimpleRow>
                </SimpleRow>
                {
                    checklists.map(item => (
                            <Checklist item={item} cardId={cardValue.id}/>
                        )
                    )
                }
                <Divider style={{margin: '3.8rem 0'}}/>
                <Subtitle>COMENTÁRIOS</Subtitle>
                <ComentarioContainer style={{margin: '2rem 0 4.2rem'}}>
                    <UserImg changePosition={false} src={require('../../../assets/random_person_1.jpg')}/>
                    <CommentInput placeholder={'Faça um comentário...'} value={newCommentInputValue}
                                  onChange={(e) => changeNewCommentInputValue(e.target.value)}
                                  confirm={handleNewComment}/>
                </ComentarioContainer>

                {
                    comments.map(comment => {
                        return (
                            <Comment key={comment.id} {...comment} />
                        )
                    })
                }
            </Body>
        </BaseModal>
    );
};

export default ModalItemQuadro;

const ModalHeader = styled.div`
  padding: 2rem 4rem;
  ${Row};
  justify-content: space-between;
  border-bottom: .1rem solid ${({theme}) => theme.borderColor};
  margin-bottom: 3rem;
`

const ActionsHeader = styled.div`
  ${Row};

  ${IconContainer} {
    margin-right: 1rem;
  }
`

const Body = styled.div`
  padding: 0 4rem 5.6rem;
  ${Column};
`

const Subtitle = styled.span`
  ${TextNormal};
  letter-spacing: 0.5px;
  font-size: 1rem;
  font-weight: 500;
  color: #2f2f2f;
  margin-bottom: 0;
`

const Description = styled.div`
  ${Column};
  ${TextNormal};
  font-size: 1.5rem;
  font-weight: 300;
  line-height: 1.12;
  letter-spacing: 0.75px;
  color: ${({theme}) => theme.darkColor};
  background-color: ${({theme}) => theme.contentBackgroundColor};
  padding: 2rem;
  margin-top: 1.1rem;
  word-wrap: anywhere;

`

const ComentarioContainer = styled.div`
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  grid-column-gap: 1.65rem;
`

const DividedStyled = styled(Divider)`
  margin: 2.7rem 0 4rem 0;
`


const ButtonAddTag = styled.div`
  ${Row};
  justify-content: center;
  align-items: center;
  color: ${({theme}) => theme.darkColor};
  border-radius: .25rem;
  width: 2rem;
  height: 2rem;
  background-color: #eaeaea;
  cursor: pointer;
  margin-bottom: .5rem;
`

const TagCloseIcon = styled.div.attrs(() => ({
    children: <i className="fa fa-times"/>,
}))`
  position: absolute;
  width: 2rem;
  height: 100%;
  top: 0;
  right: 0;
  border-radius: 2.5px;
  background-color: ${({theme}) => theme.red};
  color: ${({theme}) => theme.white};
  cursor: pointer;
  ${Row};
  justify-content: center;
  opacity: 0;
  transition: all .3s;
`

const Tag = styled.div`
  height: 2rem;
  ${Row};
  padding: 0 3rem 0 1rem;
  white-space: nowrap;
  background-color: ${({theme, isFirst}) => isFirst ? theme.darkColor : '#eaeaea'};
  color: ${({theme, isFirst}) => isFirst ? theme.white : theme.darkColor};
  ${TextNormal};
  font-weight: 500;
  letter-spacing: 0.46px;
  margin-right: 1.2rem;
  border-radius: 2.5px;
  position: relative;
  margin-bottom: .5rem;

  &:hover {
    ${TagCloseIcon} {
      opacity: 1;
      transition: all .3s;
    }
  }
`

