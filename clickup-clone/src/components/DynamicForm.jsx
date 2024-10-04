import React, { useState } from "react";
import { FaPlusCircle, FaTrash } from "react-icons/fa";

const DynamicForm = () => {
  const [fields, setFields] = useState([{ name: "", type: "text" }]);

  // Handle adding a new field
  const handleAddField = () => {
    setFields([...fields, { name: "", type: "text" }]);
  };

  // Handle removing a field
  const handleRemoveField = (index) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  // Handle input change
  const handleInputChange = (index, event) => {
    const values = [...fields];
    values[index][event.target.name] = event.target.value;
    setFields(values);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fields); // You can use this to send data to backend/API
  };

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Dynamic Form</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div key={index} className="flex space-x-3 mb-4 items-center">
            <input
              type="text"
              name="name"
              value={field.name}
              onChange={(event) => handleInputChange(index, event)}
              placeholder="Field Name"
              className="w-full p-2 rounded-md border border-gray-300"
            />
            <select
              name="type"
              value={field.type}
              onChange={(event) => handleInputChange(index, event)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
            </select>
            <button
              type="button"
              onClick={() => handleRemoveField(index)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddField}
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
        >
          <FaPlusCircle size={20} />
          <span>Add Field</span>
        </button>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DynamicForm;
