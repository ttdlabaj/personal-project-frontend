import React, { useState, useEffect, useRef } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'

function AddTask({ addTask }) {

    const [name, setName] = useState('')
    const [goal, setGoal] = useState('')
    const [list, setList] = useState([])

    const [goalData, setGoalData] = useState([])
    const [listData, setListData] = useState([])

    const getGoals = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/dashboard/goals/')
            const { data } = response
            setGoalData(data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getGoals()
        // getLists()
    }, [])

    const addTaskHandler = e => {
        e.preventDefault()
        addTask({
            name,
            completed: false,
            list: list,
            goal,
        })
    }

    const handleListValue = e => {
        const target = e.target
        let value = target.name
        if (target.checked) {
            setList([value, ...list])
        }
    }

    // console.log('name', name)
    // console.log('goal', goal)
    // console.log('list', list)

    return (
        <Row className='add-task'>
            <Col md={12}>
                <Form onSubmit={addTaskHandler}>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Control type="text" placeholder="Add Task" onChange={e => setName(e.target.value)} />


                        <Form.Select aria-label="goal" onChange={e => setGoal(e.target.value)}>
                            <option>Choose Goal</option>
                            {goalData.map((goalItem, index) => (
                                <option key={index} value={goalItem.id} >{goalItem.name}</option>
                            ))}
                        </Form.Select>

                        <Button variant="primary" type="submit">
                            Add Task
                        </Button>
                    </Form.Group>

                </Form>
            </Col>
        </Row>
    )
}

export default AddTask
