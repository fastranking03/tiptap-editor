import { useState } from "react";
import { useCurrentEditor } from '@tiptap/react';
import { FaAlignLeft ,FaAlignCenter  ,FaAlignJustify , FaAlignRight } from "react-icons/fa";
function AlignComp() {
   const { editor } = useCurrentEditor();
   const [hg , setHg] = useState(false);
  return (
    <div className='tip-HighlightComp position-relative'>
    <button  data-tooltip-id="my-tooltip" data-tooltip-content="Align" className='bg-none' onClick={() => setHg(!hg)}><FaAlignLeft/></button>
     {hg && (
        <div className='comman-grid hg-grid'>
           <div>
            <button data-tooltip-id="my-tooltip" data-tooltip-content="Left" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active bg-none' : 'bg-none'}><FaAlignLeft /></button>
            <button data-tooltip-id="my-tooltip" data-tooltip-content="Center" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active bg-none' : 'bg-none'}><FaAlignCenter  /></button>
            <button data-tooltip-id="my-tooltip" data-tooltip-content="Right" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active bg-none' : 'bg-none'}><FaAlignRight/></button>
            <button data-tooltip-id="my-tooltip" data-tooltip-content="Justify" onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'is-active bg-none' : 'bg-none'}><FaAlignJustify /></button>
           </div>
        </div>
     )}
  </div>
  )
}

export default AlignComp