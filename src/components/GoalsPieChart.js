import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios'

ChartJS.register(ArcElement, Tooltip, Legend);

function GoalsPieChart({ goals, setGoals, task, setTask }) {

    const [pieChartGoalsData, setPieChartGoalsData] = useState({})

    const pieChartGoals = () => {
        const gc = []
        axios
            .get('http://127.0.0.1:8000/dashboard/goals/')
            .then(res => {
                const goalsComplete = res.data.filter((x, i) => {
                    return x.completed
                }).length
                gc.push(goalsComplete)

                const goalsUncomplete = res.data.filter((x, i) => {
                    return !x.completed
                }).length
                gc.push(goalsUncomplete)

                // setGoalUncompleted(goalsUncomplete)
                setPieChartGoalsData({
                    labels: ['Complete', 'Not Completed'],
                    datasets: [{
                        label: '# of Goals Completed',
                        data: gc,
                        backgroundColor: [
                            'rgba(213, 120, 0, 1)',
                            'rgba(7, 29, 72, 1)',
                        ],
                        borderColor: [
                            'rgba(213, 120, 0, 1)',
                            'rgba(7, 29, 72, 1)',
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
        pieChartGoals()
    }, [])

    return (
        <div>
            <p className="stat-header">Goals Completed</p>
            <Pie data={pieChartGoalsData} />
        </div>
    )
}

export default GoalsPieChart
