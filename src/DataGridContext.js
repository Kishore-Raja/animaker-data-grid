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
    setContentCol: () => { }
});

export default DataGridContext;
