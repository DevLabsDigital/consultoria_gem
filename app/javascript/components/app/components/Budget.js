import React from 'react';
import styled from "styled-components";
import {TextNormal} from "../styles/Typography";

const Budget = ({children, ...props}) => {
    return (
        <BudgetContainer {...props}>
            {children}
        </BudgetContainer>
    );
};

export default Budget;

const BudgetContainer = styled.div`
border-radius: 1rem;
padding: .4rem .8rem;
color: ${({theme}) => theme.white};
font-size: 1.2rem;
${TextNormal};
letter-spacing: 0.6px;
display: inline-block;
white-space: nowrap;

i {
margin-right: .5rem;
}

`

export const StatusBudget = styled(Budget)`
background-color: ${({theme}) => theme.blueLight};
margin-left: .5rem;
`

export const EditBudget = styled(Budget)`
background-color: #acacac;
cursor: pointer;
margin: 0 .5rem;
`

export const CommentBudget = styled(Budget)`
background-color: #acacac;
cursor: pointer;
`

export const DeleteBudget = styled(Budget)`
background-color: ${({theme}) => theme.red};
cursor: pointer;
`

export const OkBudget = styled(Budget)`
background-color: ${({theme}) => theme.greenLight};
`

export const PendingBudget = styled(Budget)`
background-color: ${({theme}) => theme.darkColor};
`