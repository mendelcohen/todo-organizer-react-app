import { useState } from "react";
import createUser from "../api/createUser";
import { TextField, Button } from "@mui/material";

export default function Signup(props) {
  const { setSignup } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const results = await createUser({ username, password });
    console.log(results);
    setSignup(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign up</h2>
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
          Sign up
        </Button>
      </div>
      <div>
        <Button
          className="landing-page"
          variant="contained"
          onClick={() => setSignup(false)}
        >
          Login
        </Button>
      </div>
    </form>
  );
}
