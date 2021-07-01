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

import {loadActionPlanData} from "../../../store/reducers/actionPlanDetail";
import {
    changeNewCommentValue,
    closeItemModal,
    deleteCardActionPlan,
    deleteTag,
    changeActionPlanCardPosition,
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
import TitleEditor from "../components/TitleEditor";
import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import MySwal from "sweetalert2";
import api from "../../../core/network";
import {HOST_URL} from "../../../util/values_util";
import ptBr from 'date-fns/locale/pt-BR';
registerLocale('pt-BR', ptBr);

const noUser = require('../../../assets/user.png')


const ModalItemQuadro = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [editing, setEditing] = useState(false);
    const [showMostThanThreeHistorics, setShowMostThanThreeHistorics] = useState(false);
    let {visible: isVisible, cardValue, modalChecklist, modalTag, modalUser, newCommentInputValue} = useSelector(state => state.actionPlanDetail.item)
    const dispatch = useDispatch()

    if (!cardValue || !cardValue.attributes) cardValue = {attributes: {checklists: [], tags: [], comments: [], users: []}}

    const {title, description, checklists, tags, comments, users, start_date, created_at, finish_date, date_conclusion, id, list, card_histories} = cardValue.attributes

    const closeModal = () => {
        if (modalChecklist.visible || modalTag.visible || modalUser.visible) return
        
        if (isVisible) dispatch(closeItemModal())
    }

    

    const getFormattedDate = (date) =>{
        if(eval(date)){
            let [year, month, day] = eval(date)?.split('-')
            return new Date(Date.UTC(year, month -1, day -1)) 
        }else{
            startDate
        }
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
        if(list){
            console.log(list.consultoria_board_id)
            //dispatch(loadActionPlanData(list.consultoria_board_id))
        }
        
    }, [cardValue])


    const redefineTitle = (title) =>{
        setEditing(false)
        handleTitle(title)
    }
    const handleTitle = (title) => {
      
        dispatch(editDescription({cardId: cardValue.id, title: title}))
        //setDescriptionValue('')
    }

    const handleDescription = () => {
      
        dispatch(editDescription({cardId: cardValue.id, description: descriptionValue}))
        //setDescriptionValue('')
    }

    const defineDate = async (date) => {
            await api.put(`/${list.id}/cards/${id}`, {
                finish_date: date.toLocaleDateString()
            })
        dispatch(handleOpenCardActionPlan({listId: list.id, cardId: id}))
        handleDescription()
    }

    const redefineStartDate = async (date) => {
        await api.put(`/${list.id}/cards/${id}`, {
            start_date: date.toLocaleDateString()
        })
        dispatch(handleOpenCardActionPlan({listId: list.id, cardId: id}))
    }

    const defineDateConclusion = async (date) => {
            await api.put(`/${list.id}/cards/${id}`, {
                date_conclusion: date.toLocaleDateString()
            })
        dispatch(handleOpenCardActionPlan({listId: list.id, cardId: id}))
    }

    const changePosition = async(event) =>{
        dispatch(changeActionPlanCardPosition({
            data: {id, list_label: event.target.value},
            idToRefresh: list.consultoria_board_id
        }))
       
    }
    

    const getImage = v => {
        if(v == undefined || v == null) return undefined
        if(!v.avatar) return noUser
        return  v.avatar
    }

    return (
        <BaseModal isVisible={isVisible} top={10} width={'60rem'}
                   bodyStyle={{marginBottom: '10rem', transform: 'translateX(-50%)'}}
                   closeModal={closeModal}>
            <ModalHeader style={{marginBottom: 0}}>
                <SimpleRow>
                    <SimpleRow>
                        <DatePicker
                            locale={'pt-BR'}
                            selected={getFormattedDate('start_date')}
                            onChange={redefineStartDate}
                            customInput={<DateContainer description={'DATA DE INICIO'} date={start_date}/>}
                        ></DatePicker>
                        {finish_date ? <DatePicker
                            locale={'pt-BR'}
                            selected={getFormattedDate('finish_date')}
                            onChange={defineDate}
                            customInput={<DateContainer description={'DATA DE CONCLUSAO'} date={finish_date}/>}
                        /> : null}
                        {!finish_date ? <DatePicker
                            locale={'pt-BR'}
                            selected={startDate}
                            onChange={defineDate}
                            customInput={
                                <div>
                                    
                                    <ButtonAddTag style={{marginRight: '20px', marginLeft: '-5px', width: 90, padding: 9}}>
                                        <div>Data Conclusão</div>
                                        <i className={'fa fa-plus-circle'} style={{marginLeft: 10}}></i>
                                    </ButtonAddTag>
                                </div>
                                                    }
                        /> : null}
                        {date_conclusion ? <DatePicker
                            locale={'pt-BR'}
                            selected={getFormattedDate('date_conclusion')}
                            onChange={defineDateConclusion}
                            customInput={<DateContainer description={'2ª DATA DE CONCLUSAO'} date={date_conclusion}/>}
                        /> : null}
                        {!date_conclusion && finish_date ? <DatePicker
                            locale={'pt-BR'}
                            selected={startDate}
                            onChange={defineDateConclusion}
                            customInput={<ButtonAddTag style={{marginRight: '20px', marginLeft: '-5px', width: 90, padding: 9}}>
                            <div>Nova Data</div>
                            <i className={'fa fa-plus-circle'} style={{marginLeft: 10}}></i>
                        </ButtonAddTag>}
                        /> : null}

                    </SimpleRow>
                    <SimpleRow>
                        <UsersContainer 
                            users={users}
                            img1={getImage(users[0])}
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
                        <i className="fa fa-trash"/>
                    </IconContainer>
                    {/* <IconContainer><i className="fa fa-ellipsis-v"/></IconContainer> */}
                </ActionsHeader>
            </ModalHeader>
            <div style={{backgroundColor: statusDict[list?.status]?.color,
                    color: "white",
                    height: 21,
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 8
                
                }}>
                    
                    <SelectCustom id={'select-status'} onChange={changePosition}>
                        {Object.entries(statusDict).map(([key, values])=>{
                            return <CustomOption value={key} selected={key == list?.status}>{values.label}</CustomOption>
                        })}
                        
                    </SelectCustom>
                </div>
            <Body>
                
                <div style={{textAlign: 'center', marginBottom: 16}}>{"Criado em: " + new Date(created_at).toLocaleDateString()}</div>
                <SimpleRow style={{marginBottom: '.8rem', flexWrap: 'wrap',}}>
                    {
                        tags.map((tag, index) => (
                            <Tag key={tag.id} isFirst={index === 0}>{tag.name}<TagCloseIcon
                                onClick={() => handleRemoveTag(tag.id)}/></Tag>
                        ))
                    }
                    <SimpleRow>
                        {!tags.length ? <span style={{color: 'rgb(97, 126, 148)', fontWeight: 'bold'}}>Tag</span> : null}
                        {tags.length == 0 && 
                        <ButtonAddTag style={{marginLeft: !tags.length ? '10px' : 0}} className={'fa fa-plus-circle'} onClick={() => dispatch(openAddTagModal())}/>}
                    </SimpleRow>
                </SimpleRow>
                <Title>
                    <TitleEditor
                        key={title}
                        title={title}
                        editing={editing}
                        setEditing={(value)=> setEditing(value)}
                        redefineTitle={(value)=> redefineTitle(value)}
                    ></TitleEditor>
                </Title>
                <div >
                
                <Description>
                    <Subtitle>Detalhamento / Observações</Subtitle>
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
                    <UserImg changePosition={false} src={props.current_user.avatar}/>
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
                <DividedStyled/>
                <SimpleRow spaceBetween style={{marginBottom: '2rem'}}>
                    <Subtitle>HISTÓRICO DE EDIÇÃO</Subtitle>
                </SimpleRow>
                <div>
                    {card_histories?.data?.map((card_history, i)=>{
                        let {attributes} = card_history

                        return (showMostThanThreeHistorics || i < 3) && <HistoricRow><UserAvatar src={attributes?.user?.avatar}/>{attributes.alteration}</HistoricRow>
                    })}
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                        <IconContainer  onClick={() => setShowMostThanThreeHistorics(!showMostThanThreeHistorics)}>
                        <i className={`fa fa-chevron-${showMostThanThreeHistorics ? "up" : "down"}`}/></IconContainer>
                    </div>
                    
                </div>
            </Body>
        </BaseModal>
    );
};

export default ModalItemQuadro;

const statusDict = {
    scheduled: {
        label: "PREVISTO",
        color: "#617E94"
    },
    delayed: {
        label: "ATRASADO",
        color: "#ED1C24"
    },
    in_progress: {
        label: "EM ANDAMENTO",
        color: "#0099D8"
    },
    completed: {
        label: "CONCLUIDO",
        color: "#009C53"
    }
}

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
const CustomOption = styled.option`
  color: black;
`
const SelectCustom = styled.select`
    -webkit-appearance: none;
    background: transparent;
    border: none;
    color: white;
`
const Body = styled.div`
  padding: 0 4rem 5.6rem;
  ${Column};
`
const UserAvatar = styled.img`
border-radius: 50%;
width: 2.03rem;
height: 2.03rem;
margin-bottom: .2rem;
margin-right: 1rem;
overflow: hidden;
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

const HistoricRow = styled.div`
    margin: 4px 0 3.5px 16.5px;
    font-size: 15px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.75px;
    color: #2a3170;
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

