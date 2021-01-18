import styled from "styled-components";
import SimpleRow from "../../../components/SimpleRow";

const IconContainer = styled(SimpleRow)`
justify-content: center;
width: 2.5rem;
height: 2.5rem;
border-radius: 50%;
background-color: ${({theme, hasBackground = true}) => hasBackground ? theme.borderColor : 'transparent'};
color: ${({theme}) => theme.darkColor};
cursor: pointer;
font-size: 1.2rem;
`

export default IconContainer