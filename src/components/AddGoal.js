import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

function AddGoal({ addGoal }) {
    const [name, setName] = useState('')

    const addGoalHandler = e => {
        e.preventDefault()
        addGoal({
            name,
            completed: false,
            tasks: []
        })
    }

    return (
        <Row className='add-goal'>
            <Col md={12}>
                <Form onSubmit={addGoalHandler}>
                    <Form.Group className="mb-3" controlId="">
                        <Form.Control type="text" placeholder="Add Goal" onChange={e => setName(e.target.value)} />
                        <Button variant="primary" type="submit">
                            Add Goal
                        </Button>
                    </Form.Group>

                </Form>
            </Col>
        </Row>
    )
}

export default AddGoal
