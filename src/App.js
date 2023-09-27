import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Todos from "./components/Todos";
import Todo from "./components/Todo";

function App() {
  const [session, setSession] = useState(localStorage.getItem("jwt"));

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage setSession={setSession} />} />
        <Route
          path="/todos/:userId"
          element={
            session ? <Todos /> : <LandingPage setSession={setSession} />
          }
        />
        <Route
          path="/todo/:id"
          element={session ? <Todo /> : <LandingPage setSession={setSession} />}
        />
      </Routes>
    </div>
  );
}

export default App;
