import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  message,
  handleLogin,
  username,
  setUsername,
  password,
  setPassword
}) => {

  return (
    <div>
      <h2>Log in to application</h2>
      <div id='message' style={{ color: 'red', fontSize: 20, marginBottom: 10 }}>
        {message}
      </div>
      <form onSubmit={handleLogin}>
        <div>
        username:
          <input type='text'
            id='username'
            value={username}
            name='Username'
            onChange={setUsername}/>
        </div>
        <div>
        password:
          <input type='password'
            id='password'
            value={password}
            name='Password'
            onChange={setPassword}/>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  message: PropTypes.string,
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm