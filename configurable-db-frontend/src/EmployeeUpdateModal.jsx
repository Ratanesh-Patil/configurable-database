import React, { useState } from "react";
import axios from "axios";

const EmployeeUpdateModal = ({ employee, onClose, onUpdate }) => {
  const [firstName, setFirstName] = useState(employee.firstName);
  const [lastName, setLastName] = useState(employee.lastName);
  const [email, setEmail] = useState(employee.email);
  const [department, setDepartment] = useState(employee.department);
  const [salary, setSalary] = useState(employee.salary);
  const [dynamicFields, setDynamicFields] = useState(
    employee.dynamicFields || {}
  );

  const handleDynamicFieldChange = (key, value) => {
    setDynamicFields((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addDynamicField = (key, value) => {
    if (key.trim() && value.trim()) {
      setDynamicFields((prev) => ({
        ...prev,
        [key]: value,
      }));
      setNewFieldKey(""); // Clear key input
      setNewFieldValue(""); // Clear value input
    }
  };

  const removeDynamicField = (key) => {
    setDynamicFields((prev) => {
      const updatedFields = { ...prev };
      delete updatedFields[key];
      return updatedFields;
    });
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
        `http://localhost:8080/api/employees/update/${employee.employeeId}`,
        updatedEmployee
      );

      onUpdate(response.data); // Update parent component's state
      onClose(); // Close modal
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  const [newFieldKey, setNewFieldKey] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");

  return (
    <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/2 overflow-auto max-h-[80vh]">
        <h2 className="text-lg text-black font-semibold mb-4">Update Employee</h2>
        <div className="space-y-4">
          {/* First Name */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Last Name */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Email */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Department */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="department"
            >
              Department
            </label>
            <input
              id="department"
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Salary */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="salary"
            >
              Salary
            </label>
            <input
              id="salary"
              type="number"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Dynamic Fields */}
          <div className="space-y-2">
            <h4 className="text-gray-700 text-sm font-bold">Dynamic Fields</h4>
            {Object.keys(dynamicFields).map((key) => (
              <div key={key} className="grid grid-cols-3 gap-x-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {key}
                </label>
                <input
                  type="text"
                  placeholder={`Value for ${key}`}
                  value={dynamicFields[key]}
                  onChange={(e) =>
                    handleDynamicFieldChange(key, e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => removeDynamicField(key)}
                >
                  Remove
                </button>
              </div>
            ))}

            {/* New Dynamic Field Inputs */}
            <div className="grid grid-cols-3 gap-x-2">
              <input
                type="text"
                placeholder="New Field Key"
                value={newFieldKey}
                onChange={(e) => setNewFieldKey(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="New Field Value"
                value={newFieldValue}
                onChange={(e) => setNewFieldValue(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => addDynamicField(newFieldKey, newFieldValue)}
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

export default EmployeeUpdateModal;
