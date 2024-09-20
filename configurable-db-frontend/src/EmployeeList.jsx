import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeUpdateModal from "./EmployeeUpdateModal";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // To track the selected employee
  const [isModalOpen, setIsModalOpen] = useState(false); // To toggle the modal

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/employees");
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
    setSelectedEmployee(employee); // Set the selected employee for the modal
    setIsModalOpen(true); // Open the modal
  };

  if (loading) {
    return <p>Loading employees...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="relative overflow-hidden h-full">
      <h2>Employee List</h2>
      {/* Apply scroll only to the table */}
      <div className="overflow-y-auto max-h-[500px]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Employee ID
              </th>
              <th scope="col" className="px-6 py-3">
                First Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Salary
              </th>
              <th scope="col" className="px-6 py-3">
                Dynamic Fields
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>{" "}
              {/* Update Button */}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.employeeId}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4">{employee.employeeId}</td>
                <td className="px-6 py-4">{employee.firstName}</td>
                <td className="px-6 py-4">{employee.lastName}</td>
                <td className="px-6 py-4">{employee.email}</td>
                <td className="px-6 py-4">{employee.department || "N/A"}</td>
                <td className="px-6 py-4">{employee.salary || "N/A"}</td>
                <td className="px-6 py-4">
                  {/* Scrollable dynamic fields section */}
                  <div className="overflow-y-auto max-h-[150px]  p-2">
                    {employee.dynamicFields &&
                    Object.keys(employee.dynamicFields).length > 0 ? (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr className="bg-gray-50">
                            <th
                              scope="col"
                              className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Field
                            </th>
                            <th
                              scope="col"
                              className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {Object.entries(employee.dynamicFields).map(
                            ([key, value]) => (
                              <tr key={key}>
                                <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {key}
                                </td>
                                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                  {value}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    ) : (
                      "No dynamic fields"
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {/* Update Button */}
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleUpdateClick(employee)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Employee Update Modal */}
      {isModalOpen && (
        <EmployeeUpdateModal
          employee={selectedEmployee}
          onClose={() => setIsModalOpen(false)}
          onUpdate={(updatedEmployee) => {
            // Handle the updated employee data
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
