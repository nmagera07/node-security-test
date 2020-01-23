import React from 'react';
import { Link } from 'react-router-dom'

const Nav = (props) => {
    const token = localStorage.getItem('token')

    const logout = () => {
        localStorage.removeItem('token')
        props.history.push('/')
    }


    return (
        <div className="nav">
            <nav>
                {!token ? ( 
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                ) : 
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/testdata">Test Data</Link>
                        <button onClick={logout}>Logout</button>
                    </div>
                }
            </nav>
        </div>
    )
}
 
export default Nav;