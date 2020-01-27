import React, { useState } from 'react';
import axios from 'axios'

const Login = (props) => {
    const [input, setInput] = useState({
        form: {
            username: '',
            password: ''
        }
    })
    const [error, setError] = useState([])

    const handleChanges = e => {
        setInput({
            form: {
                ...input.form,
                [e.target.name]: e.target.value
            }
        })
    }

    const loginUser = e => {
        e.preventDefault()
        axios
            .post('http://localhost:5000/test/login', {
                username: input.form.username,
                password: input.form.password
            })
            .then(response => {
                console.log(response)
                localStorage.setItem('token', response.data.token)
                props.history.push('/testdata')
            })
            .catch(error => {
                console.log('error', error.response)
                setError(error.response.data)
            })
    }
    
    return ( 
        <div className="auth">
            <form>
                <label htmlFor="username"></label>
                <input
                    id="username"
                    placeholder="username"
                    type="text"
                    name="username"
                    autoComplete="off"
                    value={input.form.username}
                    onChange={handleChanges}
                >
                </input>
                <label htmlFor="password"></label>
                <input
                    id="password"
                    placeholder="password"
                    type="password"
                    name="password"
                    value={input.form.password}
                    onChange={handleChanges}
                >
                </input>
                {error ? <p className="error">{error}</p> : <p></p>}
                <button type="submit" onClick={loginUser}>Login</button>
            </form>
        </div>
     );
}
 
export default Login;