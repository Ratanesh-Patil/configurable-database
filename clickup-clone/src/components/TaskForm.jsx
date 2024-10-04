// import React, { useState } from "react";

// const TaskForm = ({ addTask }) => {
//   const [task, setTask] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (task.trim()) {
//       addTask(task);
//       setTask("");
//     }
//   };

//   return (
//     <div className="bg-gray-100 p-4 rounded-md shadow-md">
//       <form onSubmit={handleSubmit} className="flex space-x-3">
//         <input
//           type="text"
//           className="w-full p-2 rounded-md border border-gray-300"
//           value={task}
//           onChange={(e) => setTask(e.target.value)}
//           placeholder="Enter a new task"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//         >
//           Add Task
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TaskForm;

import React, { useState } from "react";
import { FaPlus, FaTrashAlt, FaUserPlus } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskForm = () => {
  const [fields, setFields] = useState([{ name: "", type: "text" }]);
  const [assignees, setAssignees] = useState([]);
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState("Medium");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

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
    // Handle task creation
    console.log({
      taskTitle,
      taskDescription,
      assignees,
      dueDate,
      priority,
      fields,
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create Task</h2>

      {/* Task Title */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Task Title
        </label>
        <input
          type="text"
          placeholder="Enter task title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="w-full p-3 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Task Description */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Task Description
        </label>
        <textarea
          placeholder="Enter task description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="w-full p-3 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
        />
      </div>

      {/* Assignees */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Assignees
        </label>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Add team members"
            className="flex-grow p-3 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value) {
                setAssignees([...assignees, e.target.value]);
                e.target.value = "";
              }
            }}
          />
          <FaUserPlus className="ml-3 text-gray-600" />
        </div>
        <div className="mt-2">
          {assignees.map((assignee, index) => (
            <span
              key={index}
              className="inline-block bg-gray-200 text-gray-800 px-2 py-1 rounded-full mr-2 text-sm"
            >
              {assignee}
            </span>
          ))}
        </div>
      </div>

      {/* Due Date */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Due Date
        </label>
        <DatePicker
          selected={dueDate}
          onChange={(date) => setDueDate(date)}
          className="w-full p-3 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholderText="Select a due date"
        />
      </div>

      {/* Priority */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Priority
        </label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-3 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Custom Fields */}
      <h3 className="text-lg font-semibold mb-2 text-gray-800">
        Custom Fields
      </h3>
      {fields.map((field, index) => (
        <div key={index} className="flex items-center mb-4">
          <input
            type="text"
            name="name"
            value={field.name}
            onChange={(event) => handleInputChange(index, event)}
            placeholder="Enter field name"
            className="flex-grow p-3 border rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            name="type"
            value={field.type}
            onChange={(event) => handleInputChange(index, event)}
            className="ml-3 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="date">Date</option>
          </select>
          <button
            type="button"
            onClick={() => handleRemoveField(index)}
            className="ml-3 p-2 text-red-600 hover:text-red-800"
          >
            <FaTrashAlt />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddField}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
      >
        <FaPlus />
        <span>Add Field</span>
      </button>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition-all"
        >
          Submit Task
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
