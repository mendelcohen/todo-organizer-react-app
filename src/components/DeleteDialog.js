import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function DeleteDialog(props) {
  const { open, setOpen, id, userId, getTodos } = props;
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  function handleCloseDialog() {
    setOpen(false);
  }

  async function handleDelete() {
    setDisabled(true);
    try {
      const options = {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `http://localhost:3001/todo/delete/${id}`,
        options
      );
      console.log(response);
      const result = await response.json();
      console.log(result);
      handleCloseDialog();
      setDisabled(false);
      if (getTodos) {
        getTodos();
      } else {
        navigate(`/todos/${userId}`);
      }
    } catch (error) {
      setDisabled(false);
      console.log(error);
    }
  }

  return (
    <Dialog fullWidth open={open} onClose={handleCloseDialog}>
      <DialogTitle id="delete-todo">Delete Todo</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-text">
          <HelpOutlineIcon id="warning" />
          <span>
            Are you sure you want to delete? This will permanantly delete your
            todo.
          </span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button disabled={disabled} onClick={handleDelete} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
