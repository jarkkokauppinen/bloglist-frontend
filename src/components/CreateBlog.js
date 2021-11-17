import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlog = async (event) => {
    event.preventDefault()
    props.setDisplay(false)
    const newBlog = { title: title, author: author, url: url, likes: 0 }

    try {
      await blogService.create(newBlog)
      props.setSuccess(`a new Blog ${title} by ${author} added`)
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(() => {
        props.setSuccess(null)
      }, 3500)
    }
    catch (error) {
      console.log(error)
    }
    props.showBlogs()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newBlog}>
        <div>
          title:
          <input type='text'
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input type='text'
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input type='text'
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='createNew' type='submit'>create</button><br></br>
      </form>
    </div>
  )
}

export default CreateBlog