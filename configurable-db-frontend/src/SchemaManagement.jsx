import React, { useState } from "react";
import axios from "axios";

const SchemaManagement = () => {
  const [tableName, setTableName] = useState("");
  const [columnName, setColumnName] = useState("");
  const [columnType, setColumnType] = useState("");
  const [newColumnType, setNewColumnType] = useState("");

  const handleAddColumn = () => {
    console.log(tableName, columnName, columnType);

    axios
      .post("http://localhost:8080/api/schema/addColumn", null, {
        params: { tableName, columnName, columnType },
      })
      .then((response) => alert("Column added successfully"))
      .catch((error) => console.error("Error adding column:", error));
  };

  const handleRemoveColumn = () => {
    axios
      .post("http://localhost:8080/api/schema/removeColumn", null, {
        params: { tableName, columnName },
      })
      .then((response) => alert("Column removed successfully"))
      .catch((error) => console.error("Error removing column:", error));
  };

  const handleUpdateColumnType = () => {
    axios
      .post("http://localhost:8080/api/schema/updateColumnType", null, {
        params: { tableName, columnName, newColumnType },
      })
      .then((response) => alert("Column type updated successfully"))
      .catch((error) => console.error("Error updating column type:", error));
  };

  return (
    <div>
      <h2>Schema Management</h2>
      <div>
        <h3>Add Column</h3>
        <input
          type="text"
          placeholder="Table Name"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Column Name"
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Column Type"
          value={columnType}
          onChange={(e) => setColumnType(e.target.value)}
        />
        <button onClick={handleAddColumn}>Add Column</button>
      </div>
      <div>
        <h3>Remove Column</h3>
        <input
          type="text"
          placeholder="Table Name"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Column Name"
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
        />
        <button onClick={handleRemoveColumn}>Remove Column</button>
      </div>
      <div>
        <h3>Update Column Type</h3>
        <input
          type="text"
          placeholder="Table Name"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Column Name"
          value={columnName}
          onChange={(e) => setColumnName(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Column Type"
          value={newColumnType}
          onChange={(e) => setNewColumnType(e.target.value)}
        />
        <button onClick={handleUpdateColumnType}>Update Column Type</button>
      </div>
    </div>
  );
};

export default SchemaManagement;
