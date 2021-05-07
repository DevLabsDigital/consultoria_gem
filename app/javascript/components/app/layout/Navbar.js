import React, {useState} from 'react';
import styled from 'styled-components'
import SimpleRow from "../components/SimpleRow";
import {useHistory, useLocation} from "react-router";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ActionPlanPage from "../pages/action_plan/ActionPlanPage";


const Navbar = () => {

    const [isParamtrosSubmenuOpened, setParamtrosSubmenuOpened] = useState(false)

    const toogleOpenedParametros = () => {
        setParamtrosSubmenuOpened(prev => !prev)
    }

    const history = useHistory()
    const location = useLocation()

    return (
        <NavbarContainer>
            <List>
                <ListItem onClick={() => history.push(ActionPlanPage.routeName)} isActive={location.pathname === ActionPlanPage.routeName}>Gestão de Tarefas</ListItem>
                <ListItem onClick={() => history.push(DashboardPage.routeName)} isActive={location.pathname === DashboardPage.routeName}>Dashboard</ListItem>
                <ListItem>Resultado</ListItem>
                <ListItem>Orçamento</ListItem>
                <ListItem>Upload</ListItem>
                <ListItem isOpened={isParamtrosSubmenuOpened} onClick={toogleOpenedParametros}>
                    Parametrização {isParamtrosSubmenuOpened ? <i className="fa fa-chevron-up" /> : <i className="fa fa-chevron-down" />}
                    <InnerList>
                        <ListItemInterno>Parametrização Contábil</ListItemInterno>
                        <ListItemInterno>Fluxo de Caixa Direto</ListItemInterno>
                        <ListItemInterno>Fluxo de Caixa Indireto</ListItemInterno>
                        <ListItemInterno>Centro de Custo</ListItemInterno>
                        <ListItemInterno>Borboleta</ListItemInterno>
                    </InnerList>
                </ListItem>
                <ListItem>Fórmulas</ListItem>
            </List>
            <BottomButton />
        </NavbarContainer>
    );
};

export default Navbar;

const NavbarContainer = styled.div`

`

const List = styled.ul`

`

const InnerList = styled(List)`
margin-top: 4rem;
`

const ListItem = styled.li`
font-size: 1.6rem;
font-weight: 500;
letter-spacing: .08rem;
padding: 2rem 2rem 2rem 4rem;
cursor: pointer;
overflow: hidden;
i {
font-size: 1.1rem;
margin-left: 2rem;
}

  ${({theme, isActive}) => isActive ? ({
    color: theme.blueLight,
    backgroundImage: 'linear-gradient(to right, rgba(229, 229, 229, 0.5), #f5f5f5)',
    borderLeft: `.3rem solid ${theme.blueLight}`,
}) : ({
    color: theme.darkColor,
})};

  ${({isOpened}) => isOpened ? ({
   maxHeight: '40rem',
    transition: 'all .3s',
}) : ({
    maxHeight: '5.6rem',
    transition: 'all .3s',
})};
`

const ListItemInterno = styled.li`
font-size: 1.4rem;
padding: 1.7rem;
font-weight: normal;
font-stretch: normal;
line-height: normal;
letter-spacing: normal;
border-bottom: .1rem solid #eaeaea;
  ${({theme, isActive}) => isActive ? ({
    color: theme.blueLight,
}) : ({
    color: theme.darkColor,
})};
`

const BottomButton = styled(SimpleRow).attrs(() => ({
    children: <i className="fa fa-chevron-left" />
}))`
justify-content: center;
width: 80%;
height: 3rem;
background-color: ${({theme}) => theme.topbarColor};
border-radius: .2rem;
margin-left: 2rem;
margin-top: 2rem;
color: ${({theme}) => theme.borderColor};
`