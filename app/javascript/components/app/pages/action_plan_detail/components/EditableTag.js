import React, {useState, useEffect} from 'react';
import { PROPS_ATTR } from 'react_ujs';
import styled from "styled-components";

const EditableTag = ({title, editing, setEditing, CustomTitle=<div></div>, redefineTitle, inputStyle={}}) => {
    const [internalTitle, setInternalTitle] = useState(title);
    useEffect(() => {
        setTimeout(()=>{initTextArea()}, 100)
    }, [])
    
    const handleClick = () =>{
        // setEditing(true)
        
    }

    const hide = ()=>{
        setTimeout(()=>{
            setEditing(false)
        }, 200)
    }
    return (
        <React.Fragment>
                <Form style={{display: editing ? "flex" : "none"}} action={'javascript:void(0)'} onSubmit={()=> redefineTitle(internalTitle)}>
                    <Input
                        onChange={(e) => setInternalTitle(e.target.value)}
                        tabIndex="0"
                        onBlur={()=>hide()}
                        style={{
                            flex: 1,
                            ...inputStyle
                    }}
                    value={internalTitle || title}></Input>
                    <Button onClick={()=> redefineTitle(internalTitle)}>
                            Salvar
                        </Button>
                </Form>
                
                
                <CustomTitle style={{
                    display: editing ? "none" : "block",
                    
                }} onClick={handleClick}>{title}</CustomTitle>
            
        </React.Fragment>
    );
};

export default EditableTag;


const Form = styled.form`
    width: 100%;
    align-items: center;
    border-radius: 5px;
` 
const Input = styled.input`
    border: none;
    color: white;
    margin: 10px;
    font-size: 11px;
    font-family: inherit;
    background: #617e94;
`

const Button = styled.button`
border-radius: .6rem;
height: 4rem;
padding: 0 2rem;
color: ${({theme}) => theme.white};
font-size: 1.2rem;
font-weight: 500;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: 0.06rem;
cursor: pointer;
background-color: #03ab79;
height: 27px;

`


