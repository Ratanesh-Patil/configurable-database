import React from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import EmployeeList from "./EmployeeList";
import EmployeeForm from "./EmployeeForm";

function App() {
  return (
    <Container style={{ marginTop: "20px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            style={{ padding: "16px", backgroundColor: "#f5f5f5" }}
          >
            <Typography variant="h5" gutterBottom>
              Employee List
            </Typography>
            <EmployeeList />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            style={{ padding: "16px", backgroundColor: "#f5f5f5" }}
          >
            <Typography variant="h5" gutterBottom>
              Employee Form
            </Typography>
            <EmployeeForm />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
