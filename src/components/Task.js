import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'

function Task({ id, name, goal, list, completeTask, deleteTask, editTask }) {

    const [show, setShow] = useState(false);
    const [newName, setName] = useState(name)
    const [newGoal, setGoal] = useState(goal)
    const [goalData, setGoalData] = useState([])

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
    }, [])

    const handleClose = () => {
        setShow(false)
        setName(name)
        setGoal(goal)
    };

    const handleShow = () => {
        setShow(true)
    };

    const editTaskHandler = (name, goal) => {
        handleClose()
        const task = {
            id,
            name,
            completed: false,
            goal,
        }
        editTask(task)
        setName(name)
    }

    return (
        <>
            <Row className='task-item'>
                <Col md={1}><Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" onChange={() => completeTask(id)} />
                </Form.Group>
                </Col>
                <Col>
                    <p className="task-title">{name}</p>
                </Col>
                <Col md={2} className='edit-icons'>
                    <span className="e-icons" onClick={handleShow}><FontAwesomeIcon icon={faPen} /></span>
                    <span className="d-icons" onClick={() => deleteTask(id)}><FontAwesomeIcon icon={faTrashAlt} /></span>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Control type="text" value={newName} onChange={e => setName(e.target.value)} />


                            <Form.Select aria-label="goal" value={newGoal} onChange={e => setGoal(e.target.value)}>
                                <option>Choose Goal</option>
                                {goalData.map((goalItem, index) => (
                                    <option key={index} value={goalItem.id} >{goalItem.name}</option>
                                ))}
                            </Form.Select>

                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => editTaskHandler(newName, newGoal)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Task
