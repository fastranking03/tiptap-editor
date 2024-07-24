import { useState } from "react";
import { useCurrentEditor } from '@tiptap/react';
import { SketchPicker } from 'react-color';
import { BsTable } from "react-icons/bs";
import { FaBroom  } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";

const TableComp = () => {
  const { editor } = useCurrentEditor();
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [isSelecting, setIsSelecting] = useState(false);
  const [maxRows, setMaxRows] = useState(10);
  const [maxCols, setMaxCols] = useState(10);
  const [selectedCells, setSelectedCells] = useState([]);
  const [cellColor, setCellColor] = useState('#FFFFFF');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [toggle, setToggle] = useState(false);
  const handleMouseEnter = (row, col) => {
    setRows(row);
    setCols(col);
    if (row === maxRows) setMaxRows(maxRows + 1);
    if (col === maxCols) setMaxCols(maxCols + 1);
  };

  const handleMouseLeave = () => {
    if (!isSelecting) {
      setRows(0);
      setCols(0);
      setMaxRows(10);
      setMaxCols(10);
    }
  };

  const handleMouseClick = (row, col) => {
    setIsSelecting(false);
    setSelectedCells((prev) => [...prev, { row, col }]);
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run();
  };

  const handleColorChange = (color) => {
    setCellColor(color.hex);
    selectedCells.forEach(() => {
      editor.chain().focus().setCellAttribute('backgroundColor', color.hex).run();
    });
    setShowColorPicker(false);
  };

  const gridStyle = {
    gridTemplateColumns: `repeat(${Math.min(maxCols, 20)}, 20px)`,
    gridTemplateRows: `repeat(${Math.min(maxRows, 20)}, 20px)`,
  };
  return (
     <>
       <div className='table-selector'>
            <button className='bg-none table-btn' onClick={() => setIsSelecting(!isSelecting)} data-tooltip-id="my-tooltip" data-tooltip-content="Table"><BsTable/></button>
            {isSelecting && (
              <div className='comman-grid' style={gridStyle} onMouseLeave={handleMouseLeave}>
                {Array.from({ length: Math.min(maxRows, 20) }).map((_, row) => (
                  <div key={row} className='table-grid-row'>
                    {Array.from({ length: Math.min(maxCols, 20) }).map((_, col) => (
                      <div
                        key={col}
                        className={`table-grid-cell ${row < rows && col < cols ? 'selected' : ''}`}
                        onMouseEnter={() => handleMouseEnter(row + 1, col + 1)}
                        onClick={() => handleMouseClick(row + 1, col + 1)}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='cell-color-wrapper position-relative'>
            <button className='bg-none table-btn' onClick={() => setShowColorPicker(!showColorPicker)} data-tooltip-id="my-tooltip" data-tooltip-content="Paint"><FaBroom /></button>
            {showColorPicker && (
              <div className="color-picker">
                <SketchPicker color={cellColor} onChangeComplete={handleColorChange} />
              </div>
            )}
          </div>
          <div className='text-box position-relative'>
            <button className='bg-none table-btn' onClick={() => setToggle(!toggle)} data-tooltip-id="my-tooltip" data-tooltip-content="Options"><SlOptionsVertical/></button>
            {toggle && (
              <div className='box-li comman-grid'>
                  <button onClick={() => editor.chain().focus().addColumnBefore().run()}>Add column before</button>
                  <button onClick={() => editor.chain().focus().addColumnAfter().run()}>Add column after</button>
                  <button onClick={() => editor.chain().focus().deleteColumn().run()}>Delete column</button>
                  <button onClick={() => editor.chain().focus().addRowBefore().run()}>Add row before</button>
                  <button onClick={() => editor.chain().focus().addRowAfter().run()}>Add row after</button>
                  <button onClick={() => editor.chain().focus().deleteRow().run()}>Delete row</button>
                  <button onClick={() => editor.chain().focus().deleteTable().run()}>Delete table</button>
                  <button onClick={() => editor.chain().focus().mergeCells().run()}>Merge cells</button>
                  <button onClick={() => editor.chain().focus().splitCell().run()}>Split cell</button>
                  <button onClick={() => editor.chain().focus().toggleHeaderColumn().run()}>Toggle header column</button>
                  <button onClick={() => editor.chain().focus().toggleHeaderRow().run()}>Toggle header row</button>
                  <button onClick={() => editor.chain().focus().toggleHeaderCell().run()}>Toggle header cell</button>
                  <button onClick={() => editor.chain().focus().mergeOrSplit().run()}>Merge or split</button>
                  <button onClick={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}>Set cell attribute</button>
                  <button onClick={() => editor.chain().focus().fixTables().run()}>Fix tables</button>
                  <button onClick={() => editor.chain().focus().goToNextCell().run()}>Go to next cell</button>
                  <button onClick={() => editor.chain().focus().goToPreviousCell().run()}>Go to previous cell</button>
              </div>
            )}
          </div>
     </>
  )
}

export default TableComp