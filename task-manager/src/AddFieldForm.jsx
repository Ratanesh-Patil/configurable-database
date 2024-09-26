import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";

const AddFieldForm = () => {
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("text");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newField = { fieldName, fieldType };
    await axios.post("http://localhost:8081/api/tasks/fields", newField);
    setFieldName("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 2,
        flexDirection: "column",
        maxWidth: "400px",
        padding: 2,
      }}
    >
      <Typography variant="h6">Add Custom Field</Typography>
      <TextField
        label="Field Name"
        value={fieldName}
        onChange={(e) => setFieldName(e.target.value)}
        size="small"
        required
      />
      <FormControl size="small">
        <InputLabel>Field Type</InputLabel>
        <Select
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
          label="Field Type"
        >
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="number">Number</MenuItem>
          <MenuItem value="date">Date</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" type="submit" size="small">
        Add Field
      </Button>
    </Box>
  );
};

export default AddFieldForm;
