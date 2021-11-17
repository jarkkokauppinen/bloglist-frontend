import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = (props) => {
  const [display, setDisplay] = useState(false)
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const checkUser = () => {
    const user = props.allUsers.filter(user =>
      user.username === props.name)

    user[0].id === props.blog.user.id ? setVisible(true) : setVisible(false)
  }

  const displayAll = () => {
    if (props.forATest) {
      checkUser()
    }
    display ? setDisplay(false) : setDisplay(true)
  }

  const addLike = async () => {
    const updatedBlog = {
      user: props.blog.user,
      likes: props.blog.likes + 1,
      author: props.blog.author,
      title: props.blog.title,
      url: props.blog.url
    }

    try {
      await blogService.update(props.blog.id, updatedBlog)
    }
    catch (error) {
      console.log(error)
    }
    props.showBlogs()
  }

  const removeBlog = async () => {
    try {
      if (window.confirm(`Remove blog ${props.blog.title} by ${props.blog.author}`)) {
        await blogService.deleteBlog(props.blog.id)
      }
    }
    catch (error) {
      console.log(error)
    }
    props.showBlogs()
  }

  if (display) {
    return (
      <div className='blogs' style={blogStyle}>
        {props.blog.title} {props.blog.author}
        <button onClick={displayAll}>hide</button>
        <div>
          {props.blog.url}
          <div>
              likes {props.blog.likes}
            <button className='like' onClick={addLike}>like</button>
            <div>
              {props.blog.user.name}
              <div style={showWhenVisible}>
                <button className='remove' onClick={removeBlog}>remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='blogs' style={blogStyle}>
      {props.blog.title} {props.blog.author}
      <button className='view' onClick={displayAll}>view</button>
    </div>
  )
}

export default Blog