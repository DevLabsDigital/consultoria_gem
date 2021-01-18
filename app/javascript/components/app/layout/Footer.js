import React from 'react';
import styled from "styled-components";
import SimpleRow from "../components/SimpleRow";
import {TextNormal} from "../styles/Typography";

const Footer = () => {
    return (
        <FooterContainer>
            <FooterText>© copyright 2019 - Agrega Consultoria - All rights reserved.</FooterText>
            <SimpleRow>
                <FooterText>Powered by</FooterText>

            </SimpleRow>
        </FooterContainer>
    );
};

export default Footer;

const FooterContainer = styled(SimpleRow)`
justify-content: space-between;
margin-top: 6rem;
margin-bottom: 4rem;
padding-right: 2rem;
`

const FooterText = styled.span`
${TextNormal};
font-size: 1.1rem;
color: #676767;
`
