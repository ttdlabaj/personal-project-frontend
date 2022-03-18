import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import AddTask from '../components/AddTask'
import Task from '../components/Task'

import axios from 'axios'

function MasterTasksPage({ task, setTask }) {

    const getTask = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/dashboard/task/')
            const { data } = response
            setTask(data)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getTask()
    }, [])

    const addTask = async newTask => {
        console.log(newTask)
        try {
            await axios.post('http://127.0.0.1:8000/dashboard/task/', newTask)
            getTask()
        } catch (err) {
            console.log(err)
        }
    }


    const completeTask = async id => {
        try {
            const taskItem = task.filter(item => item.id === id)[0]
            taskItem.completed = true
            await axios.put(`http://127.0.0.1:8000/dashboard/task/${id}/`, taskItem)
            getTask()
        } catch (err) {
            console.log(err)
        }
    }

    const editTask = async task => {
        try {
            await axios.put(`http://127.0.0.1:8000/dashboard/task/${task.id}/`, task)
            getTask()
        } catch (err) {
            console.log(err)
        }
    }

    const deleteTask = async id => {
        try {
            await axios.delete(`http://127.0.0.1:8000/dashboard/task/${id}/`)
            getTask()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1 className="header">Master Task List</h1>
            <AddTask addTask={addTask} />
            {task.map((item, index) => (
                !item.completed && <Task showedit={true} key={index} id={item.id} name={item.name} goal={item.goal} list={item.list} completeTask={completeTask} deleteTask={deleteTask} editTask={editTask} />
            ))}
        </div>
    )
}

export default MasterTasksPage
