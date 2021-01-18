import React from 'react';
import SimpleRow from "./SimpleRow";
import styled from "styled-components";
import Checkbox from "./Checkbox";
import {TextNormal} from "../styles/Typography";

const CheckboxRow = ({label, icon, style, ...props}) => {
    return (
        <CheckboxRowContainer style={style}>
                <Checkbox {...props}/>
            <SimpleRow spaceBetween style={{width: '100%'}}>
                <span>{label}</span>
                {icon}
            </SimpleRow>
        </CheckboxRowContainer>
    );
};

export default CheckboxRow;

const CheckboxRowContainer = styled(SimpleRow)`
padding: 0 1rem;
${TextNormal};
font-size: 1.4rem;
color: ${({theme}) => theme.darkColor};
letter-spacing: 0.7px;
border-radius: .5rem;
height: 3.5rem;
background-color: ${({theme}) => theme.white};

span {
margin-left: 1rem;
}
`