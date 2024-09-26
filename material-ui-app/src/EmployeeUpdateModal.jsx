import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

const EmployeeUpdateModal = ({ employee, onClose, onUpdate }) => {
  const [firstName, setFirstName] = useState(employee.firstName);
  const [lastName, setLastName] = useState(employee.lastName);
  const [email, setEmail] = useState(employee.email);
  const [department, setDepartment] = useState(employee.department);
  const [salary, setSalary] = useState(employee.salary);
  const [dynamicFields, setDynamicFields] = useState(
    employee.dynamicFields || []
  );

  const [newFieldKey, setNewFieldKey] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");
  const [newFieldType, setNewFieldType] = useState("string");

  const handleDynamicFieldChange = (index, value) => {
    setDynamicFields((prev) => {
      const updatedFields = [...prev];
      updatedFields[index].value = value; // Update the specific field's value
      return updatedFields;
    });
  };

  const addDynamicField = () => {
    if (!newFieldKey.trim()) {
      alert("Field key cannot be empty");
      return;
    }
    if (newFieldValue === "") {
      alert("Field value cannot be empty");
      return;
    }

    setDynamicFields((prev) => [
      ...prev,
      { key: newFieldKey, type: newFieldType, value: newFieldValue },
    ]);

    // Clear inputs after adding
    setNewFieldKey("");
    setNewFieldValue("");
    setNewFieldType("string");
  };

  const removeDynamicField = (index) => {
    setDynamicFields((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const updatedEmployee = {
        employeeId: employee.employeeId,
        firstName,
        lastName,
        email,
        department,
        salary,
        dynamicFields,
      };

      const response = await axios.put(
        `http://localhost:8081/api/employees/update/${employee.employeeId}`,
        updatedEmployee
      );

      onUpdate(response.data); // Update parent component's state
      onClose(); // Close modal
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle style={{ fontSize: "1.25rem" }}>Update Employee</DialogTitle>
      <DialogContent>
        <div className="space-y-3">
          {/* Personal Information */}
          <h4 className="text-gray-700 font-bold text-sm mb-2">
            Personal Information
          </h4>
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            margin="normal"
            size="small"
            InputLabelProps={{
              style: { fontSize: "0.875rem" },
            }}
            inputProps={{
              style: { fontSize: "0.875rem" },
            }}
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            margin="normal"
            size="small"
            InputLabelProps={{
              style: { fontSize: "0.875rem" },
            }}
            inputProps={{
              style: { fontSize: "0.875rem" },
            }}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            size="small"
            InputLabelProps={{
              style: { fontSize: "0.875rem" },
            }}
            inputProps={{
              style: { fontSize: "0.875rem" },
            }}
          />
          <TextField
            label="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            fullWidth
            margin="normal"
            size="small"
            InputLabelProps={{
              style: { fontSize: "0.875rem" },
            }}
            inputProps={{
              style: { fontSize: "0.875rem" },
            }}
          />
          <TextField
            label="Salary"
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            fullWidth
            margin="normal"
            size="small"
            InputLabelProps={{
              style: { fontSize: "0.875rem" },
            }}
            inputProps={{
              style: { fontSize: "0.875rem" },
            }}
          />

          {/* Dynamic Fields */}
          <div className="space-y-1">
            <h4 className="text-gray-700 text-xs font-bold">Dynamic Fields</h4>
            {dynamicFields.map((field, index) => (
              <DynamicField
                key={index}
                fieldKey={field.key}
                fieldType={field.type}
                fieldValue={field.value}
                onValueChange={(value) =>
                  handleDynamicFieldChange(index, value)
                }
                onRemove={() => removeDynamicField(index)}
              />
            ))}

            {/* New Dynamic Field Inputs */}
            <div className="grid grid-cols-4 gap-x-1">
              <TextField
                label="New Field Key"
                value={newFieldKey}
                onChange={(e) => setNewFieldKey(e.target.value)}
                fullWidth
                margin="normal"
                size="small"
                InputLabelProps={{
                  style: { fontSize: "0.875rem" },
                }}
                inputProps={{
                  style: { fontSize: "0.875rem" },
                }}
              />

              <FormControl fullWidth margin="normal" size="small">
                <InputLabel style={{ fontSize: "0.875rem" }}>
                  Field Type
                </InputLabel>
                <Select
                  value={newFieldType}
                  onChange={(e) => setNewFieldType(e.target.value)}
                  style={{ fontSize: "0.875rem" }}
                >
                  <MenuItem value="string">String</MenuItem>
                  <MenuItem value="number">Number</MenuItem>
                  <MenuItem value="boolean">Boolean</MenuItem>
                  <MenuItem value="date">Date</MenuItem>
                </Select>
              </FormControl>

              {/* New Field Value Input */}
              {newFieldType === "string" && (
                <TextField
                  label="New Field Value"
                  value={newFieldValue}
                  onChange={(e) => setNewFieldValue(e.target.value)}
                  fullWidth
                  margin="normal"
                  size="small"
                  InputLabelProps={{
                    style: { fontSize: "0.875rem" },
                  }}
                  inputProps={{
                    style: { fontSize: "0.875rem" },
                  }}
                />
              )}
              {newFieldType === "number" && (
                <TextField
                  label="New Field Value"
                  type="number"
                  value={newFieldValue}
                  onChange={(e) => setNewFieldValue(e.target.value)}
                  fullWidth
                  margin="normal"
                  size="small"
                  InputLabelProps={{
                    style: { fontSize: "0.875rem" },
                  }}
                  inputProps={{
                    style: { fontSize: "0.875rem" },
                  }}
                />
              )}
              {newFieldType === "boolean" && (
                <FormControl fullWidth margin="normal" size="small">
                  <InputLabel style={{ fontSize: "0.875rem" }}>
                    New Field Value
                  </InputLabel>
                  <Select
                    value={newFieldValue}
                    onChange={(e) => setNewFieldValue(e.target.value)}
                    style={{ fontSize: "0.875rem" }}
                  >
                    <MenuItem value="true">True</MenuItem>
                    <MenuItem value="false">False</MenuItem>
                  </Select>
                </FormControl>
              )}
              {newFieldType === "date" && (
                <TextField
                  label="New Field Value"
                  type="date"
                  value={newFieldValue}
                  onChange={(e) => setNewFieldValue(e.target.value)}
                  fullWidth
                  margin="normal"
                  size="small"
                  InputLabelProps={{
                    style: { fontSize: "0.875rem" },
                  }}
                  inputProps={{
                    style: { fontSize: "0.875rem" },
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          size="small"
        >
          Update
        </Button>
        <Button
          onClick={onClose}
          variant="outlined"
          color="secondary"
          size="small"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DynamicField = ({
  fieldKey,
  fieldType,
  fieldValue,
  onValueChange,
  onRemove,
}) => (
  <div className="flex justify-between items-center">
    <TextField
      value={fieldValue}
      onChange={(e) => onValueChange(e.target.value)}
      label={fieldKey}
      fullWidth
      margin="normal"
      size="small"
      InputLabelProps={{
        style: { fontSize: "0.875rem" },
      }}
      inputProps={{
        style: { fontSize: "0.875rem" },
      }}
    />
    <Button
      variant="contained"
      color="error"
      onClick={onRemove}
      size="small"
      style={{ marginLeft: "8px" }}
    >
      Remove
    </Button>
  </div>
);

export default EmployeeUpdateModal;
