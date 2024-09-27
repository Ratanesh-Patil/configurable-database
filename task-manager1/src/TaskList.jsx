import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch all tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/tasks/all");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
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
        alert("Task deleted successfully");
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete the task");
      }
    }
  };

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h5" gutterBottom>
        All Tasks
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id} divider>
            <ListItemText
              primary={task.taskName}
              secondary={
                <>
                  <div>{task.description}</div>
                  {Object.entries(task.additionalFields).map(([key, value]) => (
                    <div key={key}>
                      <strong>{key}:</strong> {value}
                    </div>
                  ))}
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
    </Paper>
  );
};

export default TaskList;
