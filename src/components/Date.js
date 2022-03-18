import React from 'react'
import moment from 'moment';

function Date() {
    let myDate = moment().format("dddd, MMMM Do YYYY, h:mm a")
    return (
        <div className='date'>
            <p><span>Date: </span>{myDate}</p>
        </div>
    )
}

export default Date
