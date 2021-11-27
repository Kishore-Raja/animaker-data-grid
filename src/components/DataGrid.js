import React, { useContext, useEffect } from "react";

import './style.css'

import DataGridContext from "../DataGridContext";

const DataGrid = () => {
    const { rows, setRows, cols, setCols, contentData, setContentData, contentCol, setContentCol, selectedRowCells, setSelectedRowCells, selectedColCells, setSelectedColCells, mouseDowned, setMouseDowned, copiedCells, setCopiedCells, multiCellCopied, setMultiCellCopied, keyAction, setKeyAction } = useContext(DataGridContext);
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

    const handleAddRowArray = (content, col, colsIncreased, addColum = false, midcol = false) => {
        let coli = parseInt(col)
        console.log("colsVal", cols)
        const items = [...rows];
        const item = {};
        let x = 0;
        let addColumn = addColum;
        let midcolumn = midcol;
        let iterateCol = cols + colsIncreased;
        let rowNo = rows.length
        for (var i = 0; i < iterateCol; i++) {
            let colCheck = `${i + 1}`;
            let contentText = "";
            if (Array.isArray(content)) {
                let j = i;
                if (coli === parseInt(colCheck)) {

                    content.forEach((itecontent, index) => {
                        if ((addColumn && index) || (midcolumn && (i === cols))) {
                            //setCols(cols => cols + 1)
                            handleAddColumn(itecontent, rowNo + 1);
                            item[`head${i + 1}`] = itecontent;
                        } else {
                            item[`head${i + 1}`] = itecontent;
                        }
                        i++;

                    })
                } else {
                    if (!item[`head${i + 1}`]) {
                        item[`head${i + 1}`] = "";
                    }
                }

            }

        }
        setRows(rows => ([...rows, item]))
        console.log(rows);
    };

    const handleAddColumn = (content = "", row, increment = 0) => {
        if (increment) {
            setCols(increment)
        } else {
            setCols(cols => cols + 1)
        }
        rows.map((item, index) => {
            if (row == (index + 1)) {
                item[`head${Object.keys(item).length + 1}`] = content;
            } else {
                //console.log(item)
                item[`head${Object.keys(item).length + 1}`] = "";
            }

        })
        /*  if (rows.length < row) {
              setContentData(content);
              //let colladd = cols+1;
              setContentCol(cols + 1)
          } */
    };

    const handleOnChange = e => {
        console.log(e.cancelable);
        console.log(keyAction)
        const { id, innerText } = e.target;
        console.log(id, innerText)
        let dropElementID = e.target.id;
        let eleArr = dropElementID.split("_")
        console.log("eleArr", eleArr);
        let rowNo = (eleArr[1] === "Row") ? rows.length : eleArr[1] - 1;
        let colNo = eleArr[2];
        let tableItems = [...rows]
        console.log("rows", rows, rowNo, colNo)
        if (multiCellCopied && keyAction !== 'keyin') {
            e.target.innerText = '';
            console.log("copied")
            let colsIncreased = 0;
            let colCreated = false;
            let rowCreatewithColumn = true
            let midcol = true;
            for (const rowData in copiedCells) {
                let rowItem = copiedCells[rowData]
                let colnum = parseInt(colNo);

                if (eleArr[1] === "Row" && parseInt(colNo) === cols) {
                    console.log("add row and column");
                    handleAddRowArray(rowItem, colNo, colsIncreased, rowCreatewithColumn);
                    rowCreatewithColumn = false;
                    rowNo++;
                    continue;
                } else if (colNo === "Col" && (rowNo > (rows.length - 1))) {
                    colnum = cols;
                    colNo = cols + 1;
                    colsIncreased = rowItem.length;
                    handleAddRowArray(rowItem, colNo, colsIncreased, rowCreatewithColumn, midcol);
                    rowCreatewithColumn = false
                    midcol = false;
                    rowNo++;
                    continue;
                } else if (rowNo >= tableItems.length) {
                    handleAddRowArray(rowItem, colNo, colsIncreased, false, midcol);
                    midcol = false;
                    rowNo++;
                    continue;
                } else if (colNo === "Col") {
                    colnum = cols;
                    colNo = cols + 1;
                    rowItem.forEach((contentItem, index) => {
                        handleAddColumn(contentItem, rowNo + 1, colnum + 1)
                        colnum = colnum + 1
                        //tableItems[rowNo][`head${colnum}`] = contentItem;
                        colsIncreased = colsIncreased + 1;
                    })
                    midcol = false;
                } else {
                    rowItem.forEach((contentItem, index) => {

                        if (colnum > cols) {
                            if (!tableItems[rowNo].hasOwnProperty(`head${colnum}`)) {
                                //  setCols(cols => cols + 1);
                                handleAddColumn(contentItem, rowNo + 1)
                                colsIncreased = colsIncreased + 1;
                                /*  if (index === (rowItem.length - 1)) {
                                      colCreated = true
                                  } */
                            } else {
                                tableItems[rowNo][`head${colnum}`] = contentItem
                            }
                            // tableItems[rowNo][`head${colnum}`] = contentItem
                        } else {
                            tableItems[rowNo][`head${colnum}`] = contentItem
                        }
                        colnum = colnum + 1;

                    })
                    midcol = false;
                }

                rowNo++;
                setRows(tableItems);
                // console.log(`${property}: ${object[property]}`);
            }
        } else {
            let items = [...rows];
            items[rowNo][`head${colNo}`] = innerText
        }
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

    const handleMouseDown = (e) => {
        let elems = document.querySelectorAll('span.highlight');
        // var elems = document.querySelectorAll(".widget.hover");

        [].forEach.call(elems, function (el) {
            el.className = el.className.replace(/\bhighlight\b/, "");
        });
        // spanEle.classList.remove("highlight")
        console.log("mousedown", e.target.id)
        let dropElementID = e.target.id;
        //  e.target.setAttribute("class", "highlight")
        let eleArr = dropElementID.split("_")
        console.log("eleArr", eleArr);
        let rowNo = eleArr[1];
        let colNo = eleArr[2];
        setSelectedRowCells([])
        setMouseDowned(true)
        const rowsSelected = [], colSelected = [];
        rowsSelected.push(rowNo);
        colSelected.push(colNo)
        setSelectedRowCells(rowsSelected)
        setSelectedColCells(colSelected)
        console.log("selected row and column", selectedRowCells, selectedColCells)

    }

    const handleMouseOver = (e) => {
        if (mouseDowned) {
            console.log("mouseover", e.target.id)
            //   e.target.setAttribute("class", "highlight")
            let dropElementID = e.target.id;
            let eleArr = dropElementID.split("_")
            console.log("eleArr", eleArr);
            let rowNo = eleArr[1];
            let colNo = eleArr[2];
            const rowsSelected = [...selectedRowCells], colSelected = [...selectedColCells];
            if (!rowsSelected.includes(rowNo)) {
                rowsSelected.push(rowNo);
            }
            if (!colSelected.includes(colNo)) {
                colSelected.push(colNo)
            }

            setSelectedRowCells(rowsSelected)
            setSelectedColCells(colSelected)
            console.log("selected row and column", selectedRowCells, selectedColCells)

        }
    }

    const handleMouseUp = (e) => {

        if (mouseDowned) {
            // e.target.setAttribute("class", "highlight")
            console.log("selected row and column", selectedRowCells, selectedColCells)
            let ele;
            selectedRowCells.forEach((rowid) => {
                selectedColCells.forEach((colid) => {
                    ele = document.getElementById(`cell_${rowid}_${colid}`)
                    ele.classList.add("highlight");
                })
            })
            setMouseDowned(false)

        }
    }

    const handleKeyDown = (evt) => {
        evt = evt || window.event // IE support
        var c = evt.keyCode
        var ctrlDown = evt.ctrlKey || evt.metaKey // Mac support
        if (ctrlDown && c == 67) {
            setKeyAction("copied")// c
            return true;
        } else if (ctrlDown && c == 86) {
            setKeyAction("pasted")
            return true;

        } else {
            setKeyAction("keyin")
            return true;

        }
        return true;

    }

    const generateTD = (idx, isAddRow) => {
        let td = [];
        for (var i = 0; i < cols; i++) {
            var valueOf = `head${i + 1}`;
            var cellKey = isAddRow ? `add_Row_${i + 1}` : `cell_${idx + 1}_${i + 1}`;
            if (isAddRow) {
                td.push(<td id={`add_row_${i + 1}`}>
                    <div id={`div_row_${i + 1}`} key={cellKey}>
                        <span id={cellKey} key={`span_${cellKey}`} contentEditable={true} className={'noSelect'} suppressContentEditableWarning={true} onInput={(e) => { handleOnChange(e) }}>{""}</span>
                    </div>
                </td>)

            } else {
                td.push(<td id={`celltd_${idx + 1}_${i + 1}`} onMouseDown={(e) => { handleMouseDown(e) }} onMouseOver={(e) => { handleMouseOver(e) }} onMouseUp={(e) => { handleMouseUp(e) }} onCopy={(e) => { handleOnCopy(e) }} >
                    <div id={`div_${idx + 1}_${i + 1}`} key={cellKey}>
                        <span id={cellKey} contentEditable={true} className={'noSelect'} suppressContentEditableWarning={true} key={`span_${cellKey}`} onKeyDown={e => { handleKeyDown(e) }} onInput={(e) => { handleOnChange(e) }}>{rows[idx][valueOf] ? rows[idx][valueOf] : ""}</span>
                    </div>
                </td>)

            }

        }
        return td;
    }

    const handleOnCopy = (e) => {
        console.log(selectedRowCells);
        console.log(selectedColCells);
        console.log(rows)
        let copiedItems = {};
        //   if (selectedColCells.length > 1 || selectedRowCells.length > 1) {
        setMultiCellCopied(true);
        e.clipboardData.clearData();

        //   } else {
        //       setMultiCellCopied(false);
        //  }
        selectedRowCells.forEach((row, index) => {
            let copiedRows = [];

            selectedColCells.forEach((col, index) => {
                copiedRows.push(rows[parseInt(row) - 1][`head${col}`])
            })
            copiedItems[row] = copiedRows;

        })
        console.log(copiedItems)
        setCopiedCells(copiedItems);

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
                                        <td id={`add_${idx + 1}_col`}>
                                            <div id={`div_${idx + 1}_col`}>
                                                <span id={`add_${idx + 1}_Col`} contentEditable={true} className={'noSelect'} suppressContentEditableWarning={true} onInput={(e) => { handleOnChange(e) }}></span>
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
                                    <td id={`add_${rows.length + 1}_col`}>
                                        <div id={`div_${rows.length + 1}_col`}>
                                            <span id={`add_${rows.length + 1}_Col`} contentEditable={true}
                                                className={'noSelect'} suppressContentEditableWarning={true} onInput={(e) => { handleOnChange(e) }}></span>
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
