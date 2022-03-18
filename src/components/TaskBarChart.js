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

function TaskBarChart() {

    const [barChartTaskData, setBarChartTaskData] = useState({})

    const barChartTasks = () => {
        const count = {}
        let day = []
        let quantity = []
        axios
            .get('http://127.0.0.1:8000/dashboard/task/')
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
                setBarChartTaskData({
                    labels: day,
                    datasets: [{
                        label: '# of Tasks Created',
                        data: quantity,
                        backgroundColor: [
                            'rgba(0, 180, 0, 1)',

                        ],
                        borderColor: [
                            'rgba(0, 180, 0, 1)',
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
        barChartTasks()
    }, [])

    return (
        <div>
            <p className="stat-header"># of Tasks Created</p>
            <Bar data={barChartTaskData} />
        </div>
    )
}

export default TaskBarChart
