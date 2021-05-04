import React from 'react';
import PageDivided from "../../layout/PageDivided";
import styled from 'styled-components'
import SubTopbar from "../../layout/SubTopbar";
import Card from "../../components/Card";
import etapasDashboard from "../../mock/etapasDashboard";
import {DeleteBudget, EditBudget, OkBudget, PendingBudget, StatusBudget} from "../../components/Budget";
import SimpleRow from "../../components/SimpleRow";
import TableEtapas from "./TableEtapas";
import {GreenButton} from "../../components/buttons/Button";
import CardWithHeader from "../../components/CardWithHeader";
import Select from "react-select";
import TableCronogramas from "./TableCronogramas";
import dataCronograma from '../../mock/dataCronograma'
import HistoryChart from "../../shared/graphs/HistoryChart";
import DashboardChart from "../../shared/graphs/DashboardChart";
import Title from "../../components/Title";
import MyThemeProvider from "../../styles/MyThemeProvider";

const DashboardPage = () => {

    const columns = React.useMemo(
        () => [
            {
                Header: 'Etapas',
                accessor: 'etapa',
            },
            {
                Header: <SimpleRow>Status<StatusBudget>75%</StatusBudget></SimpleRow>,
                accessor: 'status',
            },
            {
                Header: 'Ações',
                accessor: 'acoes',
            },
        ],
        []
    )

    const data = React.useMemo(
        () => etapasDashboard.map(value => ({
            ...value, status: value.status === 'ok' ?
                <OkBudget>{value.status}</OkBudget> : <PendingBudget>{value.status}</PendingBudget>,
            acoes: <><EditBudget><i className="fa fa-pen"/>editar</EditBudget><DeleteBudget><i
                className="fa fa-trash"/> excluir</DeleteBudget></>
        }))
        , []
    )

    const columnsCronograma = React.useMemo(
        () => [
            {
                Header: 'Etapas',
                accessor: 'etapa',
            },
            {
                Header: 'Descrição',
                accessor: 'descricao',
            },
            {
                Header: 'Jan 20',
                accessor: 'jan2020',
            },
            {
                Header: 'Fev 20',
                accessor: 'fev2020',
            },
            {
                Header: 'Mar 20',
                accessor: 'mar2020',
            },
            {
                Header: 'Abr 20',
                accessor: 'abr2020',
            },
            {
                Header: 'Mai 20',
                accessor: 'mai2020',
            },
            {
                Header: 'Jun 20',
                accessor: 'jun2020',
            },
            {
                Header: 'Jul 20',
                accessor: 'jul2020',
            },
            {
                Header: 'Ago 20',
                accessor: 'ago2020',
            },
            {
                Header: 'Set 20',
                accessor: 'set2020',
            },
        ],
        []
    )

    return (
        <Page>
            <MyThemeProvider>
            <MainContainer>
                <SubTopbar>
                    <Title>Etapas do projeto</Title>
                    <GreenButton><i className="fa fa-plus-circle"/>Nova etapa</GreenButton>
                </SubTopbar>
                <Card>
                    <TableEtapas data={data} columns={columns}/>
                </Card>
                <CardWithHeader
                    header={
                        <>
                            CRONOGRAMA DO PROJETO
                            <Select options={[
                                {label: 'Visualizar por mês', value: '1'},
                            ]} value={{label: 'Visualizar por mês', value: '1'}} styles={{
                                container: (provided, state) => ({
                                    ...provided,
                                    width: '18rem',
                                    backgroundColor: '#f5f5f5',
                                    borderColor: '#f5f5f5',
                                    "&:hover": {
                                        borderColor: '#f5f5f5',
                                    },
                                    borderRadius: '.6rem',
                                }),
                                control: (provided) => ({
                                    ...provided,
                                    backgroundColor: '#f5f5f5',
                                    borderColor: '#f5f5f5',
                                    "&:hover": {
                                        borderColor: '#f5f5f5',
                                    },
                                    boxShadow: 'none'
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: '#f5f5f5',
                                    color: '#676767',
                                    "&:hover": {
                                        backgroundColor: '#f5f5f5',
                                    }
                                }),
                                singleValue: (base, state) => ({
                                    ...base,
                                    color: '#676767',
                                }),
                            }}/>
                        </>
                    }
                >
                    <TableCronogramas columns={columnsCronograma} data={dataCronograma}/>
                </CardWithHeader>
            </MainContainer>
            <Charts>
                <HistoryChart/>
                <DashboardChart/>
            </Charts>
            </MyThemeProvider>
        </Page>
    );
};

DashboardPage.routeName = '/home'

export default DashboardPage;

const Page = styled.div`
padding-right: 4rem;
`

const MainContainer = styled.div`
${Card} {
margin-bottom: 3rem;
}
`

const Charts = styled.div`
display: grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
grid-gap: 2rem;
`