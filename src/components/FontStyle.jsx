import { useState } from "react";
import { useCurrentEditor } from '@tiptap/react';
import { TfiAngleDown  } from "react-icons/tfi";
const Font = () => {
 const [toggle, setToggle] = useState(false);
 const { editor } = useCurrentEditor();
  return (
    <div className='text-box position-relative'>
    <button className='bg-none d-flex typograpy' onClick={() => setToggle(!toggle)} data-tooltip-id="my-tooltip" data-tooltip-content="font">Default <TfiAngleDown /></button>
    {toggle && (
     <div className='box-li comman-grid'>
             <button
            onClick={() => editor.chain().focus().setFontFamily('Inter').run()}
            className={editor.isActive('textStyle', { fontFamily: 'Inter' }) ? 'is-active' : ''}
            data-test-id="inter"
          >
            Inter
          </button>
          <button
            onClick={() => editor.chain().focus().setFontFamily('Comic Sans MS, Comic Sans').run()}
            className={
              editor.isActive('textStyle', { fontFamily: 'Comic Sans MS, Comic Sans' })
                ? 'is-active'
                : ''
            }
            data-test-id="comic-sans"
          >
            Comic Sans
          </button>
          <button
            onClick={() => editor.chain().focus().setFontFamily('serif').run()}
            className={editor.isActive('textStyle', { fontFamily: 'serif' }) ? 'is-active' : ''}
            data-test-id="serif"
          >
            Serif
          </button>
          <button
            onClick={() => editor.chain().focus().setFontFamily('monospace').run()}
            className={editor.isActive('textStyle', { fontFamily: 'monospace' }) ? 'is-active' : ''}
            data-test-id="monospace"
          >
            Monospace
          </button>
          <button
            onClick={() => editor.chain().focus().setFontFamily('cursive').run()}
            className={editor.isActive('textStyle', { fontFamily: 'cursive' }) ? 'is-active' : ''}
            data-test-id="cursive"
          >
            Cursive
          </button>
          <button
            onClick={() => editor.chain().focus().setFontFamily('var(--title-font-family)').run()}
            className={editor.isActive('textStyle', { fontFamily: 'var(--title-font-family)' }) ? 'is-active' : ''}
            data-test-id="css-variable"
          >
            CSS variable
          </button>
          <button
            onClick={() => editor.chain().focus().setFontFamily('"Comic Sans MS", "Comic Sans"').run()}
            className={editor.isActive('textStyle', { fontFamily: '"Comic Sans"' }) ? 'is-active' : ''}
            data-test-id="comic-sans-quoted"
          >
            Comic Sans quoted
          </button>
          <button onClick={() => editor.chain().focus().unsetFontFamily().run()} data-test-id="unsetFontFamily">
            Unset font family
          </button>
     </div>
   )}
 </div>
  )
}

export default Font