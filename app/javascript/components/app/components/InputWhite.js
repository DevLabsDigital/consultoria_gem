import React from 'react';
import styled from "styled-components";
import {TextNormal} from "../styles/Typography";

const InputWhite = ({onEnterPress, ...props}) => {

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            if(onEnterPress) onEnterPress()
        }
        if(props.onKeyDown) props.onKeyDown(e)
    }

    return (
        <InputStyled {...props} onKeyDown={handleKeyDown} />
    );
};

export default InputWhite;

const InputStyled = styled.input`
font-family: 'Roboto', sans-serif;
width: ${({width}) => width ? width + 'rem' : '100%'};
height: 4.3rem;
padding-left: 1.4rem;
border-radius: .5rem;
outline: none;
border: none;

&::placeholder {
${TextNormal};
font-family: 'Roboto', sans-serif;
font-size: 1.5rem;
font-weight: 300;
letter-spacing: 0.075rem;
color: ${({theme}) => theme.darkColor};
}

`