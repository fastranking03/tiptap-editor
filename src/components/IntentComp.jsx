import { useCallback, useState } from "react";
import {useCurrentEditor } from '@tiptap/react';
import { MdFormatIndentDecrease, MdFormatIndentIncrease } from "react-icons/md";

function IntentComp(){
    const {editor} = useCurrentEditor();
    const [indentLevel, setIndentLevel] = useState(0);

  const increaseIndent = useCallback(() => {
    setIndentLevel(prev => {
      const newLevel = prev < 7 ? prev + 1 : prev - 1;
      editor.chain().focus().setIndent(newLevel * 30).run();
      return newLevel;
    });
  }, [editor]);

  const decreaseIndent = useCallback(() => {
    setIndentLevel(prev => {
      const newLevel = prev > 0 ? prev - 1 : 0;
      editor.chain().focus().setIndent(newLevel * 30).run();
      return newLevel;
    });
  }, [editor]);

  return(
    <div>
        <button onClick={decreaseIndent}  className={editor.isActive('textIndent') ? 'is-active bg-none' : ' bg-none'}><MdFormatIndentDecrease /></button>
        <button onClick={increaseIndent} className={editor.isActive('textIndent') ? 'is-active bg-none' : ' bg-none'}><MdFormatIndentIncrease /></button>
    </div>
  )
}

export default IntentComp;