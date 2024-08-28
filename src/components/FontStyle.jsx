import { useEffect, useRef, useState } from "react";
import { useCurrentEditor } from '@tiptap/react';
import { TfiAngleDown } from "react-icons/tfi";

const Font = () => {
  const [toggle, setToggle] = useState(false);
  const [selectedFont, setSelectedFont] = useState('Default');
  const { editor } = useCurrentEditor();
  const containerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setToggle(false);
    }
  };

  const updateFont = (fontFamily) => {
    editor.chain().focus().setFontFamily(fontFamily).run();
    setSelectedFont(fontFamily);
  };

  const updateFontOnEditorChange = () => {
    if (editor) {
      const fontFamily = editor.getAttributes('textStyle').fontFamily;
      setSelectedFont(fontFamily || 'Default');
    }
  };

  useEffect(() => {
    if (editor) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editor]);

  useEffect(() => {
    if (editor) {
      updateFontOnEditorChange(); // Initial load
      
      editor.on('selectionUpdate', updateFontOnEditorChange);
      editor.on('transaction', updateFontOnEditorChange);

      return () => {
        editor.off('selectionUpdate', updateFontOnEditorChange);
        editor.off('transaction', updateFontOnEditorChange);
      };
    }
  }, [editor]);

  return (
    <div className='text-box position-relative' ref={containerRef}>
      <button 
        className='bg-none d-flex typograpy' 
        onClick={() => setToggle(!toggle)} 
        data-tooltip-id="my-tooltip" 
        data-tooltip-content="Font"
      >
        {selectedFont} <TfiAngleDown />
      </button>
      {toggle && (
        <div className='box-li comman-grid'>
          <button
            onClick={() => updateFont('Inter')}
            className={editor.isActive('textStyle', { fontFamily: 'Inter' }) ? 'is-active' : ''}
            data-test-id="inter"
          >
            Inter
          </button>
          <button
            onClick={() => updateFont('Comic Sans')}
            className={editor.isActive('textStyle', { fontFamily: 'Comic Sans MS, Comic Sans' }) ? 'is-active' : ''}
            data-test-id="comic-sans"
          >
            Comic Sans
          </button>
          <button
            onClick={() => updateFont('serif')}
            className={editor.isActive('textStyle', { fontFamily: 'serif' }) ? 'is-active' : ''}
            data-test-id="serif"
          >
            Serif
          </button>
          <button
            onClick={() => updateFont('monospace')}
            className={editor.isActive('textStyle', { fontFamily: 'monospace' }) ? 'is-active' : ''}
            data-test-id="monospace"
          >
            Monospace
          </button>
          <button
            onClick={() => updateFont('cursive')}
            className={editor.isActive('textStyle', { fontFamily: 'cursive' }) ? 'is-active' : ''}
            data-test-id="cursive"
          >
            Cursive
          </button>
          <button
            onClick={() => updateFont('CSS variable')}
            className={editor.isActive('textStyle', { fontFamily: 'var(--title-font-family)' }) ? 'is-active' : ''}
            data-test-id="css-variable"
          >
            CSS variable
          </button>
          <button
            onClick={() => updateFont('"Comic Sans"')}
            className={editor.isActive('textStyle', { fontFamily: '"Comic Sans"' }) ? 'is-active' : ''}
            data-test-id="comic-sans-quoted"
          >
            Comic Sans quoted
          </button>
          <button onClick={() => updateFont('unset')} data-test-id="unsetFontFamily">
            Unset font family
          </button>
        </div>
      )}
    </div>
  );
};

export default Font;
