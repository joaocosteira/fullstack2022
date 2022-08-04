import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form } from "react-bootstrap";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const processCredentials = (event) => {
    event.preventDefault();
    handleLogin({ username, password });
    setUsername("");
    setPassword("");
  };
  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={processCredentials}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            id="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />

          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="primary m-1" id="login-button" type="submit">
          login
        </Button>
      </Form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
