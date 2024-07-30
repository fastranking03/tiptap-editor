import { useState } from "react";
import { useCurrentEditor } from '@tiptap/react';
import { LuAlignHorizontalSpaceAround } from "react-icons/lu";

const LineSpaceComp = () => {
 const [toggle, setToggle] = useState(false);
 const { editor } = useCurrentEditor();
  return (
    <div className='text-box position-relative'>
    <button className='bg-none' onClick={() => setToggle(!toggle)}><LuAlignHorizontalSpaceAround data-tooltip-id="my-tooltip" data-tooltip-content="Line Spacing" /></button>
    {toggle && (
     <div className='box-li comman-grid'>
         <button className="bg-none" onClick={() => editor.chain().focus().unsetLineHeight().run()}>Clear</button>
        <button className="bg-none" onClick={() => editor.chain().focus().setLineHeight('1').run()}>1</button>
        <button className="bg-none" onClick={() => editor.chain().focus().setLineHeight('2').run()}>1.5</button>
        <button className="bg-none" onClick={() => editor.chain().focus().setLineHeight('5').run()}>2</button>
        <button className="bg-none" onClick={() => editor.chain().focus().setLineHeight('8').run()}>2.5</button>
     </div>
   )}
 </div>
  )
}

export default LineSpaceComp