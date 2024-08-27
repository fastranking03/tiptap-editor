import { useCurrentEditor } from '@tiptap/react';
import { useState } from 'react';
import { HiPlus, HiOutlineMinus } from "react-icons/hi";
import { useFontSize } from '../FontSizeContext';

function FontSizeComp() {
  const { fontSize, setFontSize } = useFontSize();
  const { editor } = useCurrentEditor();

  // Function to apply font size and update the editor
  const applyFontSize = (size) => {
    setFontSize(size);
    if (editor && editor.chain) {
      editor.chain().focus().setFontSize(`${size}px`).run();
    }
  };

  // Increase font size by 1
  const IncFontSize = () => {
    const newSize = fontSize + 1;
    applyFontSize(newSize);
  };

  // Decrease font size by 1
  const DecFontSize = () => {
    const newSize = fontSize - 1;
    if (newSize >= 8) {
      applyFontSize(newSize);
    }
  };

  // Handle dropdown selection change
  const handleDropdownChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    if (!isNaN(newSize)) {
      applyFontSize(newSize);
    }
  };

  return (
    <div className='fontsize-wrap'>
      <button className='bg-none' onClick={DecFontSize} data-tooltip-id="my-tooltip" data-tooltip-content="Decrease">
        <HiOutlineMinus />
      </button>
      <select 
        value={fontSize} 
        onChange={handleDropdownChange}
        className='font-size-dropdown'
        data-tooltip-id="my-tooltip" 
        data-tooltip-content="Font Size"
      >
        {[...Array(61).keys()].map(size => (
          size >= 8 && (
            <option key={size} value={size}>
              {size}
            </option>
          )
        ))}
      </select>
      <button className='bg-none' onClick={IncFontSize} data-tooltip-id="my-tooltip" data-tooltip-content="Increase">
        <HiPlus />
      </button>
    </div>
  );
}

export default FontSizeComp;
