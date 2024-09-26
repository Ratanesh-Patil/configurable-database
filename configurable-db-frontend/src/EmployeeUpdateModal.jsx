import React, { useState } from "react";
import axios from "axios";

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/2 overflow-auto max-h-[80vh]">
        <h2 className="text-lg text-black font-semibold mb-4">
          Update Employee
        </h2>
        <div className="space-y-4">
          {/* Other input fields */}
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border rounded"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded"
          />
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full border rounded"
          />
          <input
            type="number"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full border rounded"
          />

          {/* Dynamic Fields */}
          <div className="space-y-2">
            <h4 className="text-gray-700 text-sm font-bold">Dynamic Fields</h4>
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
            <div className="grid grid-cols-4 gap-x-2">
              <input
                type="text"
                placeholder="New Field Key"
                value={newFieldKey}
                onChange={(e) => setNewFieldKey(e.target.value)}
                className="w-full border rounded"
              />

              {/* Field Type Selection */}
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value)}
              >
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
                <option value="date">Date</option>
              </select>

              {/* New Field Value Input */}
              {newFieldType === "string" && (
                <input
                  type="text"
                  placeholder="New Field Value"
                  value={newFieldValue}
                  onChange={(e) => setNewFieldValue(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              )}
              {newFieldType === "number" && (
                <input
                  type="number"
                  placeholder="New Field Value"
                  value={newFieldValue}
                  onChange={(e) => setNewFieldValue(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              )}
              {newFieldType === "boolean" && (
                <select
                  value={newFieldValue}
                  onChange={(e) => setNewFieldValue(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              )}
              {newFieldType === "date" && (
                <input
                  type="date"
                  placeholder="New Field Value"
                  value={newFieldValue}
                  onChange={(e) => setNewFieldValue(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              )}

              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={addDynamicField}
              >
                Add Dynamic Field
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

const DynamicField = ({
  fieldKey,
  fieldValue,
  fieldType,
  onValueChange,
  onRemove,
}) => {
  return (
    <div className="grid grid-cols-4 gap-x-2">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {fieldKey}
      </label>

      {/* Input field for dynamic values */}
      {fieldType === "string" && (
        <input
          type="text"
          value={fieldValue}
          placeholder={`Value for ${fieldKey}`}
          onChange={(e) => onValueChange(e.target.value)}
          className="w-full p-2 border rounded"
        />
      )}

      {fieldType === "number" && (
        <input
          type="number"
          value={fieldValue}
          placeholder={`Value for ${fieldKey}`}
          onChange={(e) => onValueChange(e.target.value)}
          className="w-full p-2 border rounded"
        />
      )}

      {fieldType === "boolean" && (
        <select
          value={fieldValue}
          onChange={(e) => onValueChange(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      )}

      {fieldType === "date" && (
        <input
          type="date"
          value={fieldValue}
          onChange={(e) => onValueChange(e.target.value)}
          className="w-full p-2 border rounded"
        />
      )}

      <button
        className="bg-red-500 text-white px-2 py-1 rounded"
        onClick={onRemove}
      >
        Remove
      </button>
    </div>
  );
};

export default EmployeeUpdateModal;
