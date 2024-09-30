import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
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
      <Typography variant="h5" gutterBottom>
        All Tasks
      </Typography>
      {tasks.length === 0 ? (
        <Typography>No tasks available.</Typography>
      ) : (
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id} divider>
              <ListItemText
                primary={task.taskName}
                secondary={
                  <>
                    <div>{task.description}</div>
                    {Object.entries(task.additionalFields).map(
                      ([key, value]) => (
                        <div key={key}>
                          <strong>{key}:</strong> {value}
                        </div>
                      )
                    )}
                  </>
                }
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(task.id)}
                style={{ marginLeft: 16 }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
      {deleteError && <Alert severity="error">{deleteError}</Alert>}
    </Paper>
  );
};

export default TaskList;
