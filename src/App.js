import React, { useState } from 'react'
import LoginForm from './components/LoginForm'
import Parent from './components/Parent'
import loginService from './services/login'
import blogService from './services/blogs'
import userService from './services/users'
import Blogs from './components/Blogs'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [name, setName] = useState('')
  const [allUsers, setAllUsers] = useState([])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      setUser(user.token)
      setUsername(user.name)
      setName(user.username)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      getAllUsers()
    }
    catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 3500)
    }
  }

  const getAllUsers = () => {
    userService.getAll().then(user =>
      setAllUsers(user)
    )
  }

  const loginForm = () => (
    <Parent>
      <LoginForm
        username={username}
        password={password}
        message={message}
        setUsername={({ target }) => setUsername(target.value)}
        setPassword={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Parent>
  )

  const blogForm = () => (
    <Parent>
      <Blogs
        username={username}
        name={name}
        allUsers={allUsers}
      />
    </Parent>
  )

  return (
    <div>
      <h1>blogs</h1>

      {user === null ? loginForm() : blogForm()}

    </div>
  )
}

export default App