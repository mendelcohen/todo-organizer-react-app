import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function Logout() {
  const navigate = useNavigate();

  function logout() {
    localStorage.setItem("jwt", "");
    navigate("/");
  }
  return (
    <Button
      sx={{ marginLeft: "12px" }}
      size="medium"
      variant="contained"
      onClick={logout}
    >
      Logout
    </Button>
  );
}
