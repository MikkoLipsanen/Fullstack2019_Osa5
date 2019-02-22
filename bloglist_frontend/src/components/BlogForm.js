import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog, newTitle, handleTitleChange, newAuthor, handleAuthorChange, 
  newUrl, handleUrlChange, newLikes, handleLikesChange }) => (
  <div>
    <form onSubmit={addBlog}>
      <div>
        title: 
        <input 
          type="text"
          value={newTitle} 
          onChange={handleTitleChange}
        />
      </div>
      <div> 
        author: 
        <input 
          type="text"
          value={newAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div> 
        url: 
        <input 
          type="text"
          value={newUrl} 
          onChange={handleUrlChange}
        />
      </div>
      <div> 
        likes: 
        <input 
          type="text"
          value={newLikes} 
          onChange={handleLikesChange}
        />
      </div>
      <button type="submit">create</button>
    </form>  
  </div>
)

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  handleLikesChange: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
  newAuthor: PropTypes.string.isRequired,
  newUrl: PropTypes.string.isRequired,
  newLikes: PropTypes.string.isRequired,
}

export default BlogForm