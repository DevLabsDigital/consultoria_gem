import React from 'react';
import styled from "styled-components";
import {TextNormal} from "../styles/Typography";

const Select = ({children, label, ...props}) => {
    return (
        <Container>
            {label ? <Label>{label}</Label> : null}
            <SelectStyled {...props}>
                {children}
            </SelectStyled>
        </Container>

    );
};

export default Select;

const Container = styled.div`
position: relative;
`

const SelectStyled = styled.select`
font-family: 'Roboto', sans-serif;
width: ${({width}) => width ? width + 'rem' : '100%'};
height: 4rem;
padding: 0 1rem;
border-radius: .6rem;
border: solid 0.6px ${({theme}) => theme.borderColor};
background-color: #f5f5f5;
font-size: 1rem;
font-weight: 500;
${TextNormal};
letter-spacing: 0.05rem;
color: #676767;
`

const Label = styled.div`
${TextNormal};
letter-spacing: 0.45px;
font-weight: 500;
font-size: .9rem;
color: ${({theme}) => theme.textDark};
margin-bottom: .8rem;
`