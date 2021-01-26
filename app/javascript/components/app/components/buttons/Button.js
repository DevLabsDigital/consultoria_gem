import styled from "styled-components";
import React from "react";

const Button = styled.button`
border-radius: .6rem;
height: 4rem;
padding: 0 2rem;
color: ${({theme}) => theme.white};
font-size: 1.2rem;
font-weight: 500;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: 0.06rem;
cursor: pointer;

i {
margin-right: 1rem;
}

`
export default Button

export const GreenButton = styled(Button)`
background-color: #03ab79;
`

export const GreenButtonSmall = styled(GreenButton)`
height: 3rem;
padding: 0 1.5rem;
`

export const TransparentButton = styled(Button)`
background-color: transparent;
color: ${({theme}) => theme.blueDark};
`

export const AddButton = styled(GreenButton).attrs(({label}) => ({
children: <><i className="fa fa-plus-circle"/> {label}</>,
}))`

`