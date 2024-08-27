import { useState, useEffect, useRef } from "react";
import { useCurrentEditor } from '@tiptap/react';
import { TfiAngleDown } from "react-icons/tfi";
import { useFontSize } from '../FontSizeContext'; // adjust the path as needed

const FONT_SIZE_MAP = {
  1: 36,
  2: 32,
  3: 24,
  4: 18,
  5: 14,
  6: 12
};

const Typography = () => {
  const [toggle, setToggle] = useState(false);
  const { editor } = useCurrentEditor();
  const { setFontSize } = useFontSize(); // Use context to set font size
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

  // const handleHeadingChange = (level) => {
  //   editor.chain().focus().toggleHeading({ level }).run();
  //   const newSize = FONT_SIZE_MAP[level] || 16;
  //   setFontSize(newSize);
  //   editor.chain().focus().setFontSize(`${newSize}px`).run();
  // };
  const handleHeadingChange = (level) => {
    
  
    const isInList = editor.isActive('bulletList') || editor.isActive('orderedList');
    
    // Toggle heading first
    editor.chain().focus().toggleHeading({ level }).run();
  
    // If the selection is in a list, reapply the list format
    if (isInList) {
      editor.chain().focus().toggleOrderedList().run();
    }
  
    const newSize = FONT_SIZE_MAP[level] || 16;
    setFontSize(newSize);
    editor.chain().focus().setFontSize(`${newSize}px`).run();
  };
  

  return (
    <div className='text-box position-relative' ref={containerRef}>
      <button className='bg-none d-flex typograpy' onClick={() => setToggle(!toggle)} data-tooltip-id="my-tooltip" data-tooltip-content="Typography">
        Normal Text <TfiAngleDown />
      </button>
      {toggle && (
        <div className='box-li comman-grid'>
          <button onClick={() => handleHeadingChange(0)} className={editor.isActive('paragraph') ? 'is-active' : ''}>
            Normal text
          </button>
          <button onClick={() => handleHeadingChange(1)} className={editor.isActive('heading', { level: 1 }) ? 'is-active H1' : 'H1'}>
            Title
          </button>
          {Array.from({ length: 5 }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handleHeadingChange(i + 1)}
              className={editor.isActive('heading', { level: i + 1 }) ? `is-active H${i + 1 + 1}` : `H${i + 1}`}
            >
              Heading {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Typography;
