import React from 'react';
import {useHistory} from "react-router";
import ActionPlanPage from "./ActionPlanPage";
import {TableStyles, Td, Th, Tr} from "../../components/TableStyles";

const TablePlanoAcao = ({data, columns}) => {

    const history = useHistory()
    return (
        <>
            <TableStyles>
                <thead>
                <Tr white>
                {
                    columns.map((column, index) => (
                        <Th key={index}>{column.Header}</Th>
                    ))}
                </Tr>
                </thead>
                <tbody>
                {
                    data.map((value, index) => {
                        return (
                                <Tr key={index}
                                    onClick={() => history.push(ActionPlanPage.routeName + '/' + data[index].id)}>
                                    <Td>{value.title}</Td>
                                    <Td style={{width: '8rem'}}>{value.acoes}</Td>
                                </Tr>
                            )
                        }
                    )}
                </tbody>
            </TableStyles>
            {/*<Pagination  />*/}
        </>
    );
};

export default TablePlanoAcao;

