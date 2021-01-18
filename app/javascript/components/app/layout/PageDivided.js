import styled from "styled-components";

const PageDivided = styled.div`
display: grid;
grid-template-columns: 2.5fr ${({small}) => small ? '35.8rem' : '1fr'};
grid-column-gap: 2.4rem;
padding-right: 2rem;
`

export default PageDivided