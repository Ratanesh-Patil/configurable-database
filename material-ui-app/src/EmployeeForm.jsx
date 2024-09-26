import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";

const EmployeeForm = ({ onEmployeeAdded, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");

  // Dynamic fields management
  const [dynamicFields, setDynamicFields] = useState([
    { key: "", value: "", type: "string" },
  ]);

  const handleAddField = () => {
    setDynamicFields([
      ...dynamicFields,
      { key: "", value: "", type: "string" },
    ]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = dynamicFields.filter((_, idx) => idx !== index);
    setDynamicFields(updatedFields);
  };

  const handleDynamicFieldChange = (index, field, value) => {
    const updatedFields = dynamicFields.map((dynamicField, idx) =>
      idx === index ? { ...dynamicField, [field]: value } : dynamicField
    );
    setDynamicFields(updatedFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dynamicFieldsData = dynamicFields.map((field) => ({
      key: field.key,
      value: field.value,
      type: field.type,
    }));

    const employeeData = {
      firstName,
      lastName,
      email,
      department,
      salary: salary ? parseInt(salary) : null,
      dynamicFields: dynamicFieldsData,
    };

    try {
      await axios.post("http://localhost:8081/api/employees/add", employeeData);
      alert("Employee added successfully!");
      onEmployeeAdded(); // Refresh employee list
      onClose(); // Close the modal
      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      setDepartment("");
      setSalary("");
      setDynamicFields([{ key: "", value: "", type: "string" }]);
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee.");
    }
  };

  const renderDynamicFieldInput = (field, index) => {
    switch (field.type) {
      case "string":
        return (
          <TextField
            variant="outlined"
            fullWidth
            label="Enter text"
            value={field.value}
            onChange={(e) =>
              handleDynamicFieldChange(index, "value", e.target.value)
            }
            required
            margin="normal"
            size="small"
          />
        );
      case "number":
        return (
          <TextField
            variant="outlined"
            fullWidth
            label="Enter number"
            type="number"
            value={field.value}
            onChange={(e) =>
              handleDynamicFieldChange(index, "value", e.target.value)
            }
            required
            margin="normal"
            size="small"
          />
        );
      case "boolean":
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={field.value === "true"}
                onChange={(e) =>
                  handleDynamicFieldChange(
                    index,
                    "value",
                    e.target.checked ? "true" : "false"
                  )
                }
              />
            }
            label="True/False"
            sx={{ marginLeft: 2, marginTop: 1 }}
          />
        );
      case "date":
        return (
          <TextField
            variant="outlined"
            fullWidth
            label="Select date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={field.value}
            onChange={(e) =>
              handleDynamicFieldChange(index, "value", e.target.value)
            }
            required
            margin="normal"
            size="small"
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        mx: "auto",
        p: 2, // Adjust padding for a more compact design
        bgcolor: "background.paper",
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Employee Form
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        margin="normal"
        size="small" // Make the TextField smaller
      />
      <TextField
        variant="outlined"
        fullWidth
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        margin="normal"
        size="small" // Make the TextField smaller
      />
      <TextField
        variant="outlined"
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        margin="normal"
        size="small" // Make the TextField smaller
      />
      <TextField
        variant="outlined"
        fullWidth
        label="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        margin="normal"
        size="small" // Make the TextField smaller
      />
      <TextField
        variant="outlined"
        fullWidth
        label="Salary"
        type="number"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        margin="normal"
        size="small" // Make the TextField smaller
      />

      <Typography variant="h6" gutterBottom>
        Dynamic Fields:
      </Typography>
      {dynamicFields.map((field, index) => (
        <Box key={index} display="flex" alignItems="center" marginY={1}>
          <TextField
            variant="outlined"
            label="Field Name"
            value={field.key}
            onChange={(e) =>
              handleDynamicFieldChange(index, "key", e.target.value)
            }
            required
            margin="normal"
            size="small" // Make the TextField smaller
          />
          <FormControl
            variant="outlined"
            margin="normal"
            sx={{ minWidth: 120, marginRight: 2 }}
          >
            <InputLabel size="small">Type</InputLabel>
            <Select
              value={field.type}
              onChange={(e) =>
                handleDynamicFieldChange(index, "type", e.target.value)
              }
              label="Type"
              size="small" // Make the Select smaller
            >
              <MenuItem value="string">Text</MenuItem>
              <MenuItem value="number">Number</MenuItem>
              <MenuItem value="boolean">Boolean</MenuItem>
              <MenuItem value="date">Date</MenuItem>
            </Select>
          </FormControl>

          {renderDynamicFieldInput(field, index)}

          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleRemoveField(index)}
            sx={{ marginLeft: 1 }}
            size="small" // Make the Button smaller
          >
            Remove
          </Button>
        </Box>
      ))}

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddField}
          size="small"
        >
          Add Field
        </Button>
        <Button type="submit" variant="contained" color="success" size="small">
          Add Employee
        </Button>
      </Box>
    </Box>
  );
};

export default EmployeeForm;
