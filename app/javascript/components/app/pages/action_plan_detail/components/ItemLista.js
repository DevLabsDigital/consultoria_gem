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
import Checkbox from "../../../components/Checkbox";

const noUser = require('../../../assets/user.png')

const ItemLista = ({value, listId, index, remove}) => {

    const dispatch = useDispatch()
    
    const {title, description, prazoDecorrido, users, images, tags, finish_date} = value
    
    const getImage = v => {
        if(v == undefined || v == null) return undefined
        if(!v.avatar) return noUser
        return  v.avatar
    }
   
    const formattedData = (date)=>{
        let [year, month, day] = date?.split('-')
        
        return new Date(Date.parse(`${month}/${day}/${year}`)).toLocaleDateString()
    }

    return (
            <Line  onClick={() => dispatch(handleOpenCardActionPlan({listId, cardId: value.id}))}>
                <Left>
                    <Checkbox checked={value.list.status == "completed"} />
                    <Separator/>
                    <Title>{title}</Title>
                    <Separator/>
                    <StatusTag style={{backgroundColor: statusDict[value.list.status]?.color}}>
                        {statusDict[value.list.status]?.label}
                    </StatusTag>
                    <Separator/>
                    <UsersContainer img1={getImage(users[0])}
                                img2={getImage(users[1])}
                                img3={getImage(users[2])}/>
                    <Separator/>
                    <Separator/>
                    <Separator/>
                    {finish_date ?
                        <DateContainer prazoDecorrido={prazoDecorrido}>
                            <i className="fa fa-calendar"/>
                            {formattedData(finish_date)}
                        </DateContainer>
                        : null
                    }
                </Left>
                <Right>
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
                    <Separator/>
                    <IconContainerStyled onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        dispatch(openCopyCardModal({listId, cardId: value.id}))
                    }}><i className="fa fa-clone"/></IconContainerStyled>
                    <Separator/>
                    <IconAndLabel><i className="fa fa-paperclip"/> {images.length}</IconAndLabel>
                    <Separator/>
                    <IconAndLabel><i
                        className="fa fa-comment"/> {addZero(value.comments?.length || 0)}
                    </IconAndLabel>
                </Right>
            </Line>
    );
};
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

export default ItemLista;
const StatusTag = styled.div`
    padding: 5px 15px 4px 15px;
    border-radius: 20px;
    font-size: 9.1px;
    font-weight: 500;
    letter-spacing: 0.46px;
    text-align: center;
    color: #ffffff;
`
const Line = styled.div`
    height: 43px;
    margin: 9px 0;
    padding: 9px 13px 7.5px 11px;
    border-radius: 5px;
    background-color: #f5f5f5;  
    display: flex;
    justify-content: space-between;
    
`

const Title = styled.div`
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.05;
    letter-spacing: 0.9px;
    text-align: left;
    color: #2a3170;
`
const Left = styled.div`
    display: flex;
    align-items: center;
`

const Right = styled.div`
    justify-content: flex-end;
    display: flex;
    align-items: center;
`

const Separator = styled.div`
    width: 10px;
`

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


const IconContainerStyled = styled(IconContainer)`
                
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

