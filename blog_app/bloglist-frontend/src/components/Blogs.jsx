import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";


const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  return (
    <>
      <div className="blog">
        <List sx={{ bgcolor: "background"}}>
          {blogs.map((blog) => (
            <ListItem key={blog.id} alignItems="flex-start">
              <Link to={`/blogs/${blog.id}`} style={{"text-decoration": "none"}}>{blog.title}</Link>
            </ListItem>
          ))}
        </List>
      </div>
      <br />
    </>
  );
};

export default Blogs;
