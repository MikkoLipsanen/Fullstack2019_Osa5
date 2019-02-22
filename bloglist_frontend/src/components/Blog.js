import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, remove }) => {
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
            addLike(blog.id)
          }}>like </button>
          <br />
          <p>added by {blog.user.name}</p>
          <button onClick={(event) => {
            event.stopPropagation()
            remove(blog.id)
          }}>remove</button>
        </div>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}

export default Blog