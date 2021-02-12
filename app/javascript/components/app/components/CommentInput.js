import React, {useState} from 'react';
import styled from "styled-components";
import {TextNormal} from "../styles/Typography";
import {GreenButtonSmall} from "./buttons/Button";

const CommentInput = ({confirm, value, needFocus = false, openOnCLick = true, ...props}) => {

    const [isVisible, setIsVisible] = useState(false)

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {
            if(confirm) confirm()
        }
        if(props.onKeyDown) props.onKeyDown(e)
    }

    const showContent = () => {
        if(openOnCLick) {
            setIsVisible(true)
        }
    }

    const hiddenContent = () => {
        if(value  && !needFocus) return
        setTimeout(() => {
            setIsVisible(false)
        }, 500)
    }

    return (
      <Container block={value != null && value !== ''}>
              <InputStyled {...props} rows={isVisible ? 3 : 2} value={value} onKeyDown={handleKeyDown} onFocus={showContent} onBlur={hiddenContent} />
              <ActionsContainer isVisible={isVisible}>
                  <GreenButtonSmall onClick={()=> confirm()}>Salvar</GreenButtonSmall>
              </ActionsContainer>
      </Container>
    );
};

export default CommentInput;

const Container = styled.div`
background-color: #FFF;
position: relative;
  &::after {
    content: '',
    ${({block}) => block ? ({
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      backdropColor: 'transparent',
      pointerEvents: 'none',
    }) : null};
  }
`

const ActionsContainer = styled.div`
display: flex;
justify-content: flex-end;
overflow: hidden;
${({isVisible}) => isVisible ? ({
    height: 'auto',
    padding: '1rem',
    transition: 'all .3s',
}): ({
    height: 0,
    padding: '0 1rem',
    transition: 'all .3s',
})}
`

const InputStyled = styled.textarea`
font-family: 'Roboto', sans-serif;
width: ${({width}) => width ? width + 'rem' : '100%'};
padding: 1.4rem;
border-radius: .5rem;
outline: none;
border: none;
word-wrap: anywhere;

&::placeholder {
${TextNormal};
font-family: 'Roboto', sans-serif;
font-size: 1.5rem;
font-weight: 300;
letter-spacing: 0.075rem;
color: ${({theme}) => theme.darkColor};
}

`
