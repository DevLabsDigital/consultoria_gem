import React from 'react';
import {Bar} from "react-chartjs-2";
import CardWithHeader from "../../components/CardWithHeader";
import SimpleRow from "../../components/SimpleRow";
import MyDatePicker from "../../components/MyDatePicker";


const HistoryChart = () => {

    const historyChartData = {
        labels: ['Jul 2019', 'Ago 2019', 'Set 2019', 'Out 2019', 'Nov 2019'],
        datasets: [
            {
                label: 'Previsto',
                data: [30, 60, 20, 10, 5],
                backgroundColor: '#617e94',
                stack: 'stack0'
            },
            {
                label: 'Em andamento',
                data: [20, 10, 70, 50, 20],
                backgroundColor: '#0099d8',
                stack: 'stack0'
            },
            {
                label: 'Atrasado',
                data: [30, 35, 20, 15, 2],
                backgroundColor: '#ed1c24',
                stack: 'stack0'
            },
            {
                label: 'Concluido',
                data: [15, 30, 10, 50, 80],
                backgroundColor: '#009c53',
                stack: 'stack0'
            },

        ]
    }

    return (
        <CardWithHeader
            header={
                <>
                    HISTÓRICO
                    <SimpleRow>
                        <div style={{marginRight: '1rem'}}>
                            <MyDatePicker placeholder={'Data inicial'}/>
                        </div>
                        <MyDatePicker placeholder={'Data final'}/>
                    </SimpleRow>
                </>
            }
        >
            <Bar
                data={historyChartData}
                width={100}
                height={200}
                legend={null}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{stacked: true, gridLines: {display: false}}],
                        yAxes: [{stacked: true, gridLines: {display: false}, ticks: {display: false}}],
                    }
                }}
            />
        </CardWithHeader>
    );
};

export default HistoryChart;