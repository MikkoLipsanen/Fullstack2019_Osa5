import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [show, setShow] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => setShow(!show)}>
        {blog.title} {blog.author}
        {show && <div>
          <a href={blog.url}>{blog.url}</a>
          <br />
          <p>{blog.likes} likes</p>
          <button onClick={(event) => {
            event.stopPropagation()
            console.log('like')
          }}>like </button>
          <br />
          <p>added by {blog.user.name}</p>
        </div>}
      </div>
    </div>
  )
}

export default Blog