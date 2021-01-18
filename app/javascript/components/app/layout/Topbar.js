import React from 'react';
import styled from "styled-components";
import {Column} from "../styles/Flex";
import VerticalDivider from "../components/VerticalDivider";
import PepsicoImage from '../assets/empresa.jpg'
import SimpleRow from "../components/SimpleRow";
import {TextBold} from "../styles/Typography";
import UserDropdown from "../components/UserDropdown";

const Topbar = () => {


    return (
        <TopbarContainer>
            <Logo>
                <TituloLogo>Clever View</TituloLogo>
                <span>visualizacoes simples, desicoes inteligentes</span>
            </Logo>

            <VerticalDividerStyled/>

            <SimpleRow>
                <CompanyImage src={PepsicoImage}/>
                <CompanySelected>Pepsico <i className="fas fa-chevron-down"/></CompanySelected>
            </SimpleRow>
            <SimpleRow end={true}>
                <NavItem>Consultoria</NavItem>
                <NavItem>Empresas</NavItem>
                <NavItem>Usuários</NavItem>
                <NavItem>Configuração Master [C]</NavItem>
            </SimpleRow>
            <VerticalDividerStyled/>
            <SimpleRow spaceBetween>
                <Notificacoes><i className="far fa-bell"/> Notificações</Notificacoes>
                <UserDropdown />
            </SimpleRow>
        </TopbarContainer>
    );
};

export default Topbar;

const TopbarContainer = styled.div`
height: 99px;
padding: 0 4.8rem 0 2rem;
background-color: ${({theme}) => theme.topbarColor};
border-bottom: .1rem solid ${({theme}) => theme.borderColor};
display: grid;
grid-template-columns: 22rem 3rem 1fr 1fr minmax(3rem, 5rem) minmax(25rem, 30rem);
align-items: center;
`

const Logo = styled.div`
${Column};
color: ${({theme}) => theme.greenDark};
`

const TituloLogo = styled.span`
font-size: 2rem;
`

const VerticalDividerStyled = styled(VerticalDivider)`
margin: 0 3rem;
`

const CompanyImage = styled.img`
width: 5.5rem;
height: 5.5rem;
border-radius: 50%;
object-fit: cover;
`

const CompanySelected = styled.div`
color: ${({theme}) => theme.blueDark};
${TextBold};
margin-left: 1.5rem;
white-space: nowrap;

i {
margin-left: .8rem;
font-size: 1.2rem;

}
`

const NavItem = styled.a`
  margin: 0 0 0 2.5rem;
  ${TextBold};
  white-space: nowrap;
  cursor: pointer;
  ${({theme, isActive}) => isActive ? ({
    color: theme.blueLight,
}) : ({
    color: theme.blueDark,
})};
`

const Notificacoes = styled(SimpleRow)`
color: ${({theme}) => theme.blueDark};
${TextBold};
i {
margin-right: 1.3rem;
}
`