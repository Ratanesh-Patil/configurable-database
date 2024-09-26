import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Paper, List, ListItem, ListItemText } from "@mui/material";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get("http://localhost:8081/api/tasks/all");
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  return (
    <Paper style={{ padding: 20 }}>
      <Typography variant="h5" gutterBottom>
        Tasks
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem key={task.id}>
            <ListItemText
              primary={task.taskName}
              secondary={
                <>
                  <div>{task.description}</div>
                  {Object.entries(task.additionalFields).map(([key, value]) => (
                    <div key={key}>
                      <strong>{key}:</strong> {value}
                    </div>
                  ))}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default TaskList;
