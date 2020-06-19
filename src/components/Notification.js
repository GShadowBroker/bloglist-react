import React from 'react'
import '../styles/Notification.css'
import { MdInfoOutline } from 'react-icons/md'

const Notification = ({ message }) => {
    return (
        <div className="notification">
            <MdInfoOutline /> { message }
        </div>
    )
}

export default Notification