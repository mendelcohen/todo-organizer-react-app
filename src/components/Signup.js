import { useState } from "react";
import createUser from "../api/createUser";
import { TextField, Button, Alert } from "@mui/material";

export default function Signup(props) {
  const { setSignup, alertContent, setAlertContent } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameMessage("");
    setUsernameError(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordMessage("");
    setPasswordError(false);
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
    try {
      const results = await createUser({ username, password });
      if (results.response?.status === 422) {
        const { message } = results.response.data;
        setAlertContent(message);
        return;
      }
      const { message } = results.data;
      setAlertContent(message);
      setTimeout(() => {
        setAlertContent("");
      }, 5000);
      setSignup(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form id="signup" onSubmit={handleSubmit}>
      <h2 id="sign-in">Sign up</h2>
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
          Sign up
        </Button>
      </div>
      <div>
        <Button
          className="landing-page"
          variant="outlined"
          onClick={() => setSignup(false)}
        >
          Login
        </Button>
      </div>
    </form>
  );
}
