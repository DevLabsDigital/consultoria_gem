
import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import {GreenButton} from "../../../components/buttons/Button";


const TitleEditor = ({title, editing, setEditing, redefineTitle}) => {
    const [internalTitle, setInternalTitle] = useState(title);
    useEffect(() => {
        setTimeout(()=>{initTextArea()}, 100)
    }, [])

    const hide = ()=>{
        setTimeout(()=>{
            setEditing(false)
        }, 200)
    }
    
    return (
        <React.Fragment>
                <form style={{width: "100%",
                              display: editing ? "flex" : "none",
                              alignItems: 'center',
                              background: 'white', padding: 8}} 
                        action={'javascript:void(0)'} 
                        onSubmit={()=> redefineTitle(internalTitle) && setEditing(false) }>
                    <textarea
                        id="text"
                        ref={ref => {
                            ref && editing && ref.focus()
                            if(ref){
                                ref.style.height = 'auto';
                                ref.style.height = ref.scrollHeight+'px';
                            }
                            
                        }}
                        rows='1'
                        onBlur={()=> hide()}
                        onChange={(e) => setInternalTitle(e.target.value)}
                        style={{
                            fontSize: "2.0rem",
                            fontWeight: "bold",
                            fontStretch: "normal",
                            fontStyle: "normal",
                            lineHeight: "normal",
                            letterSpacing: ".1rem",
                            color: "#2a3170",
                            border: "none",
                            width: "100%",
                            overflow: 'hidden',
                            padding: 0,
                            outline: 'none',
                            resize: 'none',
                            minHeight: 40,
                            fontFamily: 'inherit'
                    }}
                    value={internalTitle || title}></textarea>
                    
                        <GreenButton onClick={()=> redefineTitle(internalTitle)}>
                            Salvar
                        </GreenButton>
                    
                </form>
                
                
                <div style={{
                    display: editing ? "none" : "block"
                }} onClick={()=> setEditing(true) && init()}>{title}</div>
            
        </React.Fragment>
    );
};

export default TitleEditor;

