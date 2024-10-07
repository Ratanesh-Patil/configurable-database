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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CardActions,
  IconButton,
  ListItemText,
  ListItem,
  List,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
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
      <Grid
        container
        spacing={1}
        style={{ marginBottom: 20, fontSize: "1rem" }}
      >
        <Grid item xs={12}>
          <Typography fontSize={16} variant="h5">
            {sprint?.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontSize={14} variant="subtitle1" color="textSecondary">
            {sprint?.description}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography fontSize={14} variant="body2" color="textSecondary">
            Start Date: {new Date(sprint?.startDate).toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            fontSize={14}
            variant="body2"
            color="textSecondary"
            align="right"
          >
            End Date: {new Date(sprint?.endDate).toLocaleDateString()}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h6" style={{ marginTop: 20, fontSize: "1rem" }}>
        Tasks
      </Typography>

      {/* Display tasks as row cards */}
      {/* <Grid container spacing={2} style={{ marginTop: 10 }}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Card
              variant="outlined"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 10,
              }}
            >
              <CardContent style={{ flex: 1 }}>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  {task.taskName}
                </Typography>
                <Typography color="textSecondary">
                  Status: {task.status}
                </Typography>
                <Typography variant="body2">{task.taskDescription}</Typography>
                <Typography variant="caption" color="textSecondary">
                  Created on: {new Date(task.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
              <div>
                <IconButton
                  size="small"
                  color="primary"
                  // onClick={() => handleEdit(task.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  color="secondary"
                  // onClick={() => handleDelete(task.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </Card>
          </Grid>
        ))}
      </Grid> */}
      <TableContainer component={Paper} style={{ maxHeight: 200 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" style={{ fontSize: "0.9rem" }}>
                  Task Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" style={{ fontSize: "0.9rem" }}>
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" style={{ fontSize: "0.9rem" }}>
                  Description
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1" style={{ fontSize: "0.9rem" }}>
                  Created On
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle1" style={{ fontSize: "0.9rem" }}>
                  Actions
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ maxHeight: "300px", overflowY: "auto" }}>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell style={{ fontSize: "0.85rem" }}>
                  {task.taskName}
                </TableCell>
                <TableCell style={{ fontSize: "0.85rem" }}>
                  {task.status}
                </TableCell>
                <TableCell style={{ fontSize: "0.85rem" }}>
                  {task.taskDescription}
                </TableCell>
                <TableCell style={{ fontSize: "0.85rem" }}>
                  {new Date(task.createdAt).toLocaleString()}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    size="small"
                    color="primary"
                    // onClick={() => handleEdit(task.id)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="secondary"
                    // onClick={() => handleDelete(task.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Add New Task
      </Typography>

      {/* One row form using Grid */}
      <Grid container spacing={2} alignItems="center" style={{ marginTop: 10 }}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Task Name"
            value={newTask.taskName}
            onChange={(e) =>
              setNewTask({ ...newTask, taskName: e.target.value })
            }
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            size="small"
            label="Task Description"
            value={newTask.taskDescription}
            onChange={(e) =>
              setNewTask({ ...newTask, taskDescription: e.target.value })
            }
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          {/* <TextField
            fullWidth
            label="Status"
            value={newTask.status}
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            margin="normal"
          /> */}
          <FormControl fullWidth margin="normal">
            <InputLabel size="small">Status</InputLabel>
            <Select
              value={newTask.status}
              size="small"
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
            >
              <MenuItem value="Not Started">Not Started</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="On Hold">On Hold</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button
            variant="contained"
            size="small"
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
