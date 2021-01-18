import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import useOutsideClick from "../hooks/useOutsideClick";

const BaseModal = ({children, isVisible, width, top, bodyStyle, closeModal, zIndex}) => {

    const ref = useRef()

    useOutsideClick(ref, (e) => {
        e.preventDefault()
        e.stopPropagation()
        closeModal(e)
    })

    const [containerVisible, setContainerVisible] = useState(isVisible)

    useEffect(() => {
        if(isVisible === false && containerVisible === true) {
            setTimeout(() => {
                setContainerVisible(false)
            }, 150)
        } else {
            setContainerVisible(isVisible)
        }
    }, [containerVisible, isVisible])

    return (
        <ModalContainer isVisible={isVisible} containerVisible={containerVisible} zIndex={zIndex}>
            <ModalBody ref={ref} isVisible={isVisible} width={width} top={top} style={bodyStyle}>
                {children}
            </ModalBody>
        </ModalContainer>
    );
};


export default BaseModal;


const ModalContainer = styled.div`
position: fixed;
overflow: auto;
background: rgba(0,0,0,.4);
z-index: ${({zIndex}) => zIndex || 30};
${({containerVisible}) => containerVisible ? ({
    width: '100vw',
    height: '100vh',
}) : ({
    width: 0,
    height: 0,
})};
${({isVisible}) => isVisible ? ({
    left: 0,
    top: 0,
    transition: 'opacity .3s',
}) : ({
    left: 0,
    top: 0,
    opacity: 0,
    pointerEvents: 'none',
    transition: 'opacity .3s',
})};
`

const ModalBody = styled.div`
position: absolute;
width: ${({width}) => width || '50%'};
background-color: ${({theme}) => theme.bodyBackgroundColor};
left: 50%;
transform: translate(-50%, -50%);
border: solid .05rem ${({theme}) => theme.borderColor};
box-shadow: 2px 2px 10px 0 rgba(0, 0, 0, 0.1);
box-sizing: border-box;
border-radius: .5rem;
${({isVisible, top = 50}) => isVisible ? ({
    top: `${top}%`,
    transition: 'top .3s',
}) : ({
    top: '120%',
    transition: 'top .3s',
})
}
`

