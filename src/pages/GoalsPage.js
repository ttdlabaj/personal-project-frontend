import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import AddGoal from '../components/AddGoal'
import Goal from '../components/Goal'
import axios from 'axios'


function GoalsPage({ goals, setGoals }) {
    console.log('goals', goals)

    const getGoals = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/dashboard/goals/')
            const { data } = response
            setGoals(data)
        } catch (err) {
            console.log(err)
        }
    }
    console.log('goals goalspage', goals)

    useEffect(() => {
        getGoals()
    }, [])

    const addGoal = async newGoal => {
        try {
            await axios.post('http://127.0.0.1:8000/dashboard/goals/', newGoal)
            getGoals()
        } catch (err) {
            console.log(err)
        }
    }

    const completeGoal = async id => { 
        console.log('id', id)       
        try {
            const goal = goals.filter(goal => goal.id === id)[0]

            goal.completed = true
            await axios.put(`http://127.0.0.1:8000/dashboard/goals/${id}/`, goal)
            getGoals()
        } catch (err) {
            console.log(err)
        }
    }

    const editGoal = async goal => {
        try {
            await axios.put(`http://127.0.0.1:8000/dashboard/goals/${goal.id}/`, goal)
            getGoals()
        } catch (err) {
            console.log(err)
        }

    }

    const deleteGoal = async id => {
        try {
            await axios.delete(`http://127.0.0.1:8000/dashboard/goals/${id}/`)
            getGoals()
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <div className="goalspage">
            <h1 className="header">Add Your Goals</h1>
            <AddGoal addGoal={addGoal} />
            {goals.map((goal, index) => (
                !goal.completed && <Goal key={index} id={goal.id} name={goal.name} completeGoal={completeGoal} deleteGoal={deleteGoal} editGoal={editGoal} />
            ))}
        </div>
    )
}

export default GoalsPage
