import React, { useState } from "react";
import EmployeeList from "./EmployeeList";
import SchemaManagement from "./SchemaManagement";
import EmployeeForm from "./EmployeeForm";

function App() {
  const managers = [
    {
      name: "Manager 1",
      employees: ["Employee A1", "Employee A2", "Employee A3"],
    },
    {
      name: "Manager 2",
      employees: ["Employee B1", "Employee B2"],
    },
    {
      name: "Manager 3",
      employees: ["Employee C1", "Employee C2", "Employee C3", "Employee C4"],
    },
  ];

  return (
    <div className="App">
      <div className="flex flex-row space-x-4">
        <div className="flex-2 overflow-hidden">
          <EmployeeList />
        </div>
        <div className="flex-2">
          <EmployeeForm />
        </div>
      </div>
    </div>
    // <>
    //   <div className="space-y-2">
    //     {managers.map((manager, index) => (
    //       <div key={index} className="relative group">
    //         <div className="p-4 border border-gray-300 rounded hover:bg-gray-100 transition">
    //           {manager.name}
    //         </div>
    //         <div className="absolute left-28 top-full mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded p-2 hidden group-hover:block">
    //           <ul className="space-y-1">
    //             {manager.employees.map((employee, idx) => (
    //               <li key={idx} className="text-gray-700">
    //                 {employee}
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </>
  );
}

export default App;
