import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const SprintDetail = () => {
  const { sprintId } = useParams();
  const [sprint, setSprint] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({
    taskName: "",
    taskDescription: "",
    status: "",
  });

  useEffect(() => {
    const fetchSprint = async () => {
      try {
        const sprintResponse = await axios.get(
          `http://localhost:8081/api/sprints/${sprintId}`
        );
        const taskResponse = await axios.get(
          `http://localhost:8081/api/sprints/${sprintId}/tasks`
        );
        console.log(taskResponse.data);
        console.log(sprintResponse.data);

        setSprint(sprintResponse.data);
        setTasks(taskResponse.data);
      } catch (error) {
        console.error("Error fetching sprint or tasks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSprint();
  }, [sprintId]);

  const handleAddTask = async () => {
    try {
      await axios.post(
        `http://localhost:8081/api/sprints/${sprintId}/tasks`,
        newTask
      );
      setNewTask({ taskName: "", taskDescription: "", status: "" }); // Reset form
      window.location.reload(); // Reload page to see the updated tasks
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h5">Sprint: {sprint?.name}</Typography>
      <Typography variant="subtitle1">
        Description: {sprint?.description}
      </Typography>
      <Typography variant="subtitle1">
        Start Date: {sprint?.startDate}
      </Typography>
      <Typography variant="subtitle1">End Date: {sprint?.endDate}</Typography>

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Tasks
      </Typography>

      {/* Display tasks as row cards */}
      <Grid container spacing={2}>
        {tasks.map((task) => (
          <Grid item xs={12} key={task.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{task.taskName}</Typography>
                <Typography color="textSecondary">{task.status}</Typography>
                <Typography variant="body2">{task.taskDescription}</Typography>
                <Typography variant="caption" color="textSecondary">
                  Created on: {new Date(task.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Add New Task
      </Typography>

      {/* One row form using Grid */}
      <Grid
        container
        spacing={2}
        alignItems="center"
        style={{ marginBottom: 20 }}
      >
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Task Name"
            value={newTask.taskName}
            onChange={(e) =>
              setNewTask({ ...newTask, taskName: e.target.value })
            }
            margin="normal"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Task Description"
            value={newTask.taskDescription}
            onChange={(e) =>
              setNewTask({ ...newTask, taskDescription: e.target.value })
            }
            margin="normal"
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            label="Status"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            margin="normal"
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddTask}
          >
            Add Task
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SprintDetail;
