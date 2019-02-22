import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login' 
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) 
  const [notification, setNotification] = useState({
    message: null
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: null }), 10000)
  }

  const addBlog = (event) => {
    event.preventDefault()
      const blogObject = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        likes: newLikes
      }

      blogService
        .create(blogObject).then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewTitle('')
          setNewAuthor('')
          setNewUrl('')
          setNewLikes('')
          notify(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        })
        .catch(error => {
          notify(`Blog creation failed`, 'error')        
        })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notify(`${user.name} logged in`)
    } catch (exception) {
      notify(`Wrong username or password`, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    notify(`${user.name} logged out`)
  }

  const rows = () => blogs.map(blog =>
    <Blog 
      key={blog.id} 
      blog={blog}
    />
  )

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleLikesChange = (event) => {
    setNewLikes(event.target.value)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div>
      {user === null ?
        <div>
          <h2>Log in to application</h2>
          <Notification notification={notification} />
          <LoginForm 
            notification={notification} 
            handleLogin={handleLogin} 
            password={password} 
            handleUsernameChange={handleUsernameChange} 
            handlePasswordChange={handlePasswordChange} /> 
        </div> :
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>{user.name} logged in</p>
          <button onClick = {handleLogout}>logout </button>
          <Togglable buttonLabel="new blog">
            <BlogForm 
              addBlog={addBlog} 
              newTitle={newTitle} 
              handleTitleChange={handleTitleChange}
              newAuthor={newAuthor} 
              handleAuthorChange={handleAuthorChange} 
              newUrl={newUrl} 
              handleUrlChange={handleUrlChange}
              newLikes={newLikes} 
              handleLikesChange={handleLikesChange} 
            />
          </Togglable>
          <ul>
            {rows()}
          </ul> 
        </div>
      }
    </div>
  )
}

export default App