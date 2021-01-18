import styled from 'styled-components'


const Card = styled.div`
background-color: ${({theme}) => theme.white};
padding: 3rem;
border-radius: .5rem;
box-shadow: .2rem .2rem 1rem 0 rgba(0, 0, 0, 0.1);
border: solid 0.5px ${({theme}) => theme.grayLight};
`

export default Card;
