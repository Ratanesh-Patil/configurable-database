import React, { useState } from "react";
import axios from "axios";

const EmployeeForm = () => {
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
    console.log(updatedFields);

    setDynamicFields(updatedFields);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   // Prepare the dynamic fields as a JSON object
  //   const dynamicFieldsData = dynamicFields.reduce((acc, curr) => {
  //     if (curr.key) {
  //       acc[curr.key] = curr.value;
  //     }
  //     return acc;
  //   }, {});

  //   const employeeData = {
  //     firstName,
  //     lastName,
  //     email,
  //     department,
  //     salary: salary ? parseInt(salary) : null,
  //     dynamicFields: dynamicFieldsData,
  //   };

  //   try {
  //     await axios.post("http://localhost:8080/api/employees", employeeData); // Replace with your API endpoint
  //     alert("Employee added successfully!");
  //     // Reset form
  //     setFirstName("");
  //     setLastName("");
  //     setEmail("");
  //     setDepartment("");
  //     setSalary("");
  //     setDynamicFields([{ key: "", value: "", type: "string" }]);
  //   } catch (error) {
  //     console.error("Error adding employee:", error);
  //     alert("Failed to add employee.");
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Dynamic fields with metadata (key, value, type)
    const dynamicFieldsData = dynamicFields.map((field) => ({
      key: field.key,
      value: field.value,
      type: field.type, // Include type in the dynamic field data
    }));

    const employeeData = {
      firstName,
      lastName,
      email,
      department,
      salary: salary ? parseInt(salary) : null,
      dynamicFields: dynamicFieldsData, // Send the full object
    };

    try {
      await axios.post("http://localhost:8081/api/employees/add", employeeData);
      alert("Employee added successfully!");
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
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
            type="text"
            placeholder="Enter text"
            value={field.value}
            onChange={(e) =>
              handleDynamicFieldChange(index, "value", e.target.value)
            }
            required
          />
        );
      case "number":
        return (
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
            type="number"
            placeholder="Enter number"
            value={field.value}
            onChange={(e) =>
              handleDynamicFieldChange(index, "value", e.target.value)
            }
            required
          />
        );
      case "boolean":
        return (
          <input
            type="checkbox"
            checked={field.value === "true"}
            onChange={(e) =>
              handleDynamicFieldChange(
                index,
                "value",
                e.target.checked ? "true" : "false"
              )
            }
          />
        );
      case "date":
        return (
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
            type="date"
            value={field.value}
            onChange={(e) =>
              handleDynamicFieldChange(index, "value", e.target.value)
            }
            required
          />
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Employee Form</h2>
      <div className="m-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          First Name:
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="m-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Last Name:
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="m-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email:
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="m-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Department:
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
      </div>
      <div className="m-2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Salary:
        </label>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
          type="number"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>

      <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white m-2">
        Dynamic Fields:
      </h3>
      {dynamicFields.map((field, index) => (
        <div className="flex m-2 gap-2" key={index}>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
            type="text"
            placeholder="Field Name"
            value={field.key}
            onChange={(e) =>
              handleDynamicFieldChange(index, "key", e.target.value)
            }
            required
          />

          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5"
            value={field.type}
            onChange={(e) =>
              handleDynamicFieldChange(index, "type", e.target.value)
            }
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="date">Date</option>
          </select>

          {renderDynamicFieldInput(field, index)}

          <button
            type="button"
            className="bg-red-500 text-white p-1 rounded-lg"
            onClick={() => handleRemoveField(index)}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        className="m-2 bg-blue-500 text-white p-1 rounded-lg"
        onClick={handleAddField}
      >
        Add Dynamic Field
      </button>

      <div>
        <button
          type="submit"
          className="m-2 bg-green-500 text-white p-1 rounded-lg"
        >
          Add Employee
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
