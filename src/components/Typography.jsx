import { useState, useEffect, useRef } from "react";
import { useCurrentEditor } from '@tiptap/react';
import { TfiAngleDown } from "react-icons/tfi";
import { useFontSize } from '../FontSizeContext';

const FONT_SIZE_MAP = {
  1: 42,
  2: 36,
  3: 28,
  4: 20,
  5: 17,
  6: 14
};

const Typography = () => {
  const [toggle, setToggle] = useState(false);
  const [selectedFont, setSelectedFont] = useState('Normal Text');
  const { editor } = useCurrentEditor();
  const { fontSize, setFontSize } = useFontSize();
  const containerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setToggle(false);
    }
  };

  useEffect(() => {
    if (toggle) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggle]);

  useEffect(() => {
    const updateSelectedFont = () => {
      if (editor) {
        const headingLevel = editor.isActive('heading') ? editor.getAttributes('heading').level : 0;
        if (headingLevel) {
          setSelectedFont(`Heading ${headingLevel}`);
          setFontSize(FONT_SIZE_MAP[headingLevel]);
        } else {
          setSelectedFont('Normal Text');
          const currentFontSize = editor.getAttributes('textStyle').fontSize;
          console.log(currentFontSize)
          if (currentFontSize) {
            const parsedFontSize = parseInt(currentFontSize, 10);
            setFontSize(parsedFontSize);
          }
        }
      }
    };

    updateSelectedFont(); // Initial update

    editor.on('selectionUpdate', updateSelectedFont);

    return () => {
      editor.off('selectionUpdate', updateSelectedFont);
    };
  }, [editor, fontSize, setFontSize]);

  const handleHeadingChange = (level) => {
    const currentLevel = editor.isActive('heading') ? editor.getAttributes('heading').level : 0;
  
    if (level === 0) {
      editor.chain().focus().setParagraph().run();
      setSelectedFont('Normal Text');
      
      const normalFontSize = 16;
      setFontSize(normalFontSize);
      editor.chain().focus().setFontSize(`${normalFontSize}px`).run();
      
    } else {
      if (currentLevel === level) {
        return;
      }
  
      const isInList = editor.isActive('bulletList') || editor.isActive('orderedList');
      editor.chain().focus().toggleHeading({ level }).run();
  
      if (isInList) {
        editor.chain().focus().toggleOrderedList().run();
      }
  
      const newSize = FONT_SIZE_MAP[level] || fontSize;
      setFontSize(newSize);
      editor.chain().focus().setFontSize(`${newSize}px`).run();
      setSelectedFont(`Heading ${level}`);
    }
  };
  

  return (
    <div className='text-box position-relative' ref={containerRef}>
      <button className='bg-none d-flex typograpy' onClick={() => setToggle(!toggle)} data-tooltip-id="my-tooltip" data-tooltip-content="Typography">
        {selectedFont} <TfiAngleDown />
      </button>
      {toggle && (
        <div className='box-li comman-grid'>
          <button onClick={() => handleHeadingChange(0)} className={selectedFont.startsWith('Normal Text') ? 'is-active' : ''}>
            Normal text
          </button>
          {Array.from({ length: 6 }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handleHeadingChange(i + 1)}
              className={selectedFont.startsWith(`Heading ${i + 1}`) ? `is-active H${i + 1 + 1}` : `H${i + 1 + 1}`}
            >
              Heading {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Typography;
