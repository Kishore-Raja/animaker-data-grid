
import './App.css';
import React, { useState } from "react";
//import DataGrid from './components/DataGrid';
import DataGridContext from "./DataGridContext";
import DataGrid from "./components/DataGrid";

const App = () => {
  const [cols, setCols] = useState(4);
  const [contentData, setContentData] = useState("");
  const [contentCol, setContentCol] = useState(0);
  const rowItems = {};
  for (var i = 0; i < cols; i++) {
    rowItems[`head${i + 1}`] = ""
  }
  const [rows, setRows] = useState([rowItems]);

  const value = { rows, setRows, cols, setCols, contentData, setContentData, contentCol, setContentCol };

  return (
    <DataGridContext.Provider value={value}>
      <h2>Animaker Data Grid</h2>
      <div>
        {/* Can be nested */}
        <DataGrid />
      </div>
    </DataGridContext.Provider>
  );
};

export default App;
