import React from 'react';
import {usePagination, useTable} from "react-table";
import SimpleRow from "../../components/SimpleRow";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";

const BasicCell = ({
                       value,
                       row: {index},
                       column: {id},
                   }) => {
    const style = {maxWidth: id === 'acoes' ? '10rem' : 'auto'}
    return <SimpleRow style={style}>{value}</SimpleRow>
}

const defaultColumn = {
    Cell: BasicCell,
}

const TableEtapas = ({data, columns}) => {

    const tableInstance = useTable({columns, data, defaultColumn, initialState: {pageIndex: 0, pageSize: 6},}, usePagination)

    return (
        <>
            <Table {...tableInstance} />
            <Pagination {...tableInstance} />
        </>
    );
};

export default TableEtapas;

