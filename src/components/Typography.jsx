import { useState,useEffect,useRef} from "react";
import { useCurrentEditor } from '@tiptap/react';
import { TfiAngleDown  } from "react-icons/tfi";
const Typography = () => {
 const [toggle, setToggle] = useState(false);
 const { editor } = useCurrentEditor();
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

  return (
    <div className='text-box position-relative' ref={containerRef}>
    <button className='bg-none d-flex typograpy' onClick={() => setToggle(!toggle)} data-tooltip-id="my-tooltip" data-tooltip-content="Typography">Normal Text <TfiAngleDown /></button>
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
  )
}

export default Typography