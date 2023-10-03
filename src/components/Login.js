// import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../api/login";
import { TextField, Button } from "@mui/material";

export default function Login(props) {
  const { setSignup, setSession } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameMessage("");
    setUsernameError(false);
    setLoginError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordMessage("");
    setPasswordError(false);
    setLoginError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username) {
      setUsernameError(true);
      setUsernameMessage("Please enter a valid username");
      return;
    }
    if (!password) {
      setPasswordError(true);
      setPasswordMessage("Please enter a valid password");
      return;
    }
    const results = await login({ username, password });
    const { loginResults, data } = results;
    if (loginResults === 200) {
      localStorage.setItem("jwt", data.token);
      setSession(true);
      navigate(`/todos/${data.user}`);
    } else {
      setLoginError("Invalid username or password");
    }
  };

  return (
    <form id="login" onSubmit={handleSubmit}>
      <h2 id={loginError ? "sign-in-error" : "sign-in"}>Sign in</h2>
      {loginError && <div id="sign-in-error-message">{loginError}</div>}
      <div className={usernameError ? "landing-page-error" : "landing-page"}>
        <TextField
          error={usernameError}
          size="small"
          className="login"
          placeholder="Username"
          notched="false"
          variant="outlined"
          value={username}
          onChange={handleUsernameChange}
          helperText={usernameMessage}
        />
      </div>
      <div className={passwordError ? "landing-page-error" : "landing-page"}>
        <TextField
          error={passwordError}
          size="small"
          className="login"
          placeholder="Password"
          notched="false"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
          helperText={passwordMessage}
        />
      </div>
      <div>
        <Button className="landing-page" variant="contained" type="submit">
          Login
        </Button>
      </div>
      <div>
        <Button
          className="landing-page"
          variant="outlined"
          onClick={() => setSignup(true)}
        >
          Register
        </Button>
      </div>
    </form>
  );
}
