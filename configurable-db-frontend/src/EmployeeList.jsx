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
        const response = await axios.get("http://localhost:8081/api/employees");
        setEmployees(response.data);
        console.log(response.data);
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
          <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-1">
                Employee ID
              </th>
              <th scope="col" className="px-1 py-1">
                First Name
              </th>
              <th scope="col" className="px-1 py-1">
                Last Name
              </th>
              <th scope="col" className="px-1 py-1">
                Email
              </th>
              <th scope="col" className="px-1 py-1">
                Department
              </th>
              <th scope="col" className="px-1 py-1">
                Salary
              </th>
              <th scope="col" className="px-1 py-1">
                Dynamic Fields
              </th>
              <th scope="col" className="px-1 py-1">
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
                <td className="px-1 py-1">{employee.employeeId}</td>
                <td className="px-1 py-1">{employee.firstName}</td>
                <td className="px-1 py-1">{employee.lastName}</td>
                <td className="px-1 py-1">{employee.email}</td>
                <td className="px-1 py-1">{employee.department || "N/A"}</td>
                <td className="px-1 py-1">{employee.salary || "N/A"}</td>
                <td className="px-1 py-1">
                  {/* Scrollable dynamic fields section */}
                  <div className="overflow-y-auto max-h-[150px] p-2">
                    {employee.dynamicFields &&
                    Object.keys(employee.dynamicFields).length > 0 ? (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr className="bg-gray-50">
                            <th
                              scope="col"
                              className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Field
                            </th>
                            <th
                              scope="col"
                              className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {/* {Object.entries(employee.dynamicFields).map(
                            ([key, value]) => (
                              <tr key={key}>
                                <td className="px-1 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {key}
                                </td>
                                <td className="px-1 py-1 whitespace-nowrap text-sm text-gray-500">
                                  {value}
                                </td>
                              </tr>
                            )
                          )} */}
                          {employee.dynamicFields.map((field, index) => (
                            <tr key={index}>
                              <td className="px-1 py-1 text-sm font-medium text-gray-900">
                                {field.key}
                              </td>
                              {/* <td className="px-1 py-1 text-sm text-gray-500">
                                {field.type}
                              </td> */}
                              <td className="px-1 py-1 text-sm text-gray-500">
                                {field.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      "No dynamic fields"
                    )}
                  </div>
                </td>
                <td className="px-1 py-1">
                  {/* Update Button */}
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded"
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
