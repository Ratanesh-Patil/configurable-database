import React from 'react';
import { FaCheckCircle, FaTrash } from 'react-icons/fa';

const TaskList = ({ tasks, deleteTask }) => {
  return (
    <div className="mt-5">
      <ul className="space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="bg-white p-3 rounded-md shadow flex justify-between items-center"
          >
            <span className="text-gray-700">{task}</span>
            <div className="space-x-2">
              <button className="text-green-500">
                <FaCheckCircle size={20} />
              </button>
              <button className="text-red-500" onClick={() => deleteTask(index)}>
                <FaTrash size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
