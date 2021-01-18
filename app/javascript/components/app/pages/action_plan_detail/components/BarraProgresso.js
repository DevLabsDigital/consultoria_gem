import React from 'react';
import styled from "styled-components";
import SimpleRow from "../../../components/SimpleRow";
import {TextNormal} from "../../../styles/Typography";
import {Row} from "../../../styles/Flex";
import {addZero} from "../../../util/values_util";

const BarraProgresso = ({concluidoTotal, ...props}) => {
    return (
        <BarraProgressoContainer {...props}>
            <span>{addZero(concluidoTotal)}%</span>
            <Progresso concluidoTotal={concluidoTotal} />
        </BarraProgressoContainer>
    );
};

export default BarraProgresso;

const BarraProgressoContainer = styled(SimpleRow)`
${Row};
${TextNormal};
span {
margin-right: 1rem;
color: ${({theme}) => theme.darkColor};
font-size: 1.2rem;
line-height: 1.12;
letter-spacing: 0.6px;
}
`

const Progresso = styled.div`
width: 20rem;
height: .3rem;
border-radius: .5rem;
background-color: ${({theme}) => theme.gray};
position: relative;

&::after {
content: '';
height: 100%;
width: ${({concluidoTotal}) => `${concluidoTotal}%`};
border-radius: .5rem;
position: absolute;
left: 0;
top: 50%;
transform: translateY(-50%);
background-color: ${({theme}) => theme.green};
}
`
