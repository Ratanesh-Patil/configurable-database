// src/App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await axios.get('http://localhost:8081/api/tasks');
            setTasks(response.data);
        };
        fetchTasks();
    }, []);

    const handleTaskCreated = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const handleDeleteTask = async (id) => {
        await axios.delete(`http://localhost:8081/api/tasks/${id}`);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
            <TaskForm onTaskCreated={handleTaskCreated} />
            <TaskList tasks={tasks} onDelete={handleDeleteTask} />
        </div>
    );
};

export default App;
