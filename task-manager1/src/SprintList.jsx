import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Paper,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  TextField,
  Grid,
  AccordionDetails,
  AccordionSummary,
  Accordion,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";

const SprintList = () => {
  const [sprints, setSprints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSprint, setNewSprint] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [expandedSprintId, setExpandedSprintId] = useState(null);
  const [sprintTasks, setSprintTasks] = useState({}); // Store tasks for each sprint
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSprints = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/sprints");
        setSprints(response.data);
      } catch (error) {
        console.error("Error fetching sprints", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSprints();
  }, []);

  const handleAccordionChange = async (sprintId) => {
    // Check if the sprint is already expanded
    if (expandedSprintId === sprintId) {
      setExpandedSprintId(null); // Collapse if already expanded
      return;
    }

    // Fetch tasks for the selected sprint
    try {
      const response = await axios.get(
        `http://localhost:8081/api/sprints/${sprintId}/tasks`
      );
      setSprintTasks((prev) => ({
        ...prev,
        [sprintId]: response.data, // Store tasks by sprint ID
      }));
      setExpandedSprintId(sprintId); // Expand the selected sprint
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  if (loading) return <CircularProgress />;

  const handleAddSprint = async () => {
    try {
      await axios.post("http://localhost:8081/api/sprints", newSprint);
      setNewSprint({ name: "", description: "", startDate: "", endDate: "" }); // Reset form
      const response = await axios.get("http://localhost:8081/api/sprints"); // Refresh the list
      setSprints(response.data);
    } catch (error) {
      console.error("Error adding sprint", error);
    }
  };

  const handleAccordionClick = (sprintId) => {
    // Navigate to the sprint's tasks page
    console.log(sprintId);

    navigate(`/sprints/${sprintId}/tasks`);
  };

  if (loading) return <CircularProgress />;

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h6" style={{ marginBottom: 20 }}>
        Add New Sprint
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Sprint Name"
            value={newSprint.name}
            onChange={(e) =>
              setNewSprint({ ...newSprint, name: e.target.value })
            }
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Description"
            value={newSprint.description}
            onChange={(e) =>
              setNewSprint({ ...newSprint, description: e.target.value })
            }
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Start Date"
            type="date"
            value={newSprint.startDate}
            onChange={(e) =>
              setNewSprint({ ...newSprint, startDate: e.target.value })
            }
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="End Date"
            type="date"
            value={newSprint.endDate}
            onChange={(e) =>
              setNewSprint({ ...newSprint, endDate: e.target.value })
            }
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddSprint}
            style={{ marginTop: "16px" }}
          >
            Add Sprint
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h5" style={{ marginTop: 20 }}>
        Sprints
      </Typography>
      {/* <List>
        {sprints.map((sprint) => (
          <ListItem
            key={sprint.id}
            button
            component={Link}
            to={`/sprints/${sprint.id}/tasks`}
          >
            <ListItemText
              primary={sprint.name}
              secondary={sprint.description}
            />
          </ListItem>
        ))}
      </List> */}
      <div>
        {sprints.map((sprint) => (
          <Accordion
            key={sprint.id}
            expanded={expandedSprintId === sprint.id} // Control expansion
            onClick={() => handleAccordionClick(sprint.id)} // Navigate to tasks on click
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation
                    handleAccordionChange(sprint.id);
                  }}
                />
              } // Only expand on icon click
            >
              <Typography variant="h6">{sprint.name}</Typography>
            </AccordionSummary>
            <AccordionDetails
              onClick={(e) => {
                e.stopPropagation(); // Prevent navigation
              }}
            >
              <Typography variant="subtitle2">{sprint.description}</Typography>
              <List>
                {sprintTasks[sprint.id]?.length > 0 ? ( // Check if tasks are loaded
                  sprintTasks[sprint.id].map((task) => (
                    <ListItem
                      key={task.id}
                      button
                      // component={Link}
                      // to={`/sprints/${sprint.id}/tasks/${task.id}`} // Link to task details
                      style={{
                        padding: "16px",
                        borderBottom: "1px solid #e0e0e0",
                      }} // Add a bottom border
                    >
                      <ListItemText
                        primary={
                          <Typography variant="h6" style={{ margin: 0 }}>
                            {task.taskName}
                          </Typography>
                        }
                        secondary={
                          <div>
                            <Typography variant="body2" color="textSecondary">
                              {task.taskDescription}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Status: <strong>{task.status}</strong>
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              Created on:{" "}
                              {new Date(task.createdAt).toLocaleString()}
                            </Typography>
                          </div>
                        }
                      />
                    </ListItem>
                  ))
                ) : (
                  <Typography>No tasks available for this sprint.</Typography>
                )}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Paper>
  );
};

export default SprintList;
