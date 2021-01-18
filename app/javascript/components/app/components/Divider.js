import styled from "styled-components";

const Divider = styled.div`
width: 100%;
height: .1rem;
background-color: ${({theme}) => theme.borderColor};
`

export default Divider;