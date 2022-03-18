import React, { useState } from 'react'
import { Row, Col, Form, Modal, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

function Goal({ id, name, completeGoal, deleteGoal, editGoal }) {
    const [show, setShow] = useState(false);
    const [newName, setName] = useState(name)

    const handleClose = () => {
        setShow(false)
        setName(name)
    };
    const handleShow = () => setShow(true);

    const editGoalHandler = (name) => {
        handleClose()
        const goal = {
            id,
            name,
            tasks: []
        }
        editGoal(goal)
        setName(name)
    }

    return (
        <>
            <Row className='task-item goals'>
                <Col md={1}><Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" onChange={() => completeGoal(id)} />
                </Form.Group>
                </Col>
                <Col>
                    <p className="task-title">{name}</p>
                </Col>
                <Col md={2} className='edit-icons'>
                    <span className="e-icons" onClick={handleShow}><FontAwesomeIcon icon={faPen} /></span>
                    <span className="d-icons" onClick={() => deleteGoal(id)}><FontAwesomeIcon icon={faTrashAlt} /></span>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Goal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Control type="text" value={newName} onChange={e => setName(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => editGoalHandler(newName)}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Goal
