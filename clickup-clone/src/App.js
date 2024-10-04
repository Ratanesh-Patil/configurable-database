import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Header from "./components/Header";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <Header />
      <div className="container mx-auto p-5">
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} deleteTask={deleteTask} />
      </div>
    </div>
  );
};

export default App;

// import React from "react";
// import DynamicForm from "./components/DynamicForm";
// import TaskForm from "./components/TaskForm";

// const App = () => {
//   return (
//     <div className="min-h-screen bg-gray-200 p-5">
//       {/* <DynamicForm /> */}
//       <TaskForm/>
//     </div>
//   );
// };

// export default App;
