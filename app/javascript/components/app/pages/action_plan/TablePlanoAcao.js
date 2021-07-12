import React from 'react';
import {useHistory} from "react-router";
import ActionPlanPage from "./ActionPlanPage";
import {TableStyles, Td, Th, Tr} from "../../components/TableStyles";
import styled from 'styled-components'

const TablePlanoAcao = ({data, columns}) => {
    const history = useHistory()
    const roundedNumber = (number)=>{
        if(number.toString() == "NaN"){
            return 0
        }else{
            return parseFloat(number).toFixed(0);
        }
        
    }
    const renderStatus = (value)=>{
        const {scheduled,
            delayed,
            in_progress,
            completed} = value.percentage
        
        return <GroupedStatus>
            <StatusTag style={{backgroundColor: statusDict['scheduled'].color}}>
                <StatusRoundedPercentage>{roundedNumber(scheduled)}%</StatusRoundedPercentage> {statusDict['scheduled'].label}
            </StatusTag>
            <StatusTag style={{backgroundColor: statusDict['delayed'].color}}>
                <StatusRoundedPercentage>{roundedNumber(delayed)}%</StatusRoundedPercentage> {statusDict['delayed'].label}
            </StatusTag>
            <StatusTag style={{backgroundColor: statusDict['in_progress'].color}}>
                <StatusRoundedPercentage>{roundedNumber(in_progress)}%</StatusRoundedPercentage> {statusDict['in_progress'].label}
            </StatusTag>
            <StatusTag style={{backgroundColor: statusDict['completed'].color}}>
                <StatusRoundedPercentage>{roundedNumber(completed)}%</StatusRoundedPercentage> {statusDict['completed'].label}
            </StatusTag>
        </GroupedStatus>
    }
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
                                    <Td>
                                        {value.title}
                                        <div>
                                            {renderStatus(value)}
                                        </div>
                                    </Td>
                                    <Td style={{width: '14rem'}}>{value.acoes}</Td>
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

const statusDict = {
    scheduled: {
        label: "PREVISTO",
        color: "#617E94"
    },
    delayed: {
        label: "ATRASADO",
        color: "#ED1C24"
    },
    in_progress: {
        label: "EM ANDAMENTO",
        color: "#0099D8"
    },
    completed: {
        label: "CONCLUIDO",
        color: "#009C53"
    }
}

const GroupedStatus = styled.div`
    display: flex;
    margin-left: 20px;
    color: white;
`
const StatusRoundedPercentage = styled.div`
    margin-right: 4px;
`

const StatusTag = styled.div`
    display: flex;
    background: black;
    border-radius: 8px;
    height: 20px;
    padding: 0 10px;
    align-items: center;
    margin: 0 3px;
`