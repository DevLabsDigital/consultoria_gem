import React from 'react';
import {TableStyles, Td, Th, Tr} from "./TableStyles";

const Table = ({getTableProps, headerGroups, getTableBodyProps, page, rows, prepareRow, onRowClick, ...props}) => {

    const handleRowClick = (index) => {
        if(onRowClick) {
            onRowClick(index)
        }
    }

    return (
        <TableStyles {...getTableProps()} {...props}>
            <thead>
            {
                headerGroups.map((headerGroup, index) => (
                    <Tr key={index} {...headerGroup.getHeaderGroupProps()} white>
                        {
                            headerGroup.headers.map((column, index) => {
                                    return <Th key={index} {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                    </Th>
                                }
                            )
                        }
                    </Tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {
                page ? page.map((row, index) => {
                        prepareRow(row)
                        return (
                            <Tr key={index} {...row.getRowProps()} onClick={() => handleRowClick(index)}>
                                {
                                    row.cells.map((cell, index) => {
                                        return (
                                            <Td key={index} {...cell.getCellProps()} >
                                                {
                                                    cell.render('Cell')}
                                            </Td>
                                        )
                                    })}
                            </Tr>
                        )
                    }
                ) : rows.map((row, index) => {
                        prepareRow(row)
                        return (
                            <Tr key={index} {...row.getRowProps()}  onClick={() => handleRowClick(index)}>
                                {
                                    row.cells.map((cell, index) => {
                                        return (
                                            <Td key={index} {...cell.getCellProps()} >
                                                {
                                                    cell.render('Cell')}
                                            </Td>
                                        )
                                    })}
                            </Tr>
                        )
                    }
                )
            }
            </tbody>
        </TableStyles>
    );
};

export default Table;