import styled from "styled-components";
import React from "react";
import {Row} from "../styles/Flex";

export const TableStyles = styled.table`
width: 100%;
`

export const Tr = styled.tr`
&:nth-child(odd) {
background-color: ${({theme}) => theme.bodyBackgroundColor};
}
cursor: pointer;
&:hover {
background-color: ${({theme}) => theme.borderColor};
}

${({white, theme}) => white ? ({
    '&:nth-child(odd)': {
        backgroundColor: theme.white
    }
}) : null}
`

export const ThStyled = styled.th`
text-align: left;
font-size: 1.1rem;
font-weight: bold;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: 0.55px;
white-space: nowrap;
color: ${({theme}) => theme.blueLight};
padding-left: 2rem;
`

const TdStyled = styled.td`
color: ${({theme}) => theme.darkColor};
padding-left: 2rem;
font-size: 1rem;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: 0.05rem;

`

const Cell = styled.div`
height: 4.7rem;
${Row};
`

export const Td = ({children, ...props}) => {
    return (
        <TdStyled>
            <Cell {...props}>
                {children}
            </Cell>
        </TdStyled>
    );
};


export const Th = ({children, ...props}) => {
    return (
        <ThStyled>
            <Cell {...props}>
                {children}
            </Cell>
        </ThStyled>
    );
};