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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
    <Paper style={{ padding: 20, marginBottom: 20 }}>
      <Typography variant="h5" gutterBottom>
        Add New Field
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
          value={fieldType}
          onChange={(e) => setFieldType(e.target.value)}
          variant="filled"
          style={{ marginBottom: 16 }}
          SelectProps={{
            native: true,
          }}
        >
          <option value="">Select Type</option>
          <option value="text">Text</option>
          <option value="number">Number</option>
          <option value="boolean">Boolean</option>
          <option value="date">Date</option>
          <option value="varchar">Varchar</option>
        </TextField>
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
        Existing Fields
      </Typography>
      <List>
        {fieldConfigurations.map((field) => (
          <ListItem
            key={field.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(field.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText primary={`${field.fieldName} (${field.fieldType})`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default AdminFieldConfiguration;
