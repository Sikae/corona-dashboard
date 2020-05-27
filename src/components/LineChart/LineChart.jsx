import React, {useState, useEffect} from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './LineChart.module.css';

const LineChart = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        
        fetchAPI();
    }, []);
    const lineChart = (
        dailyData.length ? (
            <Line
            data={{
                labels: dailyData.map(({ date }) => date), 
                datasets: [{
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                }, {
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    fill: true,
                }],
            }}
            />
        ) : null
    );
    console.log(confirmed, recovered, deaths);

    return (
        <div className={styles.container}>
            {lineChart}
        </div>
    )
}

export default LineChart;
