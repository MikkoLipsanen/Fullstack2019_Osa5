import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog, title, author, url, likes }) => (
  <div>
    <form onSubmit={addBlog}>
      <div>
        title: 
        <input {...title} />
      </div>
      <div> 
        author: 
        <input {...author} />
      </div>
      <div> 
        url: 
        <input {...url} />
      </div>
      <div> 
        likes: 
        <input {...likes} />
      </div>
      <button type="submit">create</button>
    </form>  
  </div>
)

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  likes: PropTypes.object.isRequired,
}

export default BlogForm