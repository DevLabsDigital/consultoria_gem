import React, {useEffect, useState} from 'react';
import SubTopbar from "../../layout/SubTopbar";
import Title from "../../components/Title";
import {GreenButton} from "../../components/buttons/Button";
import PageDivided from "../../layout/PageDivided";
import SimpleColumn from "../../components/SimpleColumn";
import SimpleRow from "../../components/SimpleRow";
import styled from "styled-components";
import {TextNormal} from "../../styles/Typography";
import HistoryChart from "../../shared/graphs/HistoryChart";
import DashboardChart from "../../shared/graphs/DashboardChart";
import Card from "../../components/Card";
import {CommentBudget, DeleteBudget, ReactivateBudget, EditBudget} from "../../components/Budget";
import TablePlanoAcao from "./TablePlanoAcao";
import {useDispatch, useSelector} from "react-redux";
import {listBoardRequest, openNewPlanModal} from "../../store/reducers/actionPlan";
import * as MySwal from "sweetalert2";
import api from "../../core/network";
import MyThemeProvider from "../../styles/MyThemeProvider";
import theme from 'styled-theming';

const ActionPlanPage = () => {

    const columns = React.useMemo(
        () => [
            {
                Header: 'Planos de ação',
                accessor: 'title',
            },
            {
                Header: 'Ações',
                accessor: 'acoes',
            },
        ],
        []
    )

    const dispatch = useDispatch()
    const [currentState, setCurrentState] = useState("active")

    useEffect(() => {
        dispatch(listBoardRequest())
    }, [])

    const {boards, inactive_boards} = useSelector(state => state.actionPlan)

    const openModalNewActionPlan = () => {
        dispatch(openNewPlanModal())
    }

    const listAsHash = (list) => {
        let hash = {}
        let total = list.map((x)=> x.cards.length).reduce((a,b)=> a + b, 0)
        
        list.map((x)=> {
            hash[x.status] = (x.cards.length / total) * 100
        })

        return hash
    }

    return (
        <div>
            <MyThemeProvider>
            <SimpleColumn>
                <SubTopbar>
                    <SimpleRow>
                        {/* <BackButton><i className="fa fa-long-arrow-alt-left"/> Voltar</BackButton> */}
                        <Title>Etapas do projeto</Title>
                        {/* <ActionButton><i className="fa fa-long-arrow-alt-up"/>N</ActionButton>
                        <DescriptionActionButton>Para adicionar um novo plano de ação</DescriptionActionButton> */}
                    </SimpleRow>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <Tabs>
                            <TabLink active={currentState == "active"} onClick={()=> setCurrentState("active")}>Ativos</TabLink>
                            <TabLink active={currentState == "inactive"} onClick={()=> setCurrentState("inactive")}>Inativos</TabLink>
                        </Tabs>
                        <GreenButton onClick={openModalNewActionPlan}><i className="fa fa-plus-circle"/>Plano de ação</GreenButton>
                    </div>
                </SubTopbar>
                <Card>
                    <TablePlanoAcao data={
                        (currentState == "active" ? boards : inactive_boards).map(board => ({
                            id: board.attributes.id,
                            title: board.attributes.title,
                            percentage: listAsHash(board.attributes.lists),
                            acoes: <>
                                <EditBudget onClick={e => {
                                    e.stopPropagation()
                                    dispatch(openNewPlanModal({
                                        id: board.attributes.id,
                                        title: board.attributes.title,
                                    }))
                                }
                                }><i className="fa fa-pen"/>editar</EditBudget>
                                

                                <DeleteBudget
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        MySwal.fire({
                                            title: currentState == "active" ? 'Tem certeza que deseja deletar este registro?' : "Tem certeza de que deseja ativar este registro?",
                                            icon: 'warning',
                                            showCancelButton: true,
                                            showConfirmButton: true,
                                            confirmButtonColor: currentState == "active" ? 'red' : 'green',
                                            confirmButtonText: currentState == "active" ? 'Excluir' : "Ativar",
                                            cancelButtonText: 'Cancelar'
                                        }).then(() => {
                                            api.delete(`boards/${board.attributes.id}`).then(() => {
                                                dispatch(listBoardRequest())
                                            })
                                        })
                                    }
                                    }
                                >{currentState == "active" ? <><i className="fa fa-trash"/> excluir</> : "ativar" } </DeleteBudget>
                              <ReactivateBudget
                                style={{
                                    backgroundColor: currentState == "active" ? "#ca2149" : "rgb(0, 156, 83)"
                                }}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    MySwal.fire({
                                        title: currentState == "active" ? 'Tem certeza que deseja desativar este registro?' : "Tem certeza de que deseja ativar este registro?",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        showConfirmButton: true,
                                        confirmButtonColor: currentState == "active" ? 'red' : 'green',
                                        confirmButtonText: currentState == "active" ? "Desativar" : "Ativar",
                                        cancelButtonText: 'Cancelar'
                                    }).then(() => {
                                        api.post(`boards/${board.attributes.id}/toggle_inactive`).then(() => {
                                            dispatch(listBoardRequest())
                                        })
                                    })
                                }
                                }
                            >{currentState == "active" ? "desativar" : "reativar" } </ReactivateBudget>
                            
                                <div style={{marginLeft: 10}}>

                                
                                    <IconContainerStyled onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        MySwal.fire({
                                            title: 'Tem certeza que deseja clonar este registro?',
                                            icon: 'warning',
                                            showCancelButton: true,
                                            showConfirmButton: true,
                                            confirmButtonColor: 'green',
                                            confirmButtonText: 'Clonar',
                                            cancelButtonText: 'Cancelar'
                                        }).then(() => {
                                            api.post(`boards/${board.attributes.id}/clone`).then(() => {
                                                dispatch(listBoardRequest())
                                            })
                                        })
                                    }}><i className="fa fa-clone"/></IconContainerStyled>
                                </div>
                                </>
                                
                        }))
                    } columns={columns}/>
                </Card>
            </SimpleColumn>
            {/*<RightContainer>
                <HistoryChart/>
                <DashboardChart/>
            </RightContainer>*/}
            </MyThemeProvider>
        </div>
    );
};

