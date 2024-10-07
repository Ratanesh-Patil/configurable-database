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
  IconButton,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminFieldConfiguration = () => {
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("");
  const [fieldOptions, setFieldOptions] = useState(""); // State for dropdown options
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

    // Prepare new field configuration
    const newFieldConfig = {
      fieldName,
      fieldType,
      options:
        fieldType === "dropdown"
          ? fieldOptions.split(",").map((option) => option.trim())
          : [], // Split options if dropdown
    };

    try {
      await axios.post(
        "http://localhost:8081/api/tasks/field-configuration",
        newFieldConfig
      );
      alert("Field configuration created successfully");
      setFieldName("");
      setFieldType("");
      setFieldOptions(""); // Reset options

      // Refresh field configurations after adding a new field
      const response = await axios.get(
        "http://localhost:8081/api/tasks/field-configurations"
      );
      setFieldConfigurations(response.data);
    } catch (error) {
      console.error("Error creating field configuration", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this field?")) {
      try {
        await axios.delete(
          `http://localhost:8081/api/tasks/field-configuration/${id}`
        );
        alert("Field configuration deleted successfully");

        // Refresh field configurations after deleting a field
        const response = await axios.get(
          "http://localhost:8081/api/tasks/field-configurations"
        );
        setFieldConfigurations(response.data);
      } catch (error) {
        console.error("Error deleting field configuration", error);
      }
    }
  };

  return (
    <Paper style={{ padding: 20, marginBottom: 10 }}>
      <Typography variant="h5" fontSize={20} gutterBottom>
        Add New Field in Task Form
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
          label="Field Type"
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
          variant="filled"
          style={{ marginBottom: 16 }}
        >
          <MenuItem value="">Select Type</MenuItem>
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="number">Number</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="password">Password</MenuItem>
          <MenuItem value="date">Date</MenuItem>
          <MenuItem value="boolean">Boolean</MenuItem>
          <MenuItem value="varchar">Varchar</MenuItem>
          <MenuItem value="dropdown">Dropdown</MenuItem>{" "}
          {/* Added dropdown option */}
        </TextField>

        {fieldType === "dropdown" && (
          <TextField
            fullWidth
            label="Options (comma-separated)"
            value={fieldOptions}
            onChange={(e) => setFieldOptions(e.target.value)}
            variant="outlined"
            style={{ marginBottom: 16 }}
          />
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginBottom: 16 }}
        >
          Add
        </Button>
      </form>
      <Typography variant="h6" gutterBottom>
        Newly Added Task Form Fields
      </Typography>
      <List>
        {fieldConfigurations.map((field) => (
          <ListItem
            key={field.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                color="error"
                size="small"
                onClick={() => handleDelete(field.id)}
              >
                <DeleteIcon  />
              </IconButton>
            }
          >
            <ListItemText
              primary={`${field.fieldName} (${field.fieldType})`}
              secondary={
                field.fieldType === "dropdown"
                  ? `Options: ${field?.options.join(", ")}`
                  : null
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AdminFieldConfiguration;
