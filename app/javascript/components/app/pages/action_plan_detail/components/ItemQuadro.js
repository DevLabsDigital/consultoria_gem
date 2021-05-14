import React from 'react';
import styled from "styled-components";
import {Column} from "../../../styles/Flex";
import SimpleColumn from "../../../components/SimpleColumn";
import {TextNormal} from "../../../styles/Typography";
import SimpleRow from "../../../components/SimpleRow";
import {Draggable} from "react-beautiful-dnd";
import {TipoFiltroFechamentoDoResultado} from "../../../components/TiposCausaRazao";
import {handleOpenCardActionPlan, openCopyCardModal} from '../../../store/reducers/actionPlanDetail'
import {useDispatch} from "react-redux";
import UsersContainer from "./UsersContainer";
import IconContainer from "./IconContainer";
import {addZero, HOST_URL} from "../../../util/values_util";
import MySwal from "sweetalert2";

const noUser = require('../../../assets/user.png')

const ItemQuadro = ({value, listId, index, remove}) => {

    const dispatch = useDispatch()

    const {title, description, prazoDecorrido, users, images, tags} = value

    const getImage = v => {
        if(v == undefined || v == null) return undefined
        if(!v.avatar) return noUser
        return  v.avatar
    }

    const formattedData = (date)=>{
        return new Date(Date.UTC(...date.split('-'))).toLocaleDateString()
    }

    return (
        <Draggable draggableId={value.id} index={index}>
            {
                (provided, snapshot) => (
                    <div ref={provided.innerRef}
                         {...provided.draggableProps}
                         {...provided.dragHandleProps}
                         onClick={() => dispatch(handleOpenCardActionPlan({listId, cardId: value.id}))}
                    >
                        <ItemQuadroContainer isDragging={snapshot.isDragging}>
                            {tags?.length ? <TipoFiltroFechamentoDoResultado label={tags[0].name}/> : null}
                            <SubContainer>
                                <SimpleColumn>
                                    <Title>{title}</Title>
                                    <Content>{description}</Content>
                                </SimpleColumn>
                                <SimpleColumn>
                                    <IconContainerStyled onClick={(e) => {
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
                                                remove(listId, value.id)
                                            }
                                        })
                                    }}>
                                        <i className="fa fa-trash"/>
                                    </IconContainerStyled>
                                    <IconContainerStyled onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        dispatch(openCopyCardModal({listId, cardId: value.id}))
                                    }}><i className="fa fa-clone"/></IconContainerStyled>
                                </SimpleColumn>
                            </SubContainer>
                            <Footer>
                                <UsersContainer img1={getImage(users[0])}
                                                img2={getImage(users[1])}
                                                img3={getImage(users[2])}/>
                                <SimpleRow>
                                    <IconAndLabel><i className="fa fa-paperclip"/> {images.length}</IconAndLabel>
                                    <IconAndLabel><i
                                        className="fa fa-comment-dots"/> {addZero(value.comments?.length || 0)}
                                    </IconAndLabel>
                                    {value.finish_date ?
                                        <DateContainer prazoDecorrido={prazoDecorrido}>
                                            <i className="fa fa-calendar-alt"/>
                                            {formattedData(value.finish_date)}
                                        </DateContainer>
                                        : null
                                    }
                                </SimpleRow>
                            </Footer>
                        </ItemQuadroContainer>
                    </div>
                )
            }
        </Draggable>
    );
};

export default ItemQuadro;

const ItemQuadroContainer = styled.div`
                ${Column};
                background-color: ${({theme}) => theme.bodyBackgroundColor};
                padding: 2rem 1.7rem 1.4rem;
                user-select: none;
                margin-bottom: 1.5rem;
                ${({isDragging}) => isDragging ? ({
    transform: 'rotate(-10deg)',
    transition: 'all .2s',
}) : ({transition: 'all .2s',})};
                `


const SubContainer = styled.div`
                display: grid;
                grid-template-columns: 1fr 2.5rem;
                grid-column-gap: 1rem;
                `

const Title = styled.h1`
                font-size: 1.8rem;
                font-weight: 500;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.05;
                letter-spacing: 0.9px;
                color: ${({theme}) => theme.blueDark};
                text-align: left;
                `


const IconContainerStyled = styled(IconContainer)`
                margin-top: 1rem;
                `

const Content = styled.span`
                font-size: 1.5rem;
                font-weight: 300;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.12;
                letter-spacing: 0.75px;
                color: ${({theme}) => theme.darkColor};
                margin-top: .6rem;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 4;
                -webkit-box-orient: vertical;
                max-height: 93px;
                `

const Footer = styled(SimpleRow)`
                justify-content: space-between;
                padding-top: 1rem;
                height: 3.6rem;
                border-top: 0.4px solid rgba(210,210,210,0.8);
                margin-top: 1.3rem;
                `

const IconAndLabel = styled.div`
                color: ${({theme}) => theme.darkColor};
                font-size: 1rem;
                ${TextNormal};
                margin-right: 1rem;
                letter-spacing: 0.5px;
                i {
                font-size: 1.2rem;
                margin-right: .034rem;
                }
                `

const DateContainer = styled(SimpleRow)`
                justify-content: center;
                width: 9rem;
                height: 2.6rem;
                border-radius: .5rem;
                color: ${({theme}) => theme.blueDark};
                background-color: ${({theme}) => theme.borderColor};
                position: relative;
                margin-left: 1rem;
                ${TextNormal};
                font-weight: 500;
                font-size: 1rem;
                letter-spacing: 0.5px;
                overflow: hidden;
                i {
                margin-right: 1rem;
                font-size: 1.2rem;
                }

                &::after {
                content: '';
                height: .2rem;
                position: absolute;
                left: 0;
                bottom: 0;
                width: ${({prazoDecorrido}) => prazoDecorrido + '%'};
                background-color: ${({prazoDecorrido, theme}) =>
    prazoDecorrido < 30 ? theme.green : prazoDecorrido < 70 ? theme.yellow : theme.red2};
                }
                `

