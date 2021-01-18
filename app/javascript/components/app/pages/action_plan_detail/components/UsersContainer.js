import React from 'react';
import styled from "styled-components";
import {openAddUserModal} from "../../../store/reducers/actionPlanDetail";
import {useDispatch, useSelector} from "react-redux";
import {Row} from "../../../styles/Flex";

const UsersContainer = ({img1, img2, img3}) => {

    const {cardValue} = useSelector(state => state.actionPlanDetail.item)

    const dispatch = useDispatch()
    return (
        <ImagesContainer>
            {img1 ? <UserImg index={0} isBig src={img1}/> : null}
            {img2 ? <UserImg index={1} src={img2}/> : null}
            {img3 ? <UserImg index={2} src={img3}/> : null}
                {cardValue && !img1 ? <span style={{color: 'rgb(97, 126, 148)', fontWeight: 'bold'}}>Usuario</span> : null}
                    {cardValue ? <ButtonAddUser style={{marginLeft: !img1 ? '40px' : 0}} className={'fas fa-plus-circle'} onClick={(e) => {
                e.stopPropagation()
                dispatch(openAddUserModal(cardValue))
                }} index={!img1? 0 : img1 && !img2 ? 1.5 : img3 ? 3 : 2}/> : null}
        </ImagesContainer>
    );
};

export default UsersContainer;


const ImagesContainer = styled.div`
position: relative;
${Row};
`

export const UserImg = styled.img`
border-radius: 50%;
${({changePosition = true, index}) => changePosition ? ({
    position: 'absolute',
    top: '50%', 
    left: index * 1.8 + 'rem',
    zIndex: index + 20 - (index * 10),
    transform: 'translateY(-50%)', 
}) : null};

${({isBig}) => isBig ? ({
    width: '2.55rem',
    height: '2.55rem',
}) : ({
    width: '2.03rem',
    height: '2.03rem',
    marginBottom: '.2rem',
})};
`



const ButtonAddUser = styled.div`
${Row};
justify-content: center;
align-items: center;
color: ${({theme}) => theme.darkColor};
width: 2rem;
height: 2rem;
background-color: #eaeaea;
cursor: pointer;
margin-bottom: .5rem;
border-radius: 50%;
    position: absolute;
    top: 50%; 
    left: ${({index}) => index * 1.8 + 'rem'};
    z-index: index + 20 - (index * 10);
    transform: translateY(-50%); 
`
