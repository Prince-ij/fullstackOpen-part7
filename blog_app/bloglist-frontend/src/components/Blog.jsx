import { useState } from "react";

const Blog = ({ blog, addLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

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

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const showWhenVisible = { display: visible ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle} className="blogs">
      <p style={{ margin: 0 }}>
        {blog.title} {blog.author + " "}
        <button onClick={toggleVisible}>{visible ? "hide" : "view"}</button>
      </p>
      <div style={showWhenVisible}>
        <p data-testid="url">{blog.url}</p>
        <p data-testid="likes">
          likes <span data-testid="likes-count">{blog.likes}</span>
          <button onClick={handleLikes}>like</button>
        </p>
        {blog.user.name}
        <br />
        <button onClick={handleDelete}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
