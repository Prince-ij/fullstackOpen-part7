import { useEffect, useState } from "react";
import userService from './services/users'
import Blogs from "./components/Blogs";
import { CreateBlog } from "./components/CreateBlog";
import { LoginForm } from "./components/LoginForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { Notify } from "./reducers/notification";
import { initializeBlogs, makeBlog } from "./reducers/blog";
import { likeBlog, removeBlog } from "./reducers/blog";
import { initializeUser, loginUser, logout } from "./reducers/users";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Blog from "./components/Blog";
import Users from "./components/users";
import User from "./components/user";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const blogs = useSelector((state) => state.blogs);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(initializeUser());
  }, []);

  useEffect(() => {
    if (user) dispatch(initializeBlogs());
  }, [user]);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await userService.getUsers();
      setUsers(result);
    };
    fetchUsers();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    dispatch(loginUser(username, password));
  };

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(
      Notify({ type: "success", content: "User successfully logged out" })
    );
  };

  const addBlog = async (blog) => {
    dispatch(makeBlog(blog));
  };
  const addLikes = async (id, blog) => {
    dispatch(likeBlog(id, blog));
  };

  const deleteBlog = async (id) => {
    dispatch(removeBlog(id));
  };

  const padding = {
    padding: 5,
  };

  if (user === null) {
    return (
      <>
        <Container>
          <Notification />
          <h1 data-testid="login-header">Login to Application</h1>
          <LoginForm handleLogin={handleLogin} />
        </Container>
      </>
    );
  }
  return (
    <Container>
      <Router>
          <>
            <Link style={padding} to="/blogs">
              blogs
            </Link>
            <Link style={padding} to="/users">
              users
            </Link>
            {user.name} logged in <button onClick={handleLogOut}>logOut</button>
          </>
        <Notification />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h1>Welcome to BlogSky. </h1>
                <p>The Ultimate Blogging application</p>
              </>
            }
          />
          <Route
            path="/blogs"
            element={
              <>
                <h1>Blogs</h1>
                <Togglable buttonLabel="create a new blog">
                  <CreateBlog addBlog={addBlog} user={user} />
                </Togglable>
                <Blogs />
              </>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <Blog blogs={blogs} addLikes={addLikes} deleteBlog={deleteBlog} />
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User users={users} />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
