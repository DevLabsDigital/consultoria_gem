import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid'
import styled from "styled-components";
import {Row} from "../styles/Flex";

// const Checkbox = ({onChange, checked}) => {
const Checkbox = (props) => {

    const [id] = useState(uuidv4())

    // const [checked, setChecked] = useState(true)
    //
    // const onChange = () => {
    //     setChecked(prev => !prev)
    // }

    return (
        <div>
            <CheckboxStyled id={id} {...props}/>
            <Label  onClick={e => props.onChange(!props.checked)} htmlFor={id}/>
        </div>
    );
};

export default Checkbox;

const Label = styled.label`
cursor: pointer;
width: 2rem;
height: 2rem;
border-radius: .6rem;
border: .1rem solid rgba(210,210,210,0.5);
user-select: none;
color: ${({theme}) => theme.green};
vertical-align: middle;
${Row};
justify-content: center;
align-items: center;
transition: all .3s;
`

const CheckboxStyled = styled.input.attrs(() => ({
    type: 'checkbox',
}))`
position: absolute;
opacity: 0;
user-select: none;
z-index: -1;
&:checked ~ Label {
background-color: ${({theme}) => theme.primaryColor};
border-color: ${({theme}) => theme.primaryColorLight};
transition: all .3s;
&::after {
content: '\f00c';
font-family: "Font Awesome 5 Free";
font-weight: 900;
display: inline-block;
font-size: 1rem;
}
}
`