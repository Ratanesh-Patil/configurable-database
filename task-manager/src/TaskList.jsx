import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks along with their custom field values
  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:8081/api/tasks");
    console.log(response.data);

    const tasksWithFields = await Promise.all(
      response.data.map(async (task) => {
        // Fetch custom field values for each task
        const fieldValuesResponse = await axios.get(
          `http://localhost:8081/api/task_field_values/${task.taskId}`
        );
        return { ...task, customFields: fieldValuesResponse.data };
      })
    );
    setTasks(tasksWithFields);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8081/api/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Box sx={{ maxWidth: "400px", padding: 2, fontSize: "14px" }}>
      <Typography variant="h6" gutterBottom>
        Task List
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.taskId}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(task.taskId)}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            }
            sx={{
              padding: "10px",
              marginBottom: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <ListItemText
              primary={
                <Typography variant="subtitle1" sx={{ fontSize: "14px" }}>
                  {task.title}
                </Typography>
              }
              secondary={
                <>
                  <Typography variant="body2" sx={{ fontSize: "12px" }}>
                    {task.description}
                  </Typography>
                  <Typography variant="caption">
                    Status: {task.status}
                  </Typography>

                  {/* Displaying custom fields */}
                  {task.customFields && task.customFields.length > 0 && (
                    <Box sx={{ marginTop: "8px" }}>
                      {task.customFields.map((field) => (
                        <Typography
                          key={field.fieldId}
                          variant="caption"
                          sx={{ display: "block", fontSize: "12px" }}
                        >
                          {field.fieldName}: {field.value}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TaskList;
