import React from 'react';
import styled from "styled-components";
import {TextNormal} from "../styles/Typography";
import {Row} from "../styles/Flex";

const Container = styled.div`
cursor: pointer;
font-size: 1.4rem;
${TextNormal};
line-height: 1.12;
letter-spacing: 0.7px;
height: 2.2rem;
${Row};
padding: 0 .7rem;
background-color: ${({theme}) => theme.blueLight2};
border-radius: .5rem;
color: ${({theme}) => theme.white};
margin-bottom: 1rem;
opacity: ${({isDisabled}) => isDisabled ? '.3' : '1'};
white-space: nowrap;
`


const Circle = styled.div`
width: .9rem;
height: .9rem;
border-radius: 50%;
background-color: ${({theme}) => theme.white};
margin-right: .8rem;
`

export const selectableTagColors = [
    '#617e94',
    '#0099d8',
    '#009d57',
    '#f47937',
    '#ca2149',
]

export const SelectableTag = ({label, color, ...props}) => {
    return (
        <Container {...props} style={{backgroundColor: '#617e94'}}>{label}</Container>
    );
};

export const TipoFiltroTodos = ({...props}) => {
    return (
        <Container {...props} style={{backgroundColor: '#617e94'}}><Circle/> Todos</Container>
    );
};

export const TipoFiltroFechamentoDoResultado = ({label = 'Fechamento do resultado', ...props}) => {
    return (
        <Container {...props} style={{backgroundColor: '#0099d8'}}><Circle/> {label}</Container>

    );
};

export const TipoFiltroApresentacaoDoResultado = ({...props}) => {
    return (
        <Container {...props} style={{backgroundColor: '#009d57'}}><Circle/> Apresentação do resultado - Conselho</Container>

    );
};

export const TipoFiltroForecast = ({...props}) => {
    return (
        <Container {...props} style={{backgroundColor: '#f47937'}}><Circle/> Forecast 2020</Container>

    );
};

export const TipoFiltroContasAReceber = ({...props}) => {
    return (
        <Container {...props} style={{backgroundColor: '#ca2149'}}><Circle/> Contas a receber</Container>

    );
};
