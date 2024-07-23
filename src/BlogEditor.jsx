import React, { useState } from 'react';
import './styles.scss';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import TextStyle from '@tiptap/extension-text-style';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import LineHeight from './LineHeight';
import Youtube from '@tiptap/extension-youtube';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import { SketchPicker } from 'react-color';
import CustomTableCell from './CustomTableCell'; // Adjust the import based on your file structure

const MAX_CONTENT_LENGTH = 1000; // Adjust the limit as needed

const Editor = () => {
  const { editor } = useCurrentEditor();
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [isSelecting, setIsSelecting] = useState(false);
  const [maxRows, setMaxRows] = useState(10);
  const [maxCols, setMaxCols] = useState(10);
  const [selectedCells, setSelectedCells] = useState([]);
  const [cellColor, setCellColor] = useState('#FFFFFF');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [contentLength, setContentLength] = useState(0);

  if (!editor) {
    return null;
  }

  // Monitor content length
  editor.on('update', () => {
    const content = editor.getText();
    setContentLength(content.length);
  });

  // Prevent input if limit is exceeded
  editor.on('transaction', ({ transaction }) => {
    const content = editor.getText();
    if (content.length > MAX_CONTENT_LENGTH) {
      transaction.abort();
    }
  });

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
    setShowColorPicker(false)
  };
  
  const gridStyle = {
    gridTemplateColumns: `repeat(${Math.min(maxCols, 20)}, 20px)`,
    gridTemplateRows: `repeat(${Math.min(maxRows, 20)}, 20px)`,
  };

  return (
    <>
      <div className="control-group taptap-header">
        <div className="button-group">
          <div className='table-selector'>
            <button onClick={() => setIsSelecting(!isSelecting)}>Table</button>
            {isSelecting && (
              <div className='table-grid' style={gridStyle} onMouseLeave={handleMouseLeave}>
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
          <div className='cell-color-wrapper'>
            <button onClick={() => setShowColorPicker(!showColorPicker)}>Cell Color</button>
            {showColorPicker && (
              <div className="color-picker">
                <SketchPicker color={cellColor} onChangeComplete={handleColorChange} />
              </div>
            )}
          </div>
          {/* Existing table and other buttons */}
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
          <div>
            <button onClick={() => editor.chain().focus().unsetLineHeight().run()}>Clear</button>
            <button onClick={() => editor.chain().focus().setLineHeight('1').run()}>1</button>
            <button onClick={() => editor.chain().focus().setLineHeight('2').run()}>1.5</button>
            <button onClick={() => editor.chain().focus().setLineHeight('5').run()}>2</button>
          </div>
          <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>Undo</button>
          <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>Redo</button>
          <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'is-active' : ''}>Paragraph</button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()} className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}>H6</button>
          <button onClick={() => editor.chain().focus().setColor('#958DF1').run()} className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}>Purple</button>
          <button onClick={() => editor.chain().focus().setColor('#000').run()} className={editor.isActive('textStyle', { color: '#000' }) ? 'is-active' : ''}>Black</button>
          <button onClick={() => editor.chain().focus().setColor('rgb(255, 0, 0)').run()} className={editor.isActive('textStyle', { color: 'rgb(255, 0, 0)' }) ? 'is-active' : ''}>Red</button>
          <button onClick={() => editor.chain().focus().setBackgroundColor('#000').run()} className={editor.isActive('textStyle', { backgroundColor: '#000' }) ? 'is-active' : ''}>Black Bg</button>
        </div>
      </div>
      <div>
        {contentLength > MAX_CONTENT_LENGTH && (
          <div className="content-limit-warning">Content limit exceeded!</div>
        )}
      </div>
    </>
  );
};

const extensions = [
  Color,
  TextStyle.configure({ types: [ListItem.name] }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Highlight,
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  CustomTableCell,
  Youtube.configure({
    controls: false,
    nocookie: true,
  }),
  Paragraph,
  Document,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  LineHeight,
];

const content = ` `;

export default () => {
  return (
    <>
     <div>
          <div className='left-wrapper'>
             
          </div>
          <div className='main-warpper'>
             <EditorProvider slotBefore={<Editor />} extensions={extensions} content={content}></EditorProvider>
          </div>
     </div>
    </>
      
  );
};
