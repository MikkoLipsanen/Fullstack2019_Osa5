import React from 'react'

const BlogForm = (props) => (
  <div>
    <form onSubmit={props.addBlog}>
      <div>
        title: 
          <input 
          type="text"
          value={props.newTitle} 
          onChange={props.handleTitleChange}
        />
      </div>
      <div> 
        author: 
          <input 
          type="text"
          value={props.newAuthor}
          onChange={props.handleAuthorChange}
        />
      </div>
      <div> 
        url: 
          <input 
          type="text"
          value={props.newUrl} 
          onChange={props.handleUrlChange}
        />
      </div>
      <div> 
        likes: 
          <input 
          type="text"
          value={props.newLikes} 
          onChange={props.handleLikesChange}
        />
      </div>
      <button type="submit">create</button>
    </form>  
  </div>
)

export default BlogForm