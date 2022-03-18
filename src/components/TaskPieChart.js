import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios'

ChartJS.register(ArcElement, Tooltip, Legend);

function TaskPieChart() {
    const [pieChartTaskData, setPieChartTaskData] = useState({})

    const pieChartGoals = () => {
        const gc = []
        axios
            .get('http://127.0.0.1:8000/dashboard/task/')
            .then(res => {
                const taskComplete = res.data.filter((x, i) => {
                    return x.completed
                }).length
                gc.push(taskComplete)

                const taskUncomplete = res.data.filter((x, i) => {
                    return !x.completed
                }).length
                gc.push(taskUncomplete)

                // setGoalUncompleted(goalsUncomplete)
                setPieChartTaskData({
                    labels: ['Complete', 'Not Completed'],
                    datasets: [{
                        label: '# of Tasks Completed',
                        data: gc,
                        backgroundColor: [
                            'rgba(0, 180, 0, 1)',
                            'rgba(46, 46, 46, 1)',
                        ],
                        borderColor: [
                            'rgba(0, 180, 0, 1)',
                            'rgba(46, 46, 46, 1)',
                        ],
                        borderWidth: 1,
                    }]
                })
            })
            .catch(err => {
                console.log(err)
            })
        console.log(gc)


    }

    useEffect(() => {
        pieChartGoals()
    }, [])


    return (
        <div>
            <p className="stat-header">Tasks Completed</p>
            <Pie data={pieChartTaskData} />
        </div>
    )
}

export default TaskPieChart
