import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }

  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    notify(`${user.name} logged out`)
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

  const rows = () => blogs.map(blog =>
    <Blog 
      key={blog.id} 
      blog={blog}
    />
  )

  const loginForm = () => (
    <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            salasana
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
  )

  const blogForm = () => (
    <div>
      <form onSubmit={addBlog}>
        <div>
          title: 
            <input 
            type="text"
            value={newTitle} 
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div> 
          author: 
            <input 
            type="text"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div> 
          url: 
            <input 
            type="text"
            value={newUrl} 
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <div> 
          likes: 
            <input 
            type="text"
            value={newLikes} 
            onChange={({ target }) => setNewLikes(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>  
    </div>
  )

  return (
    <div>
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>{user.name} logged in</p>
          <button onClick = {handleLogout}>logout </button>
          <h2>create new</h2>
            {blogForm()}
          <ul>
            {rows()}
          </ul> 
        </div>
      }
    </div>
  )
}

export default App