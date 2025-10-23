import { Button, TextField } from "@mui/material";

export const LoginForm = ({ handleLogin }) => {
  return (
    <form onSubmit={handleLogin}>
      <TextField label="username" type="text" name="username" />
      <br />

      <TextField
        type="password"
        name="password"
        label="password"
        autoComplete="off"
      />
      <br />
      <Button variant="contained" type="submit">
        login
      </Button>
    </form>
  );
};
