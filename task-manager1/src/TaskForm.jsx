import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker

const TaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [fieldConfigurations, setFieldConfigurations] = useState([]);
  const [additionalFields, setAdditionalFields] = useState({});
  const [selectedDate, setSelectedDate] = useState(null); // State for DatePicker

  useEffect(() => {
    const fetchFieldConfigurations = async () => {
      const response = await axios.get(
        "http://localhost:8081/api/tasks/field-configurations"
      );
      console.log(response.data);

      setFieldConfigurations(response.data);
    };

    fetchFieldConfigurations();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdditionalFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAdditionalFields((prevFields) => ({ ...prevFields, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const taskData = {
      taskName,
      description,
      additionalFields,
      selectedDate, // Include the selected date
    };

    try {
      await axios.post("http://localhost:8081/api/tasks/create", taskData);
      alert("Task created successfully");
      setTaskName("");
      setDescription("");
      setAdditionalFields({});
      setSelectedDate(null); // Clear the date after submission
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  const renderField = (field) => {
    switch (field.fieldType) {
      case "text":
      case "varchar":
        return (
          <TextField
            fullWidth
            label={field.fieldName}
            type="text"
            name={field.fieldName}
            value={additionalFields[field.fieldName] || ""}
            onChange={handleChange}
            variant="filled"
          />
        );
      case "number":
        return (
          <TextField
            fullWidth
            label={field.fieldName}
            type="number"
            name={field.fieldName}
            value={additionalFields[field.fieldName] || ""}
            onChange={handleChange}
            variant="filled"
          />
        );
      case "boolean":
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={additionalFields[field.fieldName] || false}
                onChange={handleCheckboxChange}
                name={field.fieldName}
              />
            }
            label={field.fieldName}
          />
        );
      case "date":
        return (
          <DatePicker
            selected={selectedDate} // Use the state variable
            onChange={(date) => setSelectedDate(date)} // Handle date change
            dateFormat="yyyy/MM/dd"
            isClearable
            placeholderText={`Select ${field.fieldName}`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Paper style={{ padding: 20, marginBottom: 20 }}>
      <Typography variant="h5" gutterBottom>
        Add New Task
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
              {renderField(field)}
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Task
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default TaskForm;
