import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function GoalsBarChart() {

    const [barChartGoalsData, setBarChartGoalsData] = useState({})

    const barChartGoals = () => {
        const count = {}
        let day = []
        let quantity = []
        axios
            .get('http://127.0.0.1:8000/dashboard/goals/')
            .then(res => {
                console.log(res.data)
                let newData = res.data
                if (typeof (newData) == "string") { newData = JSON.parse(newData) }
                newData.forEach(function (element) {
                    count[element['created_at']] = (count[element['created_at']] || 0) + 1
                    console.log(element);
                })
                day = Object.keys(count)
                quantity = Object.values(count)
                console.log(day, quantity)
                // day.push(count[])

                // setGoalUncompleted(goalsUncomplete)
                setBarChartGoalsData({
                    labels: day,
                    datasets: [{
                        label: '# of Goals Created',
                        data: quantity,
                        backgroundColor: [
                            'rgba(213, 120, 0, 1)',

                        ],
                        borderColor: [
                            'rgba(213, 120, 0, 1)',

                        ],
                        borderWidth: 1,
                    }]

                })


            })
            .catch(err => {
                console.log(err)
            })

    }

    useEffect(() => {
        barChartGoals()
    }, [])


    return (
        <div>
            <p className="stat-header"># of Goals Created</p>
            <Bar data={barChartGoalsData} />
        </div>
    )
}

export default GoalsBarChart
