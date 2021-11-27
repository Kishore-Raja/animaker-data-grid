
import './App.css';
import React, { useState } from "react";
//import DataGrid from './components/DataGrid';
import DataGridContext from "./DataGridContext";
import DataGrid from "./components/DataGrid";

const App = () => {
  const [cols, setCols] = useState(4);
  const [contentData, setContentData] = useState("");
  const [contentCol, setContentCol] = useState(0);
  const [selectedRowCells, setSelectedRowCells] = useState([]);
  const [selectedColCells, setSelectedColCells] = useState([]);
  const [copiedCells, setCopiedCells] = useState([]);
  const [mouseDowned, setMouseDowned] = useState(false);
  const [multiCellCopied, setMultiCellCopied] = useState(false);

  const rowItems = {};
  for (var i = 0; i < cols; i++) {
    rowItems[`head${i + 1}`] = ""
  }
  const [rows, setRows] = useState([rowItems]);
  const [keyAction, setKeyAction] = useState("")

  const value = { rows, setRows, cols, setCols, contentData, setContentData, contentCol, setContentCol, selectedRowCells, setSelectedRowCells, selectedColCells, setSelectedColCells, mouseDowned, setMouseDowned, copiedCells, setCopiedCells, multiCellCopied, setMultiCellCopied, keyAction, setKeyAction };

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
