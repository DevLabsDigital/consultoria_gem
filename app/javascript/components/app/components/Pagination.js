import React from 'react';
import styled from "styled-components";
import SimpleRow from "./SimpleRow";
import ReactPaginate from 'react-paginate';

const Pagination = ({gotoPage, previousPage, nextPage, pageCount, canPreviousPage, canNextPage, state: {pageIndex, pageSize}}) => {

    return (
        <PaginationContainer>
            <PaginationButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</PaginationButton>
            <PaginationButton onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</PaginationButton>
            {/*{pageSize >= 2 ? <PaginationButton onClick={() => gotoPage(pageIndex - 1)} isActive={pageIndex === 0}>{pageIndex}</PaginationButton> : null}*/}
            <PaginationButton onClick={() => gotoPage()} isActive={true}>{'1'}</PaginationButton>
            {/*{pageSize >= 2 ? <PaginationButton onClick={() => gotoPage(pageIndex + 1)} isActive={pageIndex === 2}>{pageIndex + 2}</PaginationButton> : null}*/}
            <PaginationButton onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</PaginationButton>
            <PaginationButton onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</PaginationButton>
        </PaginationContainer>
    );
};

export default Pagination;

const PaginationContainer = styled(SimpleRow)`
justify-content: center;
margin-top: 4rem;
`

const PaginationButton = styled.button`
font-size: 1.2rem;
font-weight: normal;
font-stretch: normal;
font-style: normal;
line-height: normal;
letter-spacing: 0.06rem;
width: 2.7rem;
height: 2.7rem;
border-radius: .5rem;
margin-right: .7rem;
cursor: pointer;
user-select: none;
${({theme, isActive}) => isActive ? ({
    color: theme.white,
    backgroundColor: theme.blueLight,
}) : ({
    color: '#acacac',
    backgroundColor: theme.white,
    border: 'solid 1px #acacac',
})};

&:disabled {
opacity: .6;
pointer-events: none;
}

`