import React, { useState } from 'react';
import axios from 'axios'

const Register = (props) => {

    const [input, setInput] = useState({
        form: {
            email: '',
            username: '',
            password: ''
        }
    })
    const [error, setError] = useState([])
    const [otherError, setOtherError] = useState("")

    const handleChanges = e => {
        setInput({
            form: {
                ...input.form,
                [e.target.name]: e.target.value
            }
        })
    }

    const registerUser = e => {
        e.preventDefault()
        axios
            .post('http://localhost:5000/test/register', {
                email: input.form.email,
                username: input.form.username,
                password: input.form.password
            })
            .then(response => {
                console.log(response)
                localStorage.setItem('token', response.data.token)
                props.history.push('/testdata')
            })
            .catch(error => {
                console.log('error', error.response.data.message)
                if (error.response.status === 500) {
                    setOtherError(error.response.data.message)
                } else {
                    setError(error.response.data.errors)
                }
            })
    }
    
    return ( 
        <div>
            <form autoComplete="off">
                <input
                    placeholder="email"
                    type="email"
                    name="email"
                    autoComplete="false"
                    value={input.form.email}
                    onChange={handleChanges}
                >
                </input>
                <input
                    placeholder="username"
                    type="text"
                    name="username"
                    autoComplete="off"
                    value={input.form.username}
                    onChange={handleChanges}
                >
                </input>
                
                <input
                    placeholder="password"
                    type="password"
                    name="password"
                    value={input.form.password}
                    onChange={handleChanges}
                >
                </input>
                {error ? error.map(err => {
                    return <div>
                        <p className="error">{err.msg}</p>
                    </div>
                }) : null}
                <button type="submit" onClick={registerUser}>Register</button>
            </form>
        </div>
     );
}
 
export default Register;