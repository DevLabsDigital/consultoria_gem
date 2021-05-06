import React, {useState} from 'react';


const TitleEditor = ({title, editing, setEditing, redefineTitle}) => {
    const [internalTitle, setInternalTitle] = useState(title);
    return (
        <React.Fragment>
                <form style={{display: editing ? "block" : "none"}} action={'javascript:void(0)'} onSubmit={()=> redefineTitle(internalTitle)}>
                    <input
                        onChange={(e) => setInternalTitle(e.target.value)}
                        style={{
                            fontSize: "2.2rem",
                            fontWeight: "bold",
                            fontStretch: "normal",
                            fontStyle: "normal",
                            lineHeight: "normal",
                            letterSpacing: ".1rem",
                            color: "#2a3170",
                            border: "none"
                    }}
                    value={internalTitle || title}></input>
                </form>
                
                
                <div style={{
                    display: editing ? "none" : "block"
                }} onClick={()=> setEditing(true)}>{title}</div>
            
        </React.Fragment>
    );
};

export default TitleEditor;
