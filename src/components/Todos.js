import { useState, useEffect } from "react";
import getAllTodos from "../api/getAllTodos";
import TodoCard from "./TodoCard";
import Logout from "./Logout";
import { useParams } from "react-router-dom";
import TodoModal from "./TodoModal";
import { Paper, Grid, Button } from "@mui/material";

export default function Todos() {
  const [signedIn, setSignedIn] = useState(false);
  const [essentialTodos, setEssentialTodos] = useState([]);
  const [urgentTodos, setUrgentTodos] = useState([]);
  const [responsibilitiesTodos, setResponsibilitiesTodos] = useState([]);
  const [wantsTodos, setWantsTodos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setSignedIn(true);
      getTodos();
    }
  }, []);

  async function getTodos() {
    const results = await getAllTodos(userId);
    const { data } = results;
    const { Essentials, Urgent, Responsibilities, Wants } = data;
    setEssentialTodos(Essentials?.length > 0 ? Essentials : []);
    setUrgentTodos(Urgent?.length > 0 ? Urgent : []);
    setResponsibilitiesTodos(
      Responsibilities?.length > 0 ? Responsibilities : []
    );
    setWantsTodos(Wants?.length > 0 ? Wants : []);
    return;
  }

  function handleOpenModal() {
    setModalOpen(true);
  }

  return (
    <Paper className="todos-surface">
      <Grid container>
        <Grid item xs={12}>
          <div className="todos-header">
            <h1
              style={{
                textAlign: "left",
                marginLeft: "12px",
                position: "relative",
              }}
            >
              Todos
              <span style={{ position: "absolute", right: 12 }}>
                <Button
                  disabled={!signedIn}
                  size="medium"
                  variant="contained"
                  onClick={handleOpenModal}
                >
                  New Todo
                </Button>
                <Logout />
              </span>
            </h1>
          </div>

          <TodoModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            type={"Create"}
            setEssentialTodos={setEssentialTodos}
            setUrgentTodos={setUrgentTodos}
            setResponsibilitiesTodos={setResponsibilitiesTodos}
            setWantsTodos={setWantsTodos}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TodoCard
            className="todo-card-left"
            todos={essentialTodos}
            todoTitle="Essentials"
            subheader="Todos that are essential to my role"
            getTodos={getTodos}
          />
          <TodoCard
            className="todo-card-left"
            todos={responsibilitiesTodos}
            todoTitle="Tasks"
            subheader="Todos that are my tasks"
            getTodos={getTodos}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TodoCard
            className="todo-card-right"
            todos={urgentTodos}
            todoTitle="Urgent"
            subheader="Todos that must get done"
            getTodos={getTodos}
          />
          <TodoCard
            className="todo-card-right"
            todos={wantsTodos}
            todoTitle="Wants"
            subheader="Todos that would be nice to do"
            getTodos={getTodos}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
