import React from 'react';
import styled from "styled-components";
import {Column, Row} from "../../../styles/Flex";

const formattedData = (date)=>{
    return new Date(Date.UTC(...date.split('-'))).toLocaleDateString()
}
const DateContainer = ({description, date, ...props}) => {
    return (
        <Container {...props}>
            <Description>{description}</Description>
            <Content><i className="fa fa-calendar-alt" /> {date ? formattedData(date) : '12/12/2020'}</Content>
        </Container>
    );
};

export default DateContainer;

const Container = styled.div`
background-color: #eaeaea;
border-radius: 5px;
${Column};
justify-content: space-between;
padding: 0.5rem 1rem;
margin-right: 1rem;
`

const Description = styled.div`
font-size: 8px;
color: #617e94;
margin-bottom: .2rem;
`

const Content = styled.div`
font-size: 10px;
color: #2a3170;
${Row};
gap: 5px;
font-weight: 500;
i {
font-size: 12px;
}
`
