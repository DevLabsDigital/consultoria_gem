import React from 'react';
import styled from "styled-components";
import SimpleRow from "./SimpleRow";
import {TextNormal} from "../styles/Typography";

const UserRow = ({img, name, noImage = false, remove}) => {
    return (
        <UserRowContainer>
            <SimpleRow>{noImage ? null : <Img src={img} />} {name}</SimpleRow> {noImage ? null : <i className="fa fa-trash" style={{cursor: 'pointer'}} onClick={remove}/>}
        </UserRowContainer>
    );
};

export default UserRow;

const UserRowContainer = styled(SimpleRow)`
justify-content: space-between;
padding: 0 1rem;
${TextNormal};
font-size: 1.4rem;
color: ${({theme}) => theme.darkColor};
letter-spacing: 0.7px;
border-radius: .5rem;
height: 3.5rem;
background-color: ${({theme}) => theme.white};
`

const Img = styled.img`
border-radius: 50%;
width: 2.03rem;
height: 2.03rem;
margin-bottom: .2rem;
margin-right: 1rem;
`
