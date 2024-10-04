import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container, Box } from "@mui/material";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import AdminFieldConfiguration from "./AdminFieldConfiguration";
import SprintList from "./SprintList";
import SprintTaskList from "./SprintTaskList";
import SprintDetail from "./SprintDetail";

const App = () => {
  return (
    <Router>
      <AppBar position="fixed">
        <Toolbar>
          <Button
            size="small"
            sx={{ fontSize: "12px", margin: 1 }} // Adjust the font size and margin
            style={{ margin: 10 }}
            color="inherit"
            variant="outlined"
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            size="small"
            sx={{ fontSize: "12px", margin: 1 }} // Adjust the font size and margin
            style={{ margin: 10 }}
            color="inherit"
            variant="outlined"
            component={Link}
            to="/task-form"
          >
            Add Task
          </Button>
          <Button
            size="small"
            sx={{ fontSize: "12px", margin: 1 }} // Adjust the font size and margin
            style={{ margin: 10 }}
            color="inherit"
            variant="outlined"
            component={Link}
            to="/task-list"
          >
            Task List
          </Button>
          <Button
            size="small"
            sx={{ fontSize: "12px", margin: 1 }} // Adjust the font size and margin
            style={{ margin: 10 }}
            color="inherit"
            variant="outlined"
            component={Link}
            to="/admin-config"
          >
            Admin Field Configuration
          </Button>
          <Button color="inherit" component={Link} to="/sprints">
            Sprints
          </Button>
        </Toolbar>
      </AppBar>

      {/* Ensure the content below the AppBar is scrollable */}
      <Container
        maxWidth="md"
        style={{
          marginTop: "80px", // Adjust this to match the AppBar height
          height: "calc(100vh - 80px)", // Full height minus the AppBar height
          overflowY: "auto", // Allow scrolling
        }}
      >
        <Box my={2}>
          {/* Routes define which component to show when a specific path is accessed */}
          <Routes>
            <Route path="/" element={<h1>Welcome to the Task Manager</h1>} />
            <Route path="/task-form" element={<TaskForm />} />
            <Route path="/task-list" element={<TaskList />} />
            <Route path="/admin-config" element={<AdminFieldConfiguration />} />
            <Route path="/sprints" element={<SprintList />} />
            <Route path="/sprints/:sprintId" element={<SprintDetail />} />
            <Route path="/sprints/:sprintId/tasks" element={<SprintDetail />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
};

export default App;
