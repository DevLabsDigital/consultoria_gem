import styled from "styled-components";
import {Column} from "../styles/Flex";

import React from 'react';

const SimpleColumn = ({spaceBetween, end, center, children, ...props}) => {

    let styles = {...props.style}

    if(spaceBetween) styles = {...styles, justifyContent: 'space-between', with: '100%'}
    if(end) styles = {...styles, justifyContent: 'flex-end'}
    if(center) styles = {...styles, justifyContent: 'center'}

    return (
        <SimpleColumnStyled {...props} style={styles}>{children}</SimpleColumnStyled>
    );
};

export default SimpleColumn;

const SimpleColumnStyled = styled.div`
${Column};
`
