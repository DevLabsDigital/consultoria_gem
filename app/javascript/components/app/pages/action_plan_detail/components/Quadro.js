import React from 'react';
import styled from "styled-components";
import {Column, Row} from "../../../styles/Flex";
import SimpleRow from "../../../components/SimpleRow";
import {TextNormal} from "../../../styles/Typography";
import {Droppable} from "react-beautiful-dnd";

const Quadro = ({black, blue, red, green, percentual, headerTitle, headerQtdLabel, children, droppableId, addCard}) => {
    return (
        <Droppable droppableId={droppableId}>
            {
                (provided, snapshot) => (
                    <div ref={provided.innerRef}  {...provided.droppableProps}>
                        <QuadroContainer>
                            <QuadroHeader black={black} blue={blue} red={red} green={green}>
                                <SimpleRow>
                                    <PorcentagemConcluida>{percentual}<span>%</span></PorcentagemConcluida>
                                    <HeaderTitle>{headerTitle}</HeaderTitle>
                                </SimpleRow>
                                <SimpleRow>
                                    <HeaderEndingAction>{headerQtdLabel}</HeaderEndingAction>
                                    <HeaderEndingAction style={{cursor: 'pointer'}} onClick={addCard}><i className="fa fa-plus-circle"/></HeaderEndingAction>
                                </SimpleRow>
                            </QuadroHeader>
                            <QuadroBody>
                                <DashedBorder isDraggingOver={snapshot.isDraggingOver}>
                                    {children}
                                    {provided.placeholder}
                                    <ButtonPlus onClick={addCard}><i className="fa fa-plus-circle"/></ButtonPlus>
                                </DashedBorder>
                            </QuadroBody>
                        </QuadroContainer>
                    </div>

                )
            }
        </Droppable>
    );
};

export default Quadro;

const QuadroContainer = styled.div`
${Column};
min-width: 32rem;
`

const QuadroHeader = styled.div`
${Row};
justify-content: space-between;
padding: 0 1.7rem;
height: 8rem;
border-top-right-radius: .4rem;
border-top-left-radius: .4rem;

background-color: ${({theme, black, blue, red, green}) =>
    black ? theme.darkColor : blue ? theme.blueLight2 : red ? theme.red2 : green ? theme.green : null};

`

const PorcentagemConcluida = styled.div`
width: 4rem;
height: 4rem;
border: .16rem solid ${({theme}) => theme.white};
border-radius: 50%;
background-color: transparent;
color: ${({theme}) => theme.white};
${Row};
justify-content: center;
font-size: 1.49rem;
font-weight: 500;
font-stretch: normal;
font-style: normal;
line-height: 1.11;
letter-spacing: 0.15px;

span {
font-size: .99rem;
line-height: 1.11;
letter-spacing: 0.1px;
margin-top: .2rem;
}
`

const HeaderTitle = styled.span`
font-size: 1.8rem;
${TextNormal};
font-weight: 500;
letter-spacing: 0.9px;
color: ${({theme}) => theme.white};
margin-left: 1rem;
`

const HeaderEndingAction = styled.div`
font-size: 1.2rem;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: 1.12;
letter-spacing: 0.6px;
color: ${({theme}) => theme.darkColor};
width: 2.8rem;
height: 2.8rem;
background-color: ${({theme}) => theme.bodyBackgroundColor};
border-radius: .4rem;
${Row};
justify-content: center;
margin-left: 1rem;
`

const QuadroBody = styled.div`
padding: 1rem 1rem 1rem 1rem;
background-color: ${({theme}) => theme.white};
`

const DashedBorder = styled.div`
padding: .7rem .7rem 1rem .7rem;
border: .2rem dashed ${({isDraggingOver, theme}) => isDraggingOver ? theme.darkColor : 'transparent'};
`

const ButtonPlus = styled(SimpleRow)`
justify-content: center;
height: 4.5rem;
color: ${({theme}) => theme.darkColor};
width: 100%;
background-color: ${({theme}) => theme.bodyBackgroundColor};
font-size: 1.6rem;
margin-top: 1rem;
cursor: pointer;
`