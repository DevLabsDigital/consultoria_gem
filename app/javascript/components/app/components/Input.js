import React from 'react';
import styled from "styled-components";
import {TextNormal} from "../styles/Typography";

const Input = React.forwardRef(({placeholderText, placeholder, icon, label, ...props}, ref) => {

        return (
            <Container>
                {label ? <Label>{label}</Label> : null}
                <CustomInputStyled {...props} placeholder={placeholderText || placeholder}/>
                {icon ? <Icon className={icon}/> : null}
            </Container>
        )
    }
)

export default Input;

const Container = styled.div`
position: relative;
`

const CustomInputStyled = styled.input`
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

&::placeholder {
font-family: 'Roboto', sans-serif;
font-size: 1rem;
font-weight: bold;
${TextNormal};
letter-spacing: 0.05rem;
color: #676767;
}

`

const Icon = styled.i`
position: absolute;
top: 50%;
transform: translateY(-50%);
right: 1.5rem;
color: #676767;
font-size: 1.2rem;
`

const Label = styled.div`
${TextNormal};
letter-spacing: 0.45px;
font-weight: 500;
font-size: .9rem;
color: ${({theme}) => theme.textDark};
margin-bottom: .8rem;
`