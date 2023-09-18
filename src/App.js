import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Todos from "./components/Todos";
import Todo from "./components/Todo";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/todos/:userId" element={<Todos />} />
        <Route path="/todo/:id" element={<Todo />} />
      </Routes>
    </div>
  );
}

export default App;
