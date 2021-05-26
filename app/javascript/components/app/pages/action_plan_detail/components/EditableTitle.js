import React, {useState} from 'react';
import { PROPS_ATTR } from 'react_ujs';


const EditableTitle = ({title, editing, setEditing, CustomTitle=<div></div>, redefineTitle, inputStyle={}}) => {
    const [internalTitle, setInternalTitle] = useState(title);
    
    
    const handleClick = () =>{
        setEditing(true)
        
    }
    return (
        <React.Fragment>
                <form style={{width: '100%', display: editing ? "block" : "none"}} action={'javascript:void(0)'} onSubmit={()=> redefineTitle(internalTitle)}>
                    <input
                        onChange={(e) => setInternalTitle(e.target.value)}
                        tabIndex="0"
                        ref={ref => ref && editing && ref.focus()}
                        onBlur={()=>setEditing(false)}
                        style={{
                            width: '100%',
                            ...inputStyle
                    }}
                    value={internalTitle || title}></input>
                </form>
                
                
                <CustomTitle style={{
                    display: editing ? "none" : "block"
                }} onClick={handleClick}>{title}</CustomTitle>
            
        </React.Fragment>
    );
};

export default EditableTitle;
