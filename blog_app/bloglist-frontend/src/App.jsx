import { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import { CreateBlog } from "./components/CreateBlog";
import { LoginForm } from "./components/LoginForm";
import Togglable from "./components/Togglable";
import Notification from "./components/Notification";
import { useDispatch, useSelector} from "react-redux";
import { initializeBlogs, makeBlog} from "./reducers/blog";
import { initializeUser, loginUser, logout } from "./reducers/users";

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)

  useEffect(() => {
    dispatch(initializeUser())
  }, []);

  useEffect(() => {
    if (user) dispatch(initializeBlogs());
  }, [user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(loginUser(username, password))

  };

  const handleLogOut = () => {
    dispatch(logout())
  };

  const addBlog = async (blog) => {
      dispatch(makeBlog(blog))
  };



  if (user === null) {
    return (
      <>
        <Notification />
        <h1 data-testid="login-header">Login to Application</h1>
        <LoginForm
          handleLogin={handleLogin}
        />
      </>
    );
  }
  return (
    <>
      <Notification />
      <h2>blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogOut}>logOut</button>
      </p>
      <Blogs />
      <Togglable buttonLabel="new note">
        <CreateBlog addBlog={addBlog} user={user} />
      </Togglable>
    </>
  );
};

export default App;
