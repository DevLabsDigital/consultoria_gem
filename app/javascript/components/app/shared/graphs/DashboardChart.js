import React from 'react';
import styled from "styled-components";
import VerticalDivider from "../../components/VerticalDivider";
import SimpleRow from "../../components/SimpleRow";
import {TextNormal} from "../../styles/Typography";
import {Doughnut} from 'react-chartjs-2';
import CardWithHeader from "../../components/CardWithHeader";
import Button from "../../components/buttons/Button";

const DashboardChart = () => {
    return (
        <CardWithHeader
            header={
                <>
                    DASHBOARD
                    <DownloadButton><i className="fas fa-download"/>Download</DownloadButton>
                </>
            }
        >
            <DashboardChartContainer>
                <ChartContainer>
                    <Doughnut data={{
                        labels: [
                            'Previsto',
                            'Em andamento',
                            'Atrasado',
                            'Concluido',
                        ],
                        datasets: [
                            {
                                data: [35, 25, 15, 25],
                                backgroundColor: ['#ed1c24', '#0099d8', '#009c53', '#617e94'],
                            }
                        ]
                    }} options={{
                        legend: undefined,
                        elements: {
                            arc: {
                                borderWidth: 0,
                            },
                        },
                        cutoutPercentage: 40,
                        maintainAspectRatio: false
                    }}/>
                </ChartContainer>
                <VerticalDivider/>
                <div>
                    <DescriptionLabels><CircleCinza/> Previsto</DescriptionLabels>
                    <DescriptionLabels><CircleAzul/> Em andamento</DescriptionLabels>
                    <DescriptionLabels><CircleVermelho/> Atrasado</DescriptionLabels>
                    <DescriptionLabels><CircleVerde/> Concluído</DescriptionLabels>
                </div>
            </DashboardChartContainer>
        </CardWithHeader>
    );
};

export default DashboardChart;

const DashboardChartContainer = styled.div`
display: grid;
grid-template-columns: 1fr 3rem 1fr;
padding: 1rem 0;
align-items: center;
`

const DescriptionLabels = styled(SimpleRow)`
color: ${({theme}) => theme.darkColor};
font-size: 1.4rem;
letter-spacing: 0.7px;
${TextNormal};
margin-bottom: 1.5rem;
`

const Circle = styled.div`
width: 1.4rem;
height: 1.4rem;
border-radius: 50%;
margin-right: 1rem;
`

const CircleCinza = styled(Circle)`
background-color: ${({theme}) => theme.darkColor};
`

const CircleVermelho = styled(Circle)`
background-color: #ed1c24;
`

const CircleAzul = styled(Circle)`
background-color: #0099d8;
`

const CircleVerde = styled(Circle)`
background-color: ${({theme}) => theme.green};
`

const ChartContainer = styled.div`
width: 18rem;
height: 18rem;
`

const DownloadButton = styled(Button)`
background-color: ${({theme}) => theme.blueLight};

i {
font-size: 1.6rem;
}
`