import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Box,
  Modal,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

export default function TodoModal(props) {
  const {
    modalOpen,
    setModalOpen,
    id,
    type,
    setEssentialTodos,
    setUrgentTodos,
    setResponsibilitiesTodos,
    setWantsTodos,
    titleForEdit,
    descriptionForEdit,
    categoryForEdit,
    startDateForEdit,
    endDateForEdit,
    setEditedTitle,
    setEditedCategory,
    setEditedDescription,
    setEditedStartDate,
    setEditedEndDate,
  } = props;
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(dayjs);
  const [endDate, setEndDate] = useState(dayjs);
  const [disabled, setDisabled] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    if (modalOpen && type === "Edit") {
      setTodoTitle(titleForEdit);
      setTodoDescription(descriptionForEdit);
      setCategory(categoryForEdit);
      setStartDate(dayjs(startDateForEdit));
      setEndDate(dayjs(endDateForEdit));
    }
  }, [modalOpen]);

  function handleCloseModal() {
    setModalOpen(false);
    setTodoTitle("");
    setTodoDescription("");
    setCategory("");
    setStartDate(dayjs);
    setEndDate(dayjs);
  }

  function handleTodoTitle(event) {
    const title = event.target.value;
    setTodoTitle(title);
  }
  function handleTodoDescription(event) {
    const description = event.target.value;
    setTodoDescription(description);
  }
  function handleCategory(event) {
    const category = event.target.value;
    setCategory(category);
  }
  function handleStartDate(date) {
    setStartDate(date);
  }
  function handleEndDate(date) {
    setEndDate(date);
  }

  async function todoHandler() {
    setDisabled(true);
    const params = {
      user_id: parseInt(userId),
      title: todoTitle,
      description: todoDescription,
      category,
      start_date: startDate,
      end_date: endDate,
    };
    try {
      const options = {
        method: type === "Create" ? "POST" : "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      };
      const response = await fetch(
        `http://localhost:3001/todo/${
          type === "Create" ? "create" : `edit/${id}`
        }`,
        options
      );
      const { todo } = await response.json();

      if (type === "Create") {
        todo.category === "Essentials"
          ? setEssentialTodos((prev) => [...prev, todo])
          : todo.category === "Urgent"
          ? setUrgentTodos((prev) => [...prev, todo])
          : todo.category === "Responsibilities"
          ? setResponsibilitiesTodos((prev) => [...prev, todo])
          : setWantsTodos((prev) => [...prev, todo]);
      }
      if (type === "Edit") {
        const { title, category, description, start_date, end_date } = todo;
        setEditedTitle(title);
        setEditedCategory(category);
        setEditedDescription(description);
        setEditedStartDate(dayjs(start_date));
        setEditedEndDate(dayjs(end_date));
      }
      handleCloseModal();
      setDisabled(false);
    } catch (error) {
      setDisabled(false);
      console.log(error);
    }
  }

  return (
    <Modal open={modalOpen} onClose={handleCloseModal}>
      <Box id="todo-modal">
        <Typography id="todo-form-header">{type} a todo</Typography>
        <div className="todo-form">
          <div className="todo-form-title">Title:</div>
          <TextField
            size="small"
            notched="false"
            variant="outlined"
            onChange={handleTodoTitle}
            value={todoTitle}
          />
        </div>
        <div className="todo-form">
          <div className="todo-form-title">Description:</div>
          <TextField
            multiline
            maxRows={3}
            notched="false"
            variant="outlined"
            onChange={handleTodoDescription}
            value={todoDescription}
          />
        </div>
        <div className="todo-form">
          <div className="todo-form-title">Category:</div>
          <FormControl>
            <Select size="small" value={category} onChange={handleCategory}>
              <MenuItem value="Essentials">Essentials</MenuItem>
              <MenuItem value="Urgent">Urgent</MenuItem>
              <MenuItem value="Responsibilities">Responsibilities</MenuItem>
              <MenuItem value="Wants">Wants</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="todo-form">
          <div className="todo-form-title">Start date:</div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              size="small"
              notched="false"
              value={startDate}
              onChange={(newValue) => handleStartDate(newValue)}
            />
          </LocalizationProvider>
        </div>
        <div className="todo-form">
          <div className="todo-form-title">End date:</div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              size="small"
              notched="false"
              value={endDate}
              onChange={(newValue) => handleEndDate(newValue)}
            />
          </LocalizationProvider>
        </div>
        <Button
          id="create-todo"
          variant="contained"
          disabled={
            type === "Create" &&
            (todoTitle?.length === 0 || category?.length === 0 || disabled)
          }
          onClick={todoHandler}
        >
          {type === "Create" ? "Add Todo" : "Save Todo"}
        </Button>
      </Box>
    </Modal>
  );
}
