import { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { Grid, Paper } from "@mui/material";
import todolist from "../images/todolist.jpg";

export default function LandingPage(props) {
  const { setSession } = props;
  const [signup, setSignup] = useState(false);

  useEffect(() => {
    localStorage.setItem("jwt", "");
    setSession(false);
  }, []);

  return (
    <Paper className="landing-page-surface">
      <div>
        <h1>Todo List Organizer</h1>
      </div>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          {!signup && <Login setSignup={setSignup} setSession={setSession} />}
          {signup && <Signup setSignup={setSignup} />}
        </Grid>

        <Grid item xs={0} md={6}>
          <img id="todolist-pic" src={todolist} alt="" />
        </Grid>
      </Grid>
    </Paper>
  );
}
