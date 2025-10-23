import { useParams } from "react-router-dom";

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(user => user.id === id)
  return (
    <>
      <h1>{user.username}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </>
  );
};

export default User;
