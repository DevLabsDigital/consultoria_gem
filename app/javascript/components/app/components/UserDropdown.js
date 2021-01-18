import React, {useRef, useState} from 'react';
import styled from "styled-components";
import useClickOutside from "../hooks/useOutsideClick";
import {getUserInfo, logout} from "../util/auth";
import SimpleRow from "./SimpleRow";
import {TextBold} from "../styles/Typography";
import {useHistory} from "react-router";

const UserDropdown = () => {

    const history = useHistory()

    const user = getUserInfo()

    const [optionsOpened, setOptionsOpened] = useState(false)
    const ref = useRef()

    useClickOutside(ref, () => {
        setOptionsOpened(false)
    })

    const handleLogout = () => {
        logout()
        history.push('/login')
    }

    return (
        <Container onClick={() => setOptionsOpened(prev => !prev)} ref={ref}>
            {user?.name} <i className="fas fa-chevron-down"/>
            <Options isOpen={optionsOpened} onClick={handleLogout}>
                <i className="fas fa-sign-out-alt" />
                Sair
            </Options>
        </Container>
    );
};

export default UserDropdown;

const Container = styled(SimpleRow)`
 position: relative;
 white-space: nowrap;
 color: ${({theme}) => theme.blueDark};
 ${TextBold};
 i {
   margin-left: 1.3rem;
 }
 cursor: pointer;
`

const Options = styled.div`
position: absolute;
width: 10rem;
background-color: ${({theme}) => theme.grayLight};
left: -2rem;
border-radius: .3rem;
padding: 1rem .5rem;
${SimpleRow};
justify-content: space-between;
align-items: center;
box-shadow: 0 0 .5rem 0 ${({theme}) => theme.gray};
transition: all .3s;
i{
margin-right: 1rem;
}
&:hover {
background-color: ${({theme}) => theme.red2};
color: #fff;
transition: all .3s;
}
${({isOpen}) => isOpen ? ({
    bottom: '-4.2rem',
    opacity: 1,
    transition: 'all .3s',
    zIndex: 10,
}) : ({
    bottom: '-2rem',
    opacity: 0,
    transition: 'all .3s',
    pointerEvents: 'none',
    zIndex: -1,
})}
`