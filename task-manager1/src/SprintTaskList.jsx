import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const SprintTaskList = () => {
  const { sprintId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/sprints/${sprintId}/tasks`
        );
        console.log(response.data);

        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [sprintId]);

  if (loading) return <CircularProgress />;

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h5">Tasks for Sprint {sprintId}</Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText primary={task.taskName} secondary={task.status} />
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/sprints/${sprintId}/tasks/create`}
      >
        Add Task
      </Button>
    </Paper>
  );
};

export default SprintTaskList;
