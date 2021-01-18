import React from 'react';
import styled from 'styled-components'
import Card from "./Card";
import {Column, Row} from "../styles/Flex";

const CardWithHeader = ({children, header, ...props}) => {
    return (
        <CardWithHeaderContainer {...props}>
            <CardHeader>
                {header}
            </CardHeader>
            <Card>
                {children}
            </Card>
        </CardWithHeaderContainer>
    );
};

export default CardWithHeader;

const CardWithHeaderContainer = styled.div`
${Column};

${Card} {
border-top-left-radius: 0;
border-top-right-radius: 0;
}
`

const CardHeader = styled.div`
height: 7rem;
background-color: ${({theme}) => theme.grayLight};
color: ${({theme}) => theme.textDark};
font-size: 1.2rem;
font-weight: 500;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: 0.06rem;
${Row};
justify-content: space-between;
padding: 0 2rem;
border-top-left-radius: .5rem;
border-top-right-radius: .5rem;
box-shadow: .2rem -.2rem 1rem 0 rgba(0, 0, 0, 0.1);
`