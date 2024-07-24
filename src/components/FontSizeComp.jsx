
import { useCurrentEditor } from '@tiptap/react';
import { useState } from 'react';
import { HiPlus ,HiOutlineMinus } from "react-icons/hi";


function FontSizeComp() {
    const [fontSize, setFontSize] = useState(16);
    const { editor } = useCurrentEditor();
    const IncFontSize = () => {
        if (fontSize < 60) {
          const newSize = fontSize + 1;
          setFontSize(newSize);
          editor.chain().focus().setFontSize(`${newSize}px`).run();
        }
      };
    
      const DecFontSize = () => {
        if (fontSize > 0) {
          const newSize = fontSize - 1;
          setFontSize(newSize);
          editor.chain().focus().setFontSize(`${newSize}px`).run();
        }
      };
  return (
        <div className='fontsize-wrap'>
           <button className='bg-none' onClick={DecFontSize} data-tooltip-id="my-tooltip" data-tooltip-content="Decease"><HiOutlineMinus  /></button>
             <input type="number" className='number-input' value={fontSize} data-tooltip-id="my-tooltip" data-tooltip-content="Font Size"/>
           <button className='bg-none' onClick={IncFontSize} data-tooltip-id="my-tooltip" data-tooltip-content="Increase"><HiPlus/></button>
        </div>
  )
}

export default FontSizeComp