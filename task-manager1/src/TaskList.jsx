import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  // Check network availability
  const isNetworkError = (error) => {
    return !error.response; // If there's no response, it's likely a network error
  };

  // Fetch all tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/tasks/all");
        setTasks(response.data);
      } catch (error) {
        if (isNetworkError(error)) {
          setError(
            "Network error. Please check your connection or try again later."
          );
        } else {
          setError("Failed to fetch tasks. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Handle task deletion
  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8081/api/tasks/delete/${taskId}`);
        // Update the tasks in the UI after deletion
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        setDeleteError(null);
        alert("Task deleted successfully");
      } catch (error) {
        if (isNetworkError(error)) {
          setDeleteError(
            "Network error. Failed to delete the task. Please check your connection."
          );
        } else {
          setDeleteError("Failed to delete the task. Please try again.");
        }
      }
    }
  };

  if (loading) {
    return (
      <Paper style={{ padding: 20 }}>
        <Typography variant="h5" gutterBottom>
          Loading Tasks...
        </Typography>
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper style={{ padding: 20 }}>
        <Typography variant="h5" gutterBottom>
          Error
        </Typography>
        <Alert severity="error">{error}</Alert>
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h5" fontSize={20} gutterBottom>
        All Tasks
      </Typography>
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        <Grid container spacing={2}>
          {tasks.length === 0 ? (
            <Typography>No tasks available.</Typography>
          ) : (
            tasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {task.taskName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {task.description}
                    </Typography>
                    {Object.entries(task.additionalFields).map(
                      ([key, value]) => (
                        <Typography key={key} variant="body2">
                          <strong>{key}:</strong> {value}
                        </Typography>
                      )
                    )}
                  </CardContent>
                  <CardActions>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </div>
      {deleteError && <Alert severity="error">{deleteError}</Alert>}
    </Paper>
  );
};

export default TaskList;
