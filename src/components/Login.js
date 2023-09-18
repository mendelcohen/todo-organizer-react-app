// import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../api/login";
import { TextField, Button } from "@mui/material";

export default function Login(props) {
  const { setSignup } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const results = await login({ username, password });
    const { loginResults, data } = results;
    if (loginResults === 200) {
      localStorage.setItem("jwt", data.token);
      navigate(`/todos/${data.user}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign in</h2>
      <div className="landing-page">
        <TextField
          size="small"
          className="login"
          placeholder="Username"
          notched="false"
          variant="outlined"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="landing-page">
        <TextField
          size="small"
          className="login"
          placeholder="Password"
          notched="false"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
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
          variant="contained"
          onClick={() => setSignup(true)}
        >
          Register
        </Button>
      </div>
    </form>
  );
}
