export const LoginForm = ({
  handleLogin,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <label>
        username{" "}
        <input
          type="text"
          name="username"
        />
      </label>
      <br />

      <label>
        password{" "}
        <input
          type="password"
          name="password"
          autoComplete="off"
        />
      </label>
      <br />
      <button type="submit">login</button>
    </form>
  );
};
