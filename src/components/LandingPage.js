import { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { Grid, Paper } from "@mui/material";
export default function LandingPage() {
  const [signup, setSignup] = useState(false);
  useEffect(() => {
    localStorage.setItem("jwt", "");
  }, []);

  return (
    <Paper className="landing-page-surface">
      <div>
        <h1>Your Todo List Organizer</h1>
        {/* <h6>Start making your todos more organized</h6> */}
      </div>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          {!signup && <Login setSignup={setSignup} />}
          {signup && <Signup setSignup={setSignup} />}
        </Grid>

        <Grid item xs={0} md={6} id="landing-image"></Grid>
      </Grid>
    </Paper>
  );
}
