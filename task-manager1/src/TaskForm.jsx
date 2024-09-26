import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Grid, Paper } from "@mui/material";

const TaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [fieldConfigurations, setFieldConfigurations] = useState([]);
  const [additionalFields, setAdditionalFields] = useState({});

  useEffect(() => {
    const fetchFieldConfigurations = async () => {
      const response = await axios.get(
        "http://localhost:8081/api/tasks/field-configurations"
      );
      setFieldConfigurations(response.data);
    };

    fetchFieldConfigurations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdditionalFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = { taskName, description, additionalFields };

    try {
      await axios.post("http://localhost:8081/api/tasks/create", taskData);
      alert("Task created successfully");
      setTaskName("");
      setDescription("");
      setAdditionalFields({});
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  return (
    <Paper style={{ padding: 20, marginBottom: 20 }}>
      <Typography variant="h5" gutterBottom>
        Create a New Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
            />
          </Grid>
          {fieldConfigurations.map((field) => (
            <Grid item xs={12} key={field.id}>
              <TextField
                fullWidth
                label={field.fieldName}
                type={field.fieldType}
                name={field.fieldName}
                value={additionalFields[field.fieldName] || ""}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Task
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default TaskForm;
