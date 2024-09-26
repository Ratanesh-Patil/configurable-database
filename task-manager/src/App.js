import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import AddFieldForm from "./AddFieldForm";
import { Container, Typography } from "@mui/material";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleTaskCreated = () => {
    setRefresh(!refresh);
  };

  return (
    <Container>
      <Typography variant="h6" component="h6" gutterBottom>
        Task Manager
      </Typography>
      <AddFieldForm />
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList key={refresh} />
    </Container>
  );
};

export default App;
