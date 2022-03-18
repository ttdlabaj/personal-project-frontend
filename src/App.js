import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GoalsPage from './pages/GoalsPage'
import ErrorPage from './pages/ErrorPage';
import TopNavBar from './components/TopNavBar';
import { Container } from 'react-bootstrap'
import Date from './components/Date'
import DailyTasksPage from './pages/DailyTasksPage';
import MasterTasksPage from './pages/MasterTasksPage'
import { useState, useEffect } from 'react'
import Statistics from './pages/Statistics';
import { authentication } from './firebase-config';
import { onAuthStateChanged } from "firebase/auth";
import axios from 'axios'


function App() {
  const [goals, setGoals] = useState([])
  const [task, setTask] = useState([])

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

  const getGoals = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/dashboard/goals/')
      const { data } = response
      setGoals(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getGoals()
  }, [])

  //google sign in state
  const [isUserSignedIn, setIsUserSignedIn] = useState(null)

  onAuthStateChanged(authentication, (user) => {
    if (user) {
      const uid = user.uid;
      setIsUserSignedIn(true)
    } else {
      setIsUserSignedIn(false)
    }
  });

  if (isUserSignedIn === true) {
    return (
      <Router>
        <Container className='pp'>
          <TopNavBar isUserSignedIn={isUserSignedIn} setIsUserSignedIn={setIsUserSignedIn} />
          <Date />
          <Routes>
            <Route path='/' element={<HomePage isUserSignedIn={isUserSignedIn} setIsUserSignedIn={setIsUserSignedIn} />} />
            <Route path='/goals' element={<GoalsPage goals={goals} setGoals={setGoals} />} />
            <Route path='/dashboard' element={<DailyTasksPage goals={goals} setGoals={setGoals} task={task} setTask={setTask} />} />
            <Route path='/task-list' element={<MasterTasksPage task={task} setTask={setTask} />} />
            <Route path='/stats' element={<Statistics goals={goals} setGoals={setGoals} task={task} setTask={setTask} />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </Container>
      </Router>
    );
  } else {
    return (
      <Router>
        <Container className='pp'>
          <TopNavBar />
          <Date />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </Container>
      </Router>
    );
  }  
}

export default App;
