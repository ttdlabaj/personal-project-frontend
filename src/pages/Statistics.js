import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios'
import GoalsPieChart from '../components/GoalsPieChart';
import GoalsBarChart from '../components/GoalsBarChart';
import TaskPieChart from '../components/TaskPieChart';
import TaskBarChart from '../components/TaskBarChart'

ChartJS.register(ArcElement, Tooltip, Legend);

function Statistics() {

    return (
        <div className="stats">
            <Row>
                <h1 className="header">Statistics</h1>
            </Row>
            <Row className="stat-row">
                <Col>
                    <GoalsPieChart />
                </Col>
                <Col>
                    <TaskPieChart />
                </Col>
            </Row>
            <Row className="stat-row">
                <Col>
                    <GoalsBarChart />
                </Col>
                <Col>
                    <TaskBarChart />
                </Col>
            </Row>
        </div>
    )
}

export default Statistics
