import React from 'react';
import Table from "../../components/Table";
import styled from "styled-components";
import {useTable} from "react-table";
import {Row} from "../../styles/Flex";


const BasicCell = ({
                       value,
                       row: {index},
                       column: {id},
                   }) => {
    return typeof value === 'boolean' ? <Concluded isConcluded={value} imHere={id === 'ago2020' && index === 0}/> :
        <span>{value}</span>
}

const defaultColumn = {
    Cell: BasicCell,
}

const TableCronogramas = ({data, columns}) => {

    const tableInstance = useTable({columns, data, defaultColumn})


    return (
        <Table {...tableInstance} style={{marginTop: '6rem', marginBottom: '4rem'}} />
    );
};

export default TableCronogramas;

const Concluded = styled.div.attrs(({imHere}) => ({
    children: imHere ? <ImHere /> : null,
}))`
width: 1.2rem;
height: 1.2rem;
border-radius: 50%;
display: inline-block;
position: relative;
${({isConcluded, theme}) => isConcluded ? ({
    backgroundColor: theme.green,
}) : ({
    backgroundColor: '#c4c4c4',
})};
margin-left: 1rem;
`

const ImHere = styled.div.attrs(() => ({
    children: ['VOCÊ ESTÁ AQUI', <BottomImHehe />]
}))`
background-color: ${({theme}) => theme.red};
position: absolute;
width: 11.6rem;
height: 3.1rem;
border-radius: .5rem;
${Row};
justify-content: center;
color: ${({theme}) => theme.white};
z-index: 1;
top: -11rem;
left: -3rem;
user-select: none;
`

const BottomImHehe = styled.div`
background-color: ${({theme}) => theme.red};
position: absolute;
width: .2rem;
height: 50rem;
top: 3rem;

&::after {
content: '';
position: absolute;
bottom: -.2rem;
left: 50%;
transform: translateX(-50%);
background-color: ${({theme}) => theme.red};
width: .6rem;
height: .6rem;
border-radius: 50%;
}


@media(max-width: 1380px) {
height: 54rem;
}


@media(min-width: 1450px) {
height: 44rem;
}



`