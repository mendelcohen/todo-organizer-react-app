import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "./DeleteDialog";
import { Card, CardHeader, CardContent, Button, Checkbox } from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";

export default function Todos(props) {
  const { className, todoTitle, subheader, todos, getTodos } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [todoIds, setTodoIds] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(todos);
  }, []);

  function handleViewTodo(todo) {
    navigate(`/todo/${todo.id}`);
  }

  function handleDeleteTodo({ id, userId }) {
    setDialogOpen(true);
    setTodoIds({ id, userId });
  }

  async function handleCheckedTodo(todoId) {
    console.log("HERE");
    try {
      const options = {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `http://localhost:3001/todo/edit-complete/${todoId}`,
        options
      );
      const { todo } = await response.json();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Card className={className}>
        <div>
          <CardHeader
            avatar={
              todoTitle === "Essentials" ? (
                <AssignmentIndIcon />
              ) : todoTitle === "Tasks" ? (
                <AssignmentIcon />
              ) : todoTitle === "Urgent" ? (
                <HourglassTopIcon />
              ) : (
                <FlightTakeoffIcon />
              )
            }
            title={todoTitle}
            subheader={subheader}
          ></CardHeader>
        </div>
        <CardContent>
          {todos.length > 0 &&
            todos.map((todo, index) => {
              return (
                <div key={index} className="todo-row">
                  <div className="todo">
                    <Checkbox onChange={() => handleCheckedTodo(todo.id)} />
                    {todo.title}
                  </div>
                  <div>
                    <Button
                      sx={{ fontSize: "16px" }}
                      size="small"
                      onClick={() => handleViewTodo(todo)}
                    >
                      View
                    </Button>
                    <Button
                      sx={{ fontSize: "16px" }}
                      size="small"
                      onClick={() =>
                        handleDeleteTodo({ id: todo.id, userId: todo.user_id })
                      }
                    >
                      delete
                    </Button>
                  </div>
                </div>
              );
            })}
        </CardContent>
      </Card>
      <DeleteDialog
        open={dialogOpen}
        id={todoIds?.id}
        uderId={todoIds?.userId}
        setOpen={setDialogOpen}
        getTodos={getTodos}
      />
    </div>
  );
}
