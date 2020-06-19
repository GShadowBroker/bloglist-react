import React from 'react'
import '../styles/Login.css'

const Login = ({ handleLogin, username, password, stayLogged, setUsername, setPassword, setStayLogged }) => {
    return (
        <div className="login-form">
            <h1>Login to application</h1>
            <form onSubmit={ handleLogin }>
                <div className="input-group">
                    username <input 
                                type="text" 
                                name="username"
                                value={ username }
                                onChange={ ({ target }) => setUsername(target.value) }
                            />
                </div>
                <div className="input-group">
                    password <input 
                                type="password" 
                                name="password"
                                value={ password } 
                                onChange={ ({ target }) => setPassword(target.value) }
                            />
                </div>
                <div className="checkbox-group">
                    <input type="checkbox" value={ stayLogged } onChange={ () => setStayLogged(!stayLogged) } />
                    <label>Stay logged in?</label>
                </div>
                <div className="input-group">
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    )
}

export default Login