import { useState } from "react";
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

  const handleSubmit = (event) => {
    event.preventDefault();
    createUser({ username, password });
  };

  async function createUser(data) {
    try {
      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(
        "http://localhost:3001/user/create",
        options
      );
      const results = await response.json();
      setSignup(false);
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  }

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
