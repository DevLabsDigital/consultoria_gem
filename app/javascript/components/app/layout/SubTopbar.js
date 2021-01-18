import React from 'react';
import styled from "styled-components";
import SimpleRow from "../components/SimpleRow";

const SubTopbar = ({children}) => {
    return (
        <SubTopbarContainer>
            {children}
        </SubTopbarContainer>
    );
};

export default SubTopbar;

const SubTopbarContainer = styled(SimpleRow)`
justify-content: space-between;
margin-bottom: 1.5rem;
width: 100%;
`