import React, { useEffect, useState } from 'react';
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
import PageBreak from './PageBreak';

const EditorComponent = ({ outline, setOutline }) => {
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
  const [hg , setHg] = useState(false);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const updateOutline = () => {
      const headings = [];
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === 'heading') {
          headings.push({
            text: node.textContent,
            level: node.attrs.level,
            pos,
          });
        }
      });
      setOutline(headings);
    };

    editor.on('update', updateOutline);

    // Initial update
    updateOutline();

    // Cleanup
    return () => {
      editor.off('update', updateOutline);
    };
  }, [editor, setOutline]);

  if (!editor) {
    return null;
  }

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
      <div className="control-group taptap-header">
        <div className='text-box position-relative'>
          <button onClick={() => setToggle(!toggle)}>Normal Text</button>
           {toggle && (
            <div className='box-li comman-grid'>
              <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'is-active' : ''}>Normal text</button>
              <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active H1' : 'H1'}>Title</button>
              {Array.from({ length: 5 }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => editor.chain().focus().toggleHeading({ level: i + 1 + 1 }).run()}
                  className={editor.isActive('heading', { level: i + 1 + 1 }) ? `is-active H${i + 1 + 1}` : `H${i + 1 + 1}`}
                >Heading {i + 1 + 1}</button>
              ))}
            </div>
          )}
        </div>
        <div className="button-group">
          <div className='table-selector'>
            <button onClick={() => setIsSelecting(!isSelecting)}>Table</button>
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
          <div className='cell-color-wrapper'>
            <button onClick={() => setShowColorPicker(!showColorPicker)}>Cell Color</button>
            {showColorPicker && (
              <div className="color-picker">
                <SketchPicker color={cellColor} onChangeComplete={handleColorChange} />
              </div>
            )}
          </div>
          {/* Existing table and other buttons */}
          <button onClick={() => editor.chain().focus().insertPageBreak().run()}>Insert Page Break</button>

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
          <button onClick={() => editor.chain().focus().setColor('#958DF1').run()} className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}>Purple</button>
          <button onClick={() => editor.chain().focus().setColor('#000').run()} className={editor.isActive('textStyle', { color: '#000' }) ? 'is-active' : ''}>Black</button>
          <button onClick={() => editor.chain().focus().setColor('rgb(255, 0, 0)').run()} className={editor.isActive('textStyle', { color: 'rgb(255, 0, 0)' }) ? 'is-active' : ''}>Red</button>
          <div className='tip-highlight position-relative'>
            <button onClick={() => setHg(!hg)}>Highlight</button>
             {hg && (
                <div className='comman-grid hg-grid'>
                   <div>
                      <button onClick={() => editor.chain().focus().toggleHighlight({ color: 'rgb(0, 0, 0)'}).run()} className={editor.isActive('highlight', { color: 'rgb(0, 0, 0)'}) ? 'is-active cm-hg' : 'cm-hg'}  style={{backgroundColor:'rgb(0, 0, 0)'}}></button>
                      <button onClick={() => editor.chain().focus().toggleHighlight({ color: 'rgb(67, 67, 67)' }).run()} className={editor.isActive('highlight', { color: 'rgb(67, 67, 67)' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'rgb(67, 67, 67)'}}></button>
                      <button onClick={() => editor.chain().focus().toggleHighlight({ color: 'rgb(102, 102, 102)' }).run()} className={editor.isActive('highlight', { color: 'rgb(102, 102, 102)' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'rgb(102, 102, 102)'}}></button>
                      <button onClick={() => editor.chain().focus().toggleHighlight({ color: 'rgb(153, 153, 153)' }).run()} className={editor.isActive('highlight', { color: 'rgb(153, 153, 153)' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'rgb(153, 153, 153)'}}></button>
                      <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#B7B7B7' }).run()} className={editor.isActive('highlight', { color: '#B7B7B7' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#B7B7B7'}}></button>
                      <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#CCCCCC' }).run()} className={editor.isActive('highlight', { color: '#CCCCCC' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#CCCCCC'}}></button>
                      <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#D9D9D9' }).run()} className={editor.isActive('highlight', { color: '#D9D9D9' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#D9D9D9'}}></button>
                      <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#EFEFEF' }).run()} className={editor.isActive('highlight', { color: '#EFEFEF' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#EFEFEF'}}></button>
                      <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#F3F3F3' }).run()} className={editor.isActive('highlight', { color: '#F3F3F3' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#F3F3F3'}}></button>
                      <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#FFFFFF' }).run()} className={editor.isActive('highlight', { color: '#FFFFFF' }) ? 'is-active cm-hg' : ' cm-hg'}  style={{backgroundColor:'#FFFFFF'}}></button>
                     </div>
                </div>
             )}
          </div>
         </div>
      </div>
    </>
  );
};

const extensions = [
  Color,
  TextStyle.configure({ types: [ListItem.name] }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Highlight.configure({ multicolor: true }),
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
  PageBreak,
];

const content = ` `;

const EditorWrapper = () => {
  const [outline, setOutline] = useState([]);

  return (
    <>
      <div className='parent-wrapper'>
        <div className='flex1'>
          <EditorProvider style={{height:'800px'}} slotBefore={<EditorComponent outline={outline} setOutline={setOutline} />} extensions={extensions} content={content}></EditorProvider>
        </div>
        <div className='flex2'>
          <div className='outline'>
            <h3>Outline</h3>
              {/* <p>Headings you add to the document will appear here.</p>  */}
               <ul className='outline-ul'>
                {outline.map((heading, index) => (
                  <li key={index} style={{ marginLeft: `${(heading.level - 1) * 20}px` }}>
                    {heading.text}
                  </li>
                ))}
              </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorWrapper;
