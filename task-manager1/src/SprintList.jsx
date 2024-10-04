import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  TextField,
} from "@mui/material";
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

  useEffect(() => {
    const fetchSprints = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/sprints");
        console.log(response.data);

        setSprints(response.data);
      } catch (error) {
        console.error("Error fetching sprints", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSprints();
  }, []);

  const handleAddSprint = async () => {
    try {
      await axios.post("http://localhost:8081/api/sprints", newSprint);
      setNewSprint({ name: "", description: "", startDate: "", endDate: "" }); // Reset form
      window.location.reload(); // Reload page to see the updated sprint list
    } catch (error) {
      console.error("Error adding sprint", error);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h6" style={{ marginTop: 20 }}>
        Add New Sprint
      </Typography>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <TextField
          label="Sprint Name"
          value={newSprint.name}
          onChange={(e) => setNewSprint({ ...newSprint, name: e.target.value })}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Description"
          value={newSprint.description}
          onChange={(e) =>
            setNewSprint({ ...newSprint, description: e.target.value })
          }
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Start Date"
          type="date"
          value={newSprint.startDate}
          onChange={(e) =>
            setNewSprint({ ...newSprint, startDate: e.target.value })
          }
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          type="date"
          value={newSprint.endDate}
          onChange={(e) =>
            setNewSprint({ ...newSprint, endDate: e.target.value })
          }
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddSprint}
          style={{ height: "fit-content", marginTop: "16px" }}
        >
          Add Sprint
        </Button>
      </div>

      <Typography variant="h5" style={{ marginTop: "20px" }}>
        Sprints
      </Typography>
      <List>
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
      </List>
    </Paper>
  );
};

export default SprintList;
