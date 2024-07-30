import { useCurrentEditor } from '@tiptap/react';
import { useState } from 'react';
import { HiPlus, HiOutlineMinus } from "react-icons/hi";

function FontSizeComp() {
  const [fontSize, setFontSize] = useState(16);
  const { editor } = useCurrentEditor();

  // Predefined font sizes
  const fontSizes = [8, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60];
  
  // Function to apply font size and update the editor
  const applyFontSize = (size) => {
    if (fontSizes.includes(size)) {
      setFontSize(size);
      editor.chain().focus().setFontSize(`${size}px`).run();
    }
  };

  // Increase font size to the next value in fontSizes
  const IncFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex !== -1 && currentIndex < fontSizes.length - 1) {
      applyFontSize(fontSizes[currentIndex + 1]);
    }
  };

  // Decrease font size to the previous value in fontSizes
  const DecFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex !== -1 && currentIndex > 0) {
      applyFontSize(fontSizes[currentIndex - 1]);
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
        {fontSizes.map(size => (
          <option key={size} value={size}>
            {size}px
          </option>
        ))}
      </select>
      <button className='bg-none' onClick={IncFontSize} data-tooltip-id="my-tooltip" data-tooltip-content="Increase">
        <HiPlus />
      </button>
    </div>
  );
}

export default FontSizeComp;
