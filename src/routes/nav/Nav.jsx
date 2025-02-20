import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to={"/"}>Home</Link>
                </li>
                <li>
                    <Link to={"/login"}>Login</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Nav