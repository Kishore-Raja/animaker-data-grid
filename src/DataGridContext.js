import React from "react";

// set the defaults
const DataGridContext = React.createContext({
    rows: [],
    setRows: () => { },
    cols: [],
    setCols: () => { },
    contentData: "",
    setContentData: () => { },
    contentCol: 0,
    setContentCol: () => { },
    selectedRowCells: [],
    setSelectedRowCells: () => { },
    selectedColCells: [],
    setSelectedColCells: () => { },
    mouseDowned: false,
    setMouseDowned: () => { },
    copiedCells: [],
    setCopiedCells: () => { },
    multiCellCopied: false,
    setMultiCellCopied: () => { },
    keyAction: "",
    setKeyAction: () => { },
});

export default DataGridContext;
