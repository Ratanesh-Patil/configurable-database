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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS for the date picker

const TaskForm = () => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [fieldConfigurations, setFieldConfigurations] = useState([]);
  const [additionalFields, setAdditionalFields] = useState({});
  const [selectedDate, setSelectedDate] = useState(null); // State for DatePicker

  // Fetch field configurations from the backend
  useEffect(() => {
    const fetchFieldConfigurations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/tasks/field-configurations"
        );
        console.log(response.data);
        setFieldConfigurations(response.data);
      } catch (error) {
        console.error("Error fetching field configurations", error);
      }
    };

    fetchFieldConfigurations();
  }, []);

  // Handle changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdditionalFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  // Handle changes for checkboxes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setAdditionalFields((prevFields) => ({ ...prevFields, [name]: checked }));
  };

  // Handle form submission
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
      // Reset form fields
      setTaskName("");
      setDescription("");
      setAdditionalFields({});
      setSelectedDate(null);
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  // Render dynamic form fields based on field type
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
      case "email":
        return (
          <TextField
            fullWidth
            label={field.fieldName}
            type="email"
            name={field.fieldName}
            value={additionalFields[field.fieldName] || ""}
            onChange={handleChange}
            variant="filled"
          />
        );
      case "password":
        return (
          <TextField
            fullWidth
            label={field.fieldName}
            type="password"
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
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy/MM/dd"
            isClearable
            placeholderText={`Select ${field.fieldName}`}
          />
        );
      case "dropdown":
        return (
          <FormControl fullWidth variant="filled">
            <InputLabel id={`${field.fieldName}-label`}>
              {field.fieldName}
            </InputLabel>
            <Select
              labelId={`${field.fieldName}-label`}
              value={additionalFields[field.fieldName] || ""}
              onChange={handleChange}
              name={field.fieldName}
            >
              {field.options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <Paper style={{ padding: 20, marginBottom: 20 }}>
      <Typography variant="h6" gutterBottom>
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