ActionPlanPage.routeName = '/plano-de-acao'

export default ActionPlanPage;

const IconContainer = styled(SimpleRow)`
justify-content: center;
width: 2.5rem;
height: 2.5rem;
border-radius: 50%;
background-color: ${({theme, hasBackground = true}) => hasBackground ? theme.borderColor : 'transparent'};
color: ${({theme}) => theme.darkColor};
cursor: pointer;
font-size: 1.2rem;
`
const IconContainerStyled = styled(IconContainer)`
                
                `
const Tabs = styled.div`
    display: flex;
    font-size: 1.4rem;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: .1rem;
    margin-right: 16px;

` 
const TabLink = styled.div`
    margin: 0 10px;
    cursor: pointer;
    color: ${({theme}) => theme.blueDark};
    ${({ active }) => active && `
        color:  #31b7bc;
    `}
`

const BackButton = styled(SimpleRow)`
background-color: ${({theme}) => theme.grayLight};
color: ${({theme}) => theme.grayDark};
${TextNormal};
letter-spacing: 0.6px;
font-size: 1.2rem;
border-radius: .6rem;
width: 7.3rem;
height: 2.6rem;
padding: 0 1rem;
cursor: pointer;
margin-right: 1.6rem;

i {
margin-right: .5rem;
}
`

const ActionButton = styled(BackButton)`
background-color: ${({theme}) => theme.darkColor};
color: ${({theme}) => theme.borderColor};
letter-spacing: 0.71px;
font-size: 1.42rem;
width: 3.81rem;
height: 2.43rem;
padding: 0 .7rem;
margin-left: 1rem;
`

const DescriptionActionButton = styled.span`
${TextNormal};
font-size: 1.42rem;
letter-spacing: 0.71px;
color: ${({theme}) => theme.darkColor};
`


const RightContainer = styled.div`
${Card} {
margin-bottom: 3rem;
}
`