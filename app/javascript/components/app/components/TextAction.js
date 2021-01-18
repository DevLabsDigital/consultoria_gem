import React from 'react';
import styled from "styled-components";

const TextAction = ({children, ...props}) => {
    return (
        <TextActionStyled {...props}>
            {children}
        </TextActionStyled>
    );
};

export default TextAction;

const TextActionStyled = styled.div`
display: inline-block;
margin-left: .8rem;
color: ${({theme}) => theme.darkColor};
text-decoration: underline;
cursor: pointer;
`