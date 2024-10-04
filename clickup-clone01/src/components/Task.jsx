// src/components/Task.js

import React from 'react';

const Task = ({ task, onDelete }) => {
    return (
        <div className="bg-white shadow-md rounded-md p-4 mb-4">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p className="text-sm text-gray-500">Priority: {task.priority}</p>
            <button
                onClick={() => onDelete(task.id)}
                className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600 mt-2"
            >
                Delete
            </button>
        </div>
    );
};

export default Task;
