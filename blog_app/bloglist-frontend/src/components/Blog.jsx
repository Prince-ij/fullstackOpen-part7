import { useState, useEffect } from "react";
import userService from '../services/users'
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addComment } from "../reducers/blog";

const Blog = ({ blogs, addLikes, deleteBlog }) => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)


  useEffect(() => {
    const getUser = async () => {
      const response = await userService.getUser(blog.user)
      setUser(response)
    }
    getUser()
  }, [])

  const comment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    dispatch(addComment(blog.id, comment))
  }

  const handleLikes = () => {
    addLikes(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    });
  };

  const handleDelete = () => {
    if (confirm("are you sure you wanna delete this blog")) deleteBlog(blog.id);
  };


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle} className="blogs">
      <h1 style={{ margin: 0 }}>
        {blog.title} by {blog.author + " "}
      </h1>
      <br />
      <a href="{blog.url}" data-testid="url">
        {blog.url}
      </a>
      <p data-testid="likes">
        <span data-testid="likes-count">{blog.likes}</span> likes
        <button onClick={handleLikes}>like</button>
      </p>
      {user && <p>added by {user.name}</p>}
      <button onClick={handleDelete}>remove</button>

      <h3>Comments</h3>
      <form onSubmit={comment}>
        <input type="text" name="comment" />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, idx) => {
          return <li key={idx}>{comment}</li>;
        })}
      </ul>
    </div>
  );
};

export default Blog;
