import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const AdminFieldConfiguration = () => {
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [fieldConfigurations, setFieldConfigurations] = useState([]);

  useEffect(() => {
    const fetchFieldConfigurations = async () => {
      const response = await axios.get(
        "http://localhost:8081/api/tasks/field-configurations"
      );
      setFieldConfigurations(response.data);
    };

    fetchFieldConfigurations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFieldConfig = { fieldName, fieldType };

    try {
      await axios.post(
        "http://localhost:8081/api/tasks/field-configuration",
        newFieldConfig
      );
      alert("Field configuration created successfully");
      setFieldName("");
      setFieldType("");
    } catch (error) {
      console.error("Error creating field configuration", error);
    }
  };

  return (
    <Paper style={{ padding: 20, marginBottom: 20 }}>
      <Typography variant="h5" gutterBottom>
        Manage Field Configurations
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Field Name"
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          variant="outlined"
          style={{ marginBottom: 16 }}
        />
        <TextField
          fullWidth
          select
          //   label="Field Type"
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
          variant="outlined"
          style={{ marginBottom: 16 }}
          SelectProps={{
            native: true,
          }}
        >
          <option value="">Select Type</option>
          <option value="text">Text</option>
          <option value="number">Number</option>
        </TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginBottom: 16 }}
        >
          Add Field Configuration
        </Button>
      </form>
      <Typography variant="h6" gutterBottom>
        Existing Field Configurations
      </Typography>
      <List>
        {fieldConfigurations.map((field) => (
          <ListItem key={field.id}>
            <ListItemText primary={`${field.fieldName} (${field.fieldType})`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AdminFieldConfiguration;
