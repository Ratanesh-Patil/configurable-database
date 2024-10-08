import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
  Divider,
  ListItemIcon,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import SettingsIcon from "@mui/icons-material/Settings";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"; // Added for close functionality
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import AdminFieldConfiguration from "./AdminFieldConfiguration";
import SprintList from "./SprintList";
import SprintDetail from "./SprintDetail";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    // <ThemeProvider theme={darkTheme}>
    <>
      <Router>
        {/* AppBar at the top with static profile avatar and application name */}
        <AppBar position="fixed" color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ marginRight: 2 }}
            >
              {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Task Manager
            </Typography>
            <Avatar alt="User Profile" src="/static/images/avatar/1.jpg" />
          </Toolbar>
        </AppBar>

        {/* Sidebar Drawer */}
        <Drawer
          variant="persistent"
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer}
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              top: "64px", // Adjust for AppBar height
            },
          }}
        >
          <Divider />
          <List>
            <ListItem button component={Link} to="/">
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <HomeIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Home"
                sx={{ "& .MuiTypography-root": { fontSize: "0.85rem" } }}
              />
            </ListItem>
            <ListItem button component={Link} to="/task-form">
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <AddIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Add Task"
                sx={{ "& .MuiTypography-root": { fontSize: "0.85rem" } }}
              />
            </ListItem>
            <ListItem button component={Link} to="/task-list">
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <ListIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Task List"
                sx={{ "& .MuiTypography-root": { fontSize: "0.85rem" } }}
              />
            </ListItem>
            <ListItem button component={Link} to="/admin-config">
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <SettingsIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Admin Field Configuration"
                sx={{ "& .MuiTypography-root": { fontSize: "0.85rem" } }}
              />
            </ListItem>
            <ListItem button component={Link} to="/sprints">
              <ListItemIcon sx={{ minWidth: "30px" }}>
                <DashboardIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary="Sprints"
                sx={{ "& .MuiTypography-root": { fontSize: "0.85rem" } }}
              />
            </ListItem>
          </List>
        </Drawer>

        {/* Main content container */}
        <Container
          maxWidth="md"
          style={{
            marginTop: "64px", // Adjust for the AppBar height
            marginLeft: isDrawerOpen ? "240px" : "0px", // Adjust content based on Drawer status
            transition: "margin-left 0.3s", // Smooth transition when the drawer toggles
          
          }}
        >
          <Box my={2}>
            {/* Routes define which component to show when a specific path is accessed */}
            <Routes>
              <Route path="/" element={<h1>Welcome to the Task Manager</h1>} />
              <Route path="/task-form" element={<TaskForm />} />
              <Route path="/task-list" element={<TaskList />} />
              <Route
                path="/admin-config"
                element={<AdminFieldConfiguration />}
              />
              <Route path="/sprints" element={<SprintList />} />
              <Route path="/sprints/:sprintId" element={<SprintDetail />} />
              <Route
                path="/sprints/:sprintId/tasks"
                element={<SprintDetail />}
              />
            </Routes>
          </Box>
        </Container>
      </Router>
    </>
    // </ThemeProvider>
  );
};

export default App;
