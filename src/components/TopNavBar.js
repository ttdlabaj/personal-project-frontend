import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import GoogleButton from './GoogleButton'

function TopNavBar({ isUserSignedIn, setIsUserSignedIn }) {
    return (
        <Navbar expand="lg">
            <Container className='pp'>
                <Link to='/'><Navbar.Brand>Productivity<span className="orange">APP</span></Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {isUserSignedIn && <Link to='/dashboard'><Nav>Dashboard</Nav></Link>}
                        {isUserSignedIn && <Link to='/goals'><Nav>Goals</Nav></Link>}
                        {isUserSignedIn && <Link to='/task-list'><Nav>Task List</Nav></Link>}
                        {isUserSignedIn && <Link to='/stats'><Nav>Statistics</Nav></Link>}
                        <GoogleButton isUserSignedIn={isUserSignedIn} setIsUserSignedIn={setIsUserSignedIn} />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default TopNavBar
