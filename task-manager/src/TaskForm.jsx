import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import axios from "axios";

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [fields, setFields] = useState([]);
  const [customFieldValues, setCustomFieldValues] = useState({});

  // Fetch all custom fields
  useEffect(() => {
    const fetchFields = async () => {
      const response = await axios.get(
        "http://localhost:8081/api/tasks/fields"
      );
      console.log(response.data);

      setFields(response.data);
    };
    fetchFields();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build task creation request including custom fields
    const taskData = {
      title,
      description,
      status,
      customFields: Object.keys(customFieldValues).map((id) => ({
        id: parseInt(id),
        value: customFieldValues[id],
        task_id: "",
        field_id: parseInt(id),
      })),
    };

    try {
      // Post task with custom fields
      console.log(taskData);

      await axios.post("http://localhost:8081/api/tasks", taskData);
      onTaskCreated();
      setTitle("");
      setDescription("");
      setCustomFieldValues({});
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // Handle custom field value change
  const handleFieldChange = (id, value) => {
    setCustomFieldValues((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: "400px",
        padding: 2,
        fontSize: "14px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        New Task
      </Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        size="small"
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={3}
        size="small"
      />
      <FormControl size="small">
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>

      {/* Render custom fields */}
      {fields.map((field) => (
        <TextField
          key={field.id}
          label={field.fieldName}
          type={field.fieldType === "text" ? "text" : "number"}
          size="small"
          value={customFieldValues[field.id] || ""}
          onChange={(e) => handleFieldChange(field.id, e.target.value)}
        />
      ))}

      <Button variant="contained" type="submit" size="small">
        Add Task
      </Button>
    </Box>
  );
};

export default TaskForm;
