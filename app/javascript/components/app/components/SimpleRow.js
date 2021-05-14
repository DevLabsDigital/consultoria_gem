import styled from "styled-components";
import {Row} from "../styles/Flex";

import React from 'react';

const SimpleRow = ({spaceBetween, end, center, children, ...props}) => {

    let styles = {...props.style}

    if(spaceBetween) styles = {...styles, justifyContent: 'space-between', with: '100%'}
    if(end) styles = {...styles, justifyContent: 'flex-end'}
    if(center) styles = {...styles, justifyContent: 'center'}

    return (
        <SimpleRowStyled {...props} style={styles}>{children}</SimpleRowStyled>
    );
};

export default SimpleRow;

const SimpleRowStyled = styled.div`
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
${Row};
`
