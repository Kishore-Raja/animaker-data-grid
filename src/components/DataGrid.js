import React, { useContext, useEffect } from "react";

import './style.css'

import DataGridContext from "../DataGridContext";

const DataGrid = () => {
    const { rows, setRows, cols, setCols, contentData, setContentData, contentCol, setContentCol } = useContext(DataGridContext);
    useEffect(() => {
        // Update the document title using the browser API
        if (contentData && contentCol) {
            rows[rows.length - 1][`head${contentCol}`] = contentData;
            setContentCol(0);
            setContentData("");
        }
    });

    const handleAddRow = (content = "", col) => {
        console.log("colsVal", cols)
        const item = {};
        for (var i = 0; i < cols; i++) {
            let colCheck = `${i + 1}`
            item[`head${i + 1}`] = (col === colCheck) ? content : "";
        }
        setRows([...rows, item])
        console.log(rows);
    };

    const handleAddColumn = (content = "", row) => {
        setCols(cols + 1)
        rows.map((item, index) => {
            if (row == (index + 1)) {
                item[`head${Object.keys(item).length + 1}`] = content;
            } else {
                //console.log(item)
                item[`head${Object.keys(item).length + 1}`] = "";
            }

        })
        if (rows.length < row) {
            setContentData(content);
            setContentCol(cols + 1)
        }
    };

    const handleChange = idx => e => {
        const { name, value } = e.target;
        const rows = [...rows];
        rows[idx] = {
            [name]: value
        };
        this.setRows(rows);
    };

    const generateHeader = () => {
        let res = [];
        console.log("cols", cols)
        res.push(<th className="inter-header" key={0}>{`  `}</th>)
        for (var i = 0; i < cols; i++) {
            res.push(<th scope="col" key={i + 1}>{`Head ${i + 1}`}</th>)
        }
        return res;
    }

    const generateTD = (idx, isAddRow) => {
        let td = [];
        for (var i = 0; i < cols; i++) {
            var valueOf = `head${i + 1}`;
            var cellKey = isAddRow ? `add_Row_${i + 1}` : `cell_${idx + 1}_${i + 1}`;
            if (isAddRow) {
                td.push(<td id={`add_row_${i + 1}`} onDragOver={(e) => { handleDragOver(e) }} onDrop={(e) => { handleOnDrop(e) }}>
                    <div id={`div_row_${i + 1}`} key={cellKey} className="draggable" onDragStart={(e) => handleDragStart(e, cellKey)} draggable>
                        <span id={cellKey} contentEditable={true} onPaste={(e) => handleOnPaste(e, "row")}>{""}</span>
                    </div>
                </td>)

            } else {
                td.push(<td id={`cell_td_${i + 1}`} onDragOver={(e) => { handleDragOver(e) }} onDrop={(e) => { handleOnDrop(e) }}>
                    <div id={`div_${idx + 1}_${i + 1}`} key={cellKey} className="draggable" onDragStart={(e) => handleDragStart(e, cellKey)} draggable>
                        <span id={cellKey} contentEditable={true}>{rows[idx][valueOf] ? rows[idx][valueOf] : ""}</span>
                    </div>
                </td>)

            }

        }
        return td;
    }

    const handleOnPaste = (e, cell) => {
        var clipboardData, pastedData;
        let dropElementID = e.target.id;
        let eleArr = dropElementID.split("_")
        console.log("eleArr", eleArr);
        let rowNo = eleArr[1] - 1;
        let colNo = eleArr[2];
        let addRowcheck = dropElementID.includes("Row");
        let addColcheck = dropElementID.includes("Col");
        // Stop data actually being pasted into div
        // e.stopPropagation();
        // e.preventDefault();

        // Get pasted data via clipboard API
        clipboardData = e.clipboardData;
        pastedData = clipboardData.getData('Text');

        e.stopPropagation();
        e.preventDefault();
        // let dropElementVal = document.getElementById(dropElementID).lastChild.parentElement;
        if (addRowcheck) {
            handleAddRow(pastedData, eleArr[2]);
            console.log("rows", rows)
        } else if (addColcheck) {
            if (rows.length < parseInt(eleArr[2])) {
                handleAddRow();
            }
            handleAddColumn(pastedData, parseInt(eleArr[2]));
            //  addColumnContent(cellContent, eleArr[2])
        }

    }

    const handleDragStart = (e, name) => {
        console.log("e", e)
        var cellContent = e.target.lastChild.innerHTML;
        console.log("cellContent", cellContent)
        e.dataTransfer.setData("id", cellContent)
    }

    const handleOnDrop = (e) => {
        let dropElementID = e.target.id;
        let cellContent = e.dataTransfer.getData("id")
        let eleArr = dropElementID.split("_")
        console.log("eleArr", eleArr);
        let rowNo = eleArr[1] - 1;
        let colNo = eleArr[2];


        let addRowcheck = dropElementID.includes("row") || dropElementID.includes("Row");
        let addColcheck = dropElementID.includes("col") || dropElementID.includes("Col");

        console.log("dropcomtent", cellContent, e.target)
        let dropElementVal = document.getElementById(dropElementID);
        if (addRowcheck) {
            handleAddRow(cellContent, eleArr[2]);
            console.log("rows", rows)
        } else if (addColcheck) {
            if (rows.length < parseInt(eleArr[2])) {
                handleAddRow();
            }
            handleAddColumn(cellContent, parseInt(eleArr[2]));
            //  addColumnContent(cellContent, eleArr[2])
        } else {
            console.log("dropVal", dropElementVal)
            rows[rowNo][`head${colNo}`] = cellContent;
            console.log("after update", rows);
            dropElementVal.innerHTML = cellContent;
        }

    }
    const handleDragOver = (e) => {
        e.preventDefault();

    }

    return (
        <div>
            <div className="container">
                <div className="row clearfix">
                    <div className="col-md-12 column">
                        <table
                            className="table table-bordered table-hover"
                            id="tab_logic"
                        >
                            <thead>
                                <tr>
                                    {generateHeader()}
                                    <th scope="col">
                                        <button onClick={handleAddColumn} className="btn btn-primary">
                                            Add Column
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((item, idx) => (
                                    <tr id="addr0" key={idx + 1}>
                                        <th scope="row">{`Label ${idx + 1}`}</th>
                                        {generateTD(idx)}
                                        <td id={`add_col_${idx + 1}`} onDragOver={(e) => { handleDragOver(e) }} onDrop={(e) => { handleOnDrop(e) }}>
                                            <div id={`div_col_${idx + 1}`}>
                                                <span id={`add_Col_${idx + 1}`} contentEditable={true} onPaste={(e) => handleOnPaste(e, "col")}></span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                <tr >
                                    <th>
                                        <button onClick={handleAddRow} className="btn btn-primary">
                                            Add Row
                                        </button>
                                    </th>
                                    {generateTD("add", true)}
                                    <td id={`add_col_${rows.length + 1}`} onDragOver={(e) => { handleDragOver(e) }} onDrop={(e) => { handleOnDrop(e) }}>
                                        <div id={`div_col_${rows.length + 1}`}>
                                            <span id={`add_Col_${rows.length + 1}`} contentEditable={true} onPaste={(e) => handleOnPaste(e, "col")}></span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div >
    );
};

export default DataGrid;
