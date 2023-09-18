import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TodoModal from "./TodoModal";
import DeleteDialog from "./DeleteDialog";
import construction from "../images/construction.jpg";
import { Paper, Typography, Button } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import dayjs from "dayjs";

export default function Todo() {
  const [todo, setTodo] = useState({});
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(dayjs);
  const [endDate, setEndDate] = useState(dayjs);
  const [modalOpen, setModalOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function loadTodo() {
      const todo = await getTodo();
      console.log(todo);
      const { title, category, description, start_date, end_date } = todo;
      setTodo(todo);
      setTitle(title);
      setCategory(category);
      setDescription(description);
      setStartDate(start_date);
      setEndDate(end_date);
    }
    loadTodo();
  }, []);

  const getTodo = async () => {
    try {
      const options = {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`http://localhost:3001/todo/${id}`, options);
      const todo = await response.json();
      return todo;
    } catch (error) {
      console.log(error);
    }
  };

  function handleOpenModal() {
    setModalOpen(true);
  }

  function handleOpenDialog() {
    setDialogOpen(true);
  }

  function handleIconType() {
    return todo.category === "Essentials" ? (
      <AssignmentIndIcon />
    ) : todo.category === "Tasks" ? (
      <AssignmentIcon />
    ) : todo.category === "Urgent" ? (
      <HourglassTopIcon />
    ) : (
      <FlightTakeoffIcon />
    );
  }

  return (
    <div>
      <Paper className="todo-surface">
        <div className="todo-data">
          <div className="todo-header">
            <h2>Todo</h2>
            <div>
              <Button onClick={handleOpenModal}>Edit</Button>
              <Button id="delete" onClick={handleOpenDialog}>
                Delete
              </Button>
            </div>
          </div>
          <Typography id="todo-category">
            <span id="todo-icon">{handleIconType()}</span>
            <span className="subtitle">{category}</span>
          </Typography>
          <Typography id="todo-title">
            <span className="subtitle">Goal: </span>
            {title}
          </Typography>
          <Typography id="todo-description">
            <span className="subtitle">Description:</span> {description}
          </Typography>
          <Typography id="todo-dates">
            <span className="subtitle">Dates: </span>
            {dayjs(startDate).format("M/DD/YYYY")} -{" "}
            {dayjs(endDate).format("M/DD/YYYY")}
          </Typography>
        </div>
      </Paper>
      <Paper id="calendar-surface">
        <div>
          <h2>Calendar</h2>
        </div>
        <div>
          <img id="calendar" src={construction} alt="" />
        </div>
      </Paper>
      <TodoModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        id={todo.id}
        type={"Edit"}
        titleForEdit={title}
        descriptionForEdit={description}
        categoryForEdit={category}
        startDateForEdit={startDate}
        endDateForEdit={endDate}
        setEditedTitle={setTitle}
        setEditedCategory={setCategory}
        setEditedDescription={setDescription}
        setEditedStartDate={setStartDate}
        setEditedEndDate={setEndDate}
      />
      <DeleteDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        id={todo.id}
        userId={todo.user_id}
      />
    </div>
  );
}
