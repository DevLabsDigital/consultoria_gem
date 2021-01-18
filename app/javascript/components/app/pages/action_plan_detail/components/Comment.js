import React, {useState} from 'react';
import {UserImg} from "./UsersContainer";
import SimpleColumn from "../../../components/SimpleColumn";
import {TransparentButton} from "../../../components/buttons/Button";
import styled from "styled-components";
import Title from "../../../components/Title";
import {Column} from "../../../styles/Flex";
import {TextNormal} from "../../../styles/Typography";
import {useDispatch, useSelector} from "react-redux";
import {deleteComment, editComment, handleNewReply} from "../../../store/reducers/actionPlanDetail";
import {formatDateTime} from "../../../util/date_util";
import CommentInput from "../../../components/CommentInput";
import TextAction from "../../../components/TextAction";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


const Comment = ({replies, ...props}) => {
    return (
        <CommentContainer {...props}>
                {
                    replies && replies.map(reply => {
                        return (
                            <CommentContainer key={reply.id} {...reply} isReply />
                                )
                    })
                }
        </CommentContainer>
    );
};

export default Comment;


const CommentContainer = ({id, comment, description, created_at, children, isReply}) => {

    const dispatch = useDispatch()
    const cardId = useSelector(state => state.actionPlanDetail?.item?.cardValue?.id)

    const [reply, setReply] = useState({
        isVisible: false,
        value: '',
    })

    const showReplyInput = () => {
        if (reply.isVisible) {
            handleReply()
            return
        }
        setReply(prev => ({...prev, isVisible: true}))
    }

    const handleReply = () => {
        if (reply.value) {
            dispatch(handleNewReply({value: reply.value, cardId, commentId: id}))
        }

        setReply({
            isVisible: false,
            value: '',
        })
    }

    const handleChangeReplyValue = e => {
        const {value} = e.target
        setReply(prev => {
            return {...prev, value}
        })
    }

    const handleEditing = () => {
        if (editing.value) {
            dispatch(editComment({value: editing.value, cardId, commentId: id}))
        }

        setEditing({
            isVisible: false,
            value: '',
        })
    }

    const handleChangeEditingValue = e => {
        const {value} = e.target
        setEditing(prev => {
            return {...prev, value}
        })
    }

    const [editing, setEditing] = useState({
        isVisible: false,
        value: '',
    })

    const handleEdit = () => {
        if(editing.isVisible) {
            setEditing({
                isVisible: false,
                value: '',
            })
        } else {
            setEditing({
                isVisible: true,
                value: comment || description,
            })
        }
    }

    const handleDelete = () => {
        console.log(cardId, id)
        dispatch(deleteComment({cardId, commentId: id}))
    }

    return (
        <ComentarioContainer key={id} isReply={isReply}>
            <UserImg changePosition={false} src={require('../../../assets/random_person_1.jpg')}/>
            <SimpleColumn>
                <TitleSmall isReply>Amanda - {formatDateTime(created_at)}</TitleSmall>
                {
                    editing.isVisible ? (
                        <CommentInput placeholder={'Faça um comentário...'} value={editing.value}
                                      onChange={handleChangeEditingValue}
                                      confirm={handleEditing}/>
                    ) : (
                        <Description>
                        {comment || description}
                    </Description>)
                }
                <Actions>
                    <TextAction onClick={handleEdit}>{editing.isVisible ? 'Cancelar' : 'Editar'}</TextAction>
                    <TextAction onClick={handleDelete}>Excluir</TextAction>
                </Actions>
                {children}
                {
                    reply.isVisible ? (
                        <ComentarioContainer style={{marginTop: '2rem'}}>
                            <UserImg changePosition={false} src={require('../../../assets/random_person_1.jpg')}/>
                            <CommentInput placeholder={'Faça um comentário...'} value={reply.value}
                                        onChange={handleChangeReplyValue}
                                          confirm={handleReply}/>
                        </ComentarioContainer>
                    ) : null
                }

                {!isReply ? <TransparentButton style={{alignSelf: 'flex-end'}}
                                  onClick={showReplyInput}>Responder</TransparentButton> : null}
            </SimpleColumn>
        </ComentarioContainer>
    )
}


const ComentarioContainer = styled.div`
display: grid;
grid-template-columns: 2.5rem 1fr;
grid-column-gap: 1.65rem;

${({isReply}) => isReply && 'margin-top: 1rem;'};

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
padding: 1.4rem;
margin-top: 1.1rem;
display: block;
word-wrap: anywhere;
span {
margin-bottom: 1.5rem;
}
`

const Actions = styled.div`
margin: .8rem 0;
display: flex;
justify-content: flex-end;
`

const TitleSmall = styled(Title)`
letter-spacing: 0.75px;
${({isReply}) => isReply ? ({
    fontSize: '1.2rem',
    marginBottom: '.2rem',
}) : ({
    fontSize: '1.5rem',
    marginBottom: '.7rem',    
})};
`


const MarkText = styled.span`
font-weight: 500;
color: ${({theme}) => theme.darkColor};
`