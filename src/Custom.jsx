import './styles.scss';
import { useCallback, useState } from 'react';
import ListItem from '@tiptap/extension-list-item';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import TextStyle from '@tiptap/extension-text-style';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import ResizableImage from './ResizableImage'; // Import the ResizableImage extension
import SearchComp from "./components/SearchComp";
import { MdFormatIndentDecrease, MdFormatIndentIncrease } from "react-icons/md";

const Editor = () => {
  const { editor } = useCurrentEditor();
  const [indentLevel, setIndentLevel] = useState(0);

  const addImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = event => {
          const base64URL = event.target.result;
          editor.chain().focus().setImage({ src: base64URL }).run();
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, [editor]);

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

  const alignImage = useCallback((alignment) => {
    editor.chain().focus().setImageAlignment(alignment).run();
  }, [editor]);

  const resizeImage = useCallback((width, height) => {
    editor.chain().focus().setImageSize(width, height).run();
  }, [editor]);

  const rotateImage = useCallback(() => {
    editor.chain().focus().rotateImage().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="control-group taptap-header">
        <div className="button-group">
          <SearchComp />
          <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>Undo</button>
          <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>Redo</button>
          <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>B</button>
          <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''}>Ordered list</button>
          <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'is-active' : ''}>Highlight</button>
          <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>Left</button>
          <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>Center</button>
          <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>Right</button>
          <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>Justify</button>
          <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}>Code block</button>
          <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'is-active' : ''}>Blockquote</button>
          <button onClick={addImage}>Upload img</button>
          <button onClick={() => alignImage('left')}>Align Left</button>
          <button onClick={() => alignImage('center')}>Align Center</button>
          <button onClick={() => alignImage('right')}>Align Right</button>
          <button onClick={() => resizeImage('100%', 'auto')}>Resize Full Width</button>
          <button onClick={() => resizeImage('50%', 'auto')}>Resize Half Width</button>
          <button onClick={rotateImage}>Rotate</button>
          <button onClick={decreaseIndent}><MdFormatIndentDecrease /></button>
          <button onClick={increaseIndent}><MdFormatIndentIncrease /></button>
        </div>
      </div>
    </>
  );
};

const extensions = [
  TextStyle.configure({ types: [ListItem.name] }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Highlight,
  ResizableImage, // Use the custom ResizableImage extension
  Paragraph,
  Document,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const content = ` `;

export default () => {
  return (
    <EditorProvider slotBefore={<Editor />} extensions={extensions} content={content}></EditorProvider>
  );
};
