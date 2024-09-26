import React, { useState } from "react";
import EmployeeList from "./EmployeeList";
import SchemaManagement from "./SchemaManagement";
import EmployeeForm from "./EmployeeForm";

function App() {
  return (
    <div className="App">
      <div className="flex flex-row space-x-4">
        <div className="flex-auto overflow-hidden">
          <EmployeeList />
        </div>
        <div className="flex-auto">
          <EmployeeForm />
        </div>
      </div>
    </div>
  );
}

export default App;
