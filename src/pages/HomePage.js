import React from 'react'
import QuotesAPI from '../api/QuotesAPI'
import { useEffect, useState } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import GoogleButton from '../components/GoogleButton'

function HomePage({ isUserSignedIn, setIsUserSignedIn }) {
    const [text, setText] = useState('')
    const [author, setAuthor] = useState('')

    useEffect(() => {
        async function getData() {
            try {
                const jsonResponse = await QuotesAPI.fetchQuote()
                let randomNum = Math.floor(Math.random() * jsonResponse.length)
                let randomQuote = jsonResponse[randomNum]
                setText(randomQuote.text)
                setAuthor(randomQuote.author)
            } catch (error) {
                console.log(error)
            }
        }
        getData();
    }, [])


    return (
        <Row>
            <Col sm={12}>
                <div className='quote-block'>
                    <p className='quote'>"{text}"</p>
                    <p className='author'>{author}</p>                    
                </div>
            </Col>
        </Row>
    )
}

export default HomePage
