import { useDispatch, useSelector } from "react-redux";
import Blog from "./Blog";
import { likeBlog, removeBlog } from "../reducers/blog";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const addLikes = async (id, blog) => {
    dispatch(likeBlog(id, blog));
  };

  const deleteBlog = async (id) => {
    dispatch(removeBlog(id));
  };
  return (
    <>
      <div className="blog">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLikes={addLikes}
            deleteBlog={deleteBlog}
          />
        ))}
      </div>
      <br />
    </>
  );
};

export default Blogs;
