// src/components/TaskList.js

import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onDelete }) => {
    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold">Tasks</h2>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default TaskList;
