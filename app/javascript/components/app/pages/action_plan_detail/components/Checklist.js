import React, {useState} from 'react';
import SimpleRow from "../../../components/SimpleRow";
import BarraProgresso from "./BarraProgresso";
import IconContainer from "./IconContainer";
import CheckboxRow from "../../../components/CheckboxRow";
import InputWhite from "../../../components/InputWhite";
import styled from "styled-components";
import Title from "../../../components/Title";
import {Row} from "../../../styles/Flex";
import {TextNormal} from "../../../styles/Typography";
import {useDispatch} from "react-redux";
import {changeTask, createTask, deleteChecklist, deleteTask} from "../../../store/reducers/actionPlanDetail";
import CommentInput from "../../../components/CommentInput";
import {addZero} from "../../../util/values_util";
import {calcPercentual} from "../../../util/math_util";

const Checklist = ({item, cardId}) => {

    const dispatch = useDispatch()

    const [taskInputValue, changeTaskInputValue] = useState('')

    const handleRemoveChecklist = () => {
        dispatch(deleteChecklist({cardId, id: item.id}))
    }

    const handleRemoveTask = (id) => {
        dispatch(deleteTask({cardId, id, cheklistId: item.id}))
    }

    const handleSaveTask = () => {
        dispatch(createTask({cardId, cheklistId: item.id, description: taskInputValue}))
        changeTaskInputValue('')
    }

    const handleTaskStatus = (v, id) => {
        dispatch(changeTask({cardId, completed: v, id}))
    }

    const tasksLength = item.tasks.length
    const taskConcluidas = item.tasks.filter(task => task.completed).length

    const diferenca = calcPercentual(tasksLength, taskConcluidas)

    return (
        <div key={item.id} style={{marginBottom: '2rem'}}>
            <SimpleRow spaceBetween style={{marginBottom: '2rem'}}>
                <TitleSmall title={item.title}>{item.title}</TitleSmall>
                <SimpleRow>
                    <BarraProgresso concluidoTotal={diferenca}/>
                    <QtdItens>{addZero(item.tasks.length)}</QtdItens>
                    <IconContainer onClick={() => handleRemoveChecklist(item.id)} hasBackground={false}><i
                        className="fa fa-trash"/></IconContainer>
                </SimpleRow>
            </SimpleRow>
            {
                item.tasks.map(task => {
                    return (
                        <CheckboxRow title={task.description} label={task.description} style={{marginBottom: '1rem'}} checked={!!task.completed} onChange={v => handleTaskStatus(v, task.id)}
                                     icon={<IconContainer hasBackground={false} onClick={() => handleRemoveTask(task.id)}><i
                                         className="fa fa-trash"/></IconContainer>}/>
                    )
                })}
            <CommentInput placeholder={'Adicione um item...'} confirm={handleSaveTask} value={taskInputValue}
                          onChange={e => changeTaskInputValue(e.target.value)}/>
        </div>
    );
};

export default Checklist;

const TitleSmall = styled(Title)`
font-size: 1.5rem;
letter-spacing: 0.75px;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`

const QtdItens = styled.div`
${Row};
justify-content: center;
width: 2.2rem;
height: 2.2rem;
border-radius: .4rem;
background-color: ${({theme}) => theme.contentBackgroundColor};
${TextNormal};
line-height: 1.12;
letter-spacing: 0.6px;
color: ${({theme}) => theme.darkColor};
margin-left: 3rem;
margin-right: 1.1rem;
`