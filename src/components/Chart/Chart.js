import { Bar } from 'react-chartjs-2';
import React from 'react'

const chart = (props) =>{
    let totalData = {
        labels: [],
        datasets: [
            {
                label: 'cotação',
                data: [],
                backgroundColor: '#00a59d'
            }
        ]
    }
    const chartData = props.historicValues.map(value => {
        return ((value.high + value.low) / 2)
    })  
    const chartLabels = props.historicValues.map(value => {
        return ''
    })
    totalData.datasets[0].data = chartData
    totalData.labels = chartLabels
    if (chartData.lenght === 0) 
        return null
    else
        return(
            <Bar 
                data={totalData}
                options={{ maintainAspectRatio: false }} />
            )
        
}
export default chart;