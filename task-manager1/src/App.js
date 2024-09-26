import React from "react";
import { Container } from "@mui/material";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import AdminFieldConfiguration from "./AdminFieldConfiguration";

const App = () => {
  return (
    <Container maxWidth="md">
      <h1 style={{ textAlign: "center" }}>Task Manager</h1>
      <AdminFieldConfiguration />
      <TaskForm />
      <TaskList />
    </Container>
  );
};

export default App;
