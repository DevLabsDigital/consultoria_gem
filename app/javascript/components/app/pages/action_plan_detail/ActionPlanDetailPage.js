import React, {useEffect, useState} from 'react';
import SubTopbar from "../../layout/SubTopbar";
import Title from "../../components/Title";
import {DragDropContext} from "react-beautiful-dnd";
import styled from "styled-components";
import Quadro from "./components/Quadro";
import ItemQuadro from "./components/ItemQuadro";
import ItemLista from "./components/ItemLista";
import ActionPlanDetailFilters from "./ActionPlanDetailFilters";
import {useParams} from "react-router";
import {TipoFiltroFechamentoDoResultado} from "../../components/TiposCausaRazao";
import {useDispatch, useSelector} from "react-redux";
import icon_kanban from "icon_kanban.svg";
import icon_listas from "icon_listas.svg";
import {
    changeActionPlanCardPosition,
    changeTemporalyActionPlanCardPosition, deleteCardActionPlan,
    loadActionPlanData, openNewCardModal, loadrequestBoard
} from "../../store/reducers/actionPlanDetail";

import {addZero, hasValue} from "../../util/values_util";
import {calcPercentual} from "../../util/math_util";

const ActionPlanDetailPage = () => {

    const params = useParams()
    const dispatch = useDispatch()
    const [layout, setLayout] = useState("card")
    const {items, filters, board} = useSelector(state => state.actionPlanDetail)
    const {currentBoard, setCurrentBoard} = useState({})
    const [renderedItens, setRenderedItens] = useState({})
    const {tags} = useSelector(state => state.actionPlanDetail)

    useEffect(() => {
        dispatch(loadrequestBoard({id: params.id}))
        dispatch(loadActionPlanData(params.id))
        
        console.log(board)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params])

    const [isFilterExpanded, setFilterExpanded] = useState(true)

    const onDragEnd = (result) => {
        const {destination, source, draggableId} = result

        if (!destination) {
            return
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        //faco a requisicao para alterar a posicao
        const consultoria_list_id = items[destination.droppableId].id
        let id = items[source.droppableId].ids[source.index]
        dispatch(changeActionPlanCardPosition({
            data: {consultoria_list_id, id, position: destination.index},
            idToRefresh: params.id
        }))

        //ja altero a posicao independente da requisicao, porque ela vai demorar um tempo, quando ela concluir ela
        //seta os valores que vao ser os mesmos daqui em caso de sucesso, ou vai voltar o card em caso de falha
        const start = items[source.droppableId]
        const finish = items[destination.droppableId]

        if (start === finish) {
            const newItemsId = Array.from(start.ids)
            newItemsId.splice(source.index, 1)
            newItemsId.splice(destination.index, 0, draggableId)


            const newColumn = {
                ...start,
                ids: newItemsId.slice(0),
            }

            const newState = {
                ...items,
                [source.droppableId]: newColumn,
            }
            dispatch(changeTemporalyActionPlanCardPosition(newState))
            return;
        }

        const startItemsId = Array.from(start.ids)
        startItemsId.splice(source.index, 1)
        const newStart = {
            ...start,
            ids: startItemsId,
        }

        const finishItemsId = Array.from(finish.ids)
        finishItemsId.splice(destination.index, 0, draggableId)
        const newFinish = {
            ...finish,
            ids: finishItemsId,
        }

        const newState = {
            ...items,
            [source.droppableId]: newStart,
            [destination.droppableId]: newFinish,
        }
        dispatch(changeTemporalyActionPlanCardPosition(newState))

    }

    const openModalNewCard = (listId) => {
        dispatch(openNewCardModal({listId, boardId: params.id}))
    }

    const deleteCard = (listId, cardId) => {
        dispatch(deleteCardActionPlan({listId, cardId, boardId: params.id}))
    }

    const renderList = ()=>{
        console.log("RENDERED", renderedItens)
        return <WhiteBoard>
            <div style={{display: 'flex'}}>
                <PercentageTag black>
                    <RoundedPercentage>{percentualPrevisto}%</RoundedPercentage>
                    <PercentageText>PREVISTO</PercentageText>
                </PercentageTag>
                <PercentageTag blue>
                    <RoundedPercentage>{percentualEmAndamento}%</RoundedPercentage>
                    <PercentageText>EM ANDAMENTO</PercentageText>
                </PercentageTag>
                <PercentageTag red>
                    <RoundedPercentage>{percentualAtrasado}%</RoundedPercentage>
                    <PercentageText>ATRASADO</PercentageText>
                </PercentageTag>
                <PercentageTag green>
                    <RoundedPercentage>{percentualCompleto}%</RoundedPercentage>
                    <PercentageText>CONCLUIDO</PercentageText>
                </PercentageTag>
            </div>
            {tags.map((tag)=>{
                return <React.Fragment>
                    <TipoFiltroFechamentoDoResultado label={tag.attributes.name}/>
                    {Object.values(renderedItens?.columns)?.map((item, index) => {
                        const value = item
                        let includeTag = value.tags.map((x)=> String(x.id)).includes(String(tag.id))
                        return (
                             includeTag && <ItemLista key={value.id} index={index} value={value}
                                        listId={renderedItens.scheduled.id} remove={deleteCard}/>
                        )
                    })}
                </React.Fragment>
            })}
             
        </WhiteBoard>
    }

    useEffect(() => {
        let newItems = {...items}
        
        if(Object.values(filters.status).some(v => v)) {

            if(!filters.status.scheduled && newItems.scheduled) {
                newItems = {...newItems, scheduled: {...newItems.scheduled, ids: []}}
            }
            if(!filters.status.in_progress && newItems.in_progress) {
                newItems = {...newItems, in_progress: {...newItems.in_progress, ids: []}}
            }
            if(!filters.status.delayed && newItems.delayed) {
                newItems = {...newItems, delayed: {...newItems.delayed, ids: []}}
            }
            if(!filters.status.completed && newItems.completed) {
                newItems = {...newItems, completed: {...newItems.completed, ids: []}}
            }
        }
        setRenderedItens(newItems)
    }, [items, filters])

    const total = Object.keys(renderedItens?.columns || {})?.length
    const percentualPrevisto = addZero(calcPercentual(total, renderedItens?.scheduled?.ids?.length))
    const percentualEmAndamento = addZero(calcPercentual(total, renderedItens?.in_progress?.ids?.length))
    const percentualAtrasado = addZero(calcPercentual(total, renderedItens?.delayed?.ids?.length))
    const percentualCompleto = addZero(calcPercentual(total, renderedItens?.completed?.ids?.length))

    return (
        <PageContainer>
            <MainContainer>
                <SubTopbar>
                    <Title>{board?.data?.attributes?.title}</Title>
                    {/*<GreenButton><i className="fa fa-plus-circle"/>Adicionar ATA</GreenButton>*/}
                    <div style={{display: 'flex', marginRight: 30}}>
                        <HeaderLink active={layout == "card"} href={'javascript::void(0)'} onClick={()=> setLayout("card")}>
                            <IconKanban active={layout == "card"} />
                            Cards
                        </HeaderLink>
                        <HeaderLink active={layout == "list"} href={'javascript::void(0)'} onClick={()=> setLayout("list")}>
                            <IconList active={layout == "list"}/>
                            Listas
                        </HeaderLink>
                    </div>
                    
                    
                </SubTopbar>
                
                {
                    (hasValue(renderedItens) && layout == "card") ? <DragDropContext onDragEnd={onDragEnd}>
                            <QuadrosContainer>
                                <Quadro black percentual={percentualPrevisto} headerTitle={'PREVISTO'}
                                        headerQtdLabel={addZero(renderedItens?.scheduled?.ids?.length)}
                                        droppableId={'scheduled'} addCard={() => openModalNewCard(renderedItens.scheduled.id)}>
                                    {
                                        renderedItens?.scheduled?.ids.map((item, index) => {
                                            const value = renderedItens.columns[item]
                                            return (
                                                <ItemQuadro key={value.id} index={index} value={value}
                                                            listId={renderedItens.scheduled.id} remove={deleteCard}/>
                                            )
                                        })
                                    }
                                </Quadro>
                                <Quadro blue percentual={percentualEmAndamento} headerTitle={'EM ANDAMENTO'}
                                        headerQtdLabel={addZero(renderedItens.in_progress?.ids?.length)}
                                        droppableId={'in_progress'} addCard={() => openModalNewCard(renderedItens.in_progress.id)}>
                                    {
                                        renderedItens.in_progress?.ids.map((item, index) => {
                                            const value = renderedItens.columns[item]
                                            return (
                                                <ItemQuadro key={value.id} index={index} value={value}
                                                            listId={renderedItens.in_progress.id} remove={deleteCard}/>
                                            )
                                        })
                                    }
                                </Quadro>
                                <Quadro red percentual={percentualAtrasado} headerTitle={'ATRASADO'}
                                        headerQtdLabel={addZero(renderedItens.delayed?.ids?.length)}
                                        droppableId={'delayed'} addCard={() => openModalNewCard(renderedItens.delayed.id)}>
                                    {
                                        renderedItens.delayed?.ids.map((item, index) => {
                                            const value = renderedItens.columns[item]
                                            return (
                                                <ItemQuadro key={value.id} index={index} value={value}
                                                            listId={renderedItens.delayed.id} remove={deleteCard}/>
                                            )
                                        })
                                    }
                                </Quadro>
                                <Quadro green percentual={percentualCompleto} headerTitle={'CONCLUIDO'}
                                        headerQtdLabel={addZero(renderedItens.completed?.ids?.length)}
                                        droppableId={'completed'} addCard={() => openModalNewCard(renderedItens.completed.id)}>
                                    {
                                        renderedItens.completed?.ids.map((item, index) => {
                                            const value = renderedItens.columns[item]
                                            return (
                                                <ItemQuadro key={value.id} index={index} value={value}
                                                            listId={renderedItens.completed.id} remove={deleteCard}/>
                                            )
                                        })
                                    }
                                </Quadro>
                            </QuadrosContainer>
                        </DragDropContext>
                        : null
                }
                {layout == "list" && renderList()}
            </MainContainer>
            <FilterContainer isExpanded={isFilterExpanded}>
                <ActionPlanDetailFilters isExpanded={isFilterExpanded}
                                         toogleVisibility={() => setFilterExpanded(prev => !prev)}/>
            </FilterContainer>
        </PageContainer>
    );
};

// ActionPlanDetailPage.routeName = '/plano-de-acao/detalhe'

export default ActionPlanDetailPage;

const HeaderLink = styled.a`
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 0.7px;
    text-align: right;
    color: #2a3170;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    margin: 10px;
    ${({ active }) => active && `
        color: #31b7bc;
    `}
`

const IconKanban = styled.div`
    width: 21px;
    height: 21px;
    mask-image: url(${icon_kanban});
    mask-size: contain;
    background: #2a3170;
    margin-right: 5px;
    ${({ active }) => active && `
        background: #31b7bc;
    `}
`

const IconList = styled.div`
    width: 21px;
    height: 21px;
    mask-image: url(${icon_listas});
    mask-size: contain;
    background: #2a3170;
    margin-right: 5px;
    ${({ active }) => active && `
        background: #31b7bc;
    `}
`



const RoundedPercentage = styled.div`
    border-radius: 81px;
    border: 1.6px solid;
    font-size: 10px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.11;
    -webkit-letter-spacing: 0.05px;
    -moz-letter-spacing: 0.05px;
    -ms-letter-spacing: 0.05px;
    letter-spacing: 0.05px;
    text-align: center;
    width: 29px;
    height: 29px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const PercentageText = styled.div`
    margin: 8px 0 7px 7px;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: 1.44px;
    text-align: left;
`
const PercentageTag = styled.div`
    color: white;
    width: 190px;
    height: 40px;
    margin: 0 6px 57px 0;
    padding: 5px 13px 6px 16px;
    border-radius: 5px;
    background-color: #617e94;
    display: flex;
    align-items: center;
    background-color: ${({theme, black, blue, red, green}) => black ? theme.darkColor : blue ? theme.blueLight2 : red ? theme.red2 : green ? theme.green : null};
`

const PageContainer = styled.div`
display: flex;
overflow: hidden;
`

const MainContainer = styled.div`
overflow: auto;
min-width: 0;
width: 100%;
`

const QuadrosContainer = styled.div`
display: grid;
grid-template-columns: repeat(4, 1fr);
grid-column-gap: 1.5rem;
`

const FilterContainer = styled.div`
width: ${({isExpanded}) => isExpanded ? '35rem' : '1rem'};
transition: all .3s;
`

const WhiteBoard = styled.div`
    background-color: #fff;
    padding: 3rem;
    border-radius: .5rem;
    box-shadow: 0.2rem 0.2rem 1rem 0 rgb(0 0 0 / 10%);
    border: solid 0.5px #e5e5e5;
    margin: 16px;
`