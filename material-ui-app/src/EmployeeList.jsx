import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeUpdateModal from "./EmployeeUpdateModal";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/employees");
        setEmployees(response.data);
      } catch (err) {
        setError("Error fetching employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleUpdateClick = (employee) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  if (loading) {
    return <Typography>Loading employees...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="relative overflow-hidden h-full">
      <Typography variant="h4" gutterBottom>
        Employee List
      </Typography>
      <TableContainer component={Paper} style={{ maxHeight: "500px" }}>
        <Table stickyHeader aria-label="employee table">
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Dynamic Fields</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.employeeId}>
                <TableCell>{employee.employeeId}</TableCell>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.department || "N/A"}</TableCell>
                <TableCell>{employee.salary || "N/A"}</TableCell>
                <TableCell>
                  {employee.dynamicFields &&
                  employee.dynamicFields.length > 0 ? (
                    <Table>
                      <TableBody>
                        {employee.dynamicFields.map((field, index) => (
                          <TableRow key={index}>
                            <TableCell>{field.key}</TableCell>
                            <TableCell>{field.value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    "No dynamic fields"
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleUpdateClick(employee)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Employee Update Modal */}
      {isModalOpen && (
        <EmployeeUpdateModal
          employee={selectedEmployee}
          onClose={() => setIsModalOpen(false)}
          onUpdate={(updatedEmployee) => {
            setEmployees((prev) =>
              prev.map((emp) =>
                emp.employeeId === updatedEmployee.employeeId
                  ? updatedEmployee
                  : emp
              )
            );
          }}
        />
      )}
    </div>
  );
};

export default EmployeeList;
