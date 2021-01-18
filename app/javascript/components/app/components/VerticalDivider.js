import styled from 'styled-components'

const VerticalDivider = styled.div`
width: .1rem;
height: 70%;
background-color: ${({theme}) => theme.borderColor};
justify-self: center;
`

export default VerticalDivider;