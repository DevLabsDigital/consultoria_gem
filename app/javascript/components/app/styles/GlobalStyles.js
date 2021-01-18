import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";
import React from "react";
import {useSelector} from "react-redux";

const GlobalStylesCss = createGlobalStyle`
${reset};

html {
    box-sizing: border-box;
    font-size: 62.5%;
}

*,
*::before,
*::after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}

body {
    font-family: 'Roboto', sans-serif;
    background-color: ${({theme}) => theme.bodyBackgroundColor};
    overflow-x: hidden;
    overflow-y: ${({modalAberto}) => modalAberto ? 'hidden' : 'auto'};
}

i {
    font-size: inherit;
}

button {
 display: inline-block;
 border: none;
 margin: 0;
 padding: 0;
 text-decoration: none;
 outline: none;
 font-family: inherit;
}


ul, li {
user-select: none;
}

input {
    font-family: inherit;
    outline: none;
}
`

const GlobalStyles = () => {

    const modalAberto = useSelector(state => state.actionPlanDetail.modalItemVisible)

    return (
        <GlobalStylesCss modalAberto={modalAberto} />
    )
}


export default GlobalStyles
