import React, { useEffect, useState } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'
import CreateBlog from './CreateBlog'

const Blogs = (props) => {
  const [blogs, setBlogs] = useState([])
  const [display, setDisplay] = useState(false)
  const [success, setSuccess] = useState('')

  const button = { display: display ? 'none' : '' }

  const form = { display: display ? '' : 'none' }

  useEffect(() => {
    showBlogs()
  }, [])

  const showBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location = null
  }

  const displayForm = () => {
    setDisplay(true)
  }

  const cancel = () => {
    setDisplay(false)
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const forATest = true

  return (
    <div>
      <div style={{ color: 'green', fontSize: 20, marginBottom: 10 }}>
        {success}
      </div>
      <p>{props.username} logged in
        <button onClick={logout}>logout</button></p>
      <div style={button}>
        <button onClick={displayForm}>create new blog</button>
      </div>
      <div style={form}>
        <CreateBlog
          showBlogs={showBlogs}
          setDisplay={setDisplay}
          setSuccess={setSuccess}
        />
        <button onClick={cancel}>cancel</button>
      </div>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          showBlogs={showBlogs}
          name={props.name}
          allUsers={props.allUsers}
          forATest={forATest} />
      )}
    </div>
  )
}

export default Blogs