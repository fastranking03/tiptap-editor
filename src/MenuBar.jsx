import './styles.scss';
import { useCallback, useState } from 'react';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import TextStyle from '@tiptap/extension-text-style';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
 
import FontFamily from '@tiptap/extension-font-family'
import FontSize from './FontSize'; // Import the custom FontSize extension


const extensions = [
 
  FontFamily,
  TextStyle,
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  Highlight,
  Image,
  Paragraph,
  Document,
  FontSize, // Add the custom FontSize extension
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

const content = '';

const Editor = () => {
  const { editor } = useCurrentEditor();
  const [fontSize, setFontSize] = useState(16);

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

  const addImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64URL = event.target.result;
          editor.chain().focus().setImage({ src: base64URL }).run();
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="control-group taptap-header">
        <div className="button-group">
          <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>Undo</button>
          <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>Redo</button>
          <div>
              <button onClick={() => editor.chain().focus().setFontFamily('Inter').run()} className={editor.isActive('textStyle', { fontFamily: 'Inter' }) ? 'is-active' : ''} data-test-id="inter" >Inter</button>
              <button onClick={() => editor.chain().focus().setFontFamily('Comic Sans MS, Comic Sans').run()} className={ editor.isActive('textStyle', { fontFamily: 'Comic Sans MS, Comic Sans' }) ? 'is-active' : '' } data-test-id="comic-sans" > Comic Sans </button>
              <button onClick={() => editor.chain().focus().setFontFamily('serif').run()} className={editor.isActive('textStyle', { fontFamily: 'serif' }) ? 'is-active' : ''} data-test-id="serif" >Serif</button>
              <button onClick={() => editor.chain().focus().setFontFamily('monospace').run()} className={editor.isActive('textStyle', { fontFamily: 'monospace' }) ? 'is-active' : ''} data-test-id="monospace" >Monospace</button>
              <button onClick={() => editor.chain().focus().setFontFamily('cursive').run()} className={editor.isActive('textStyle', { fontFamily: 'cursive' }) ? 'is-active' : ''} data-test-id="cursive">Cursive</button>
              <button onClick={() => editor.chain().focus().setFontFamily('var(--title-font-family)').run()} className={editor.isActive('textStyle', { fontFamily: 'var(--title-font-family)' }) ? 'is-active' : ''} data-test-id="css-variable"> CSS variable</button>
              <button onClick={() => editor.chain().focus().setFontFamily('"Comic Sans MS", "Comic Sans"').run()} className={editor.isActive('textStyle', { fontFamily: '"Comic Sans"' }) ? 'is-active' : ''} data-test-id="comic-sans-quoted">Comic Sans quoted</button>
              <button onClick={() => editor.chain().focus().unsetFontFamily().run()} data-test-id="unsetFontFamily"> Unset font family </button>
           </div>
          <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>B</button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>Italic</button>
          <button onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''}>Strike</button>
          <button onClick={() => editor.chain().focus().toggleCode().run()} disabled={!editor.can().chain().focus().toggleCode().run()} className={editor.isActive('code') ? 'is-active' : ''}>Code</button>
          <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>Clear marks</button>
          <button onClick={() => editor.chain().focus().clearNodes().run()}>Clear nodes</button>
          <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'is-active' : ''}>Paragraph</button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}>H1</button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>H2</button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>H3</button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()} className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}>H4</button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()} className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}>H5</button>
          <button onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()} className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}>H6</button>
          <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'is-active' : ''}>Bullet list</button>
          <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'is-active' : ''}>Ordered list</button>
          <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'is-active' : ''}>Highlight</button>
          <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>Left</button>
          <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>Center</button>
          <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>Right</button>
          <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>Justify</button>
          <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? 'is-active' : ''}>Code block</button>
          <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={editor.isActive('blockquote') ? 'is-active' : ''}>Blockquote</button>
          <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>Horizontal rule</button>
          <button onClick={() => editor.chain().focus().setHardBreak().run()}>Hard break</button>
          <button onClick={() => editor.chain().focus().setColor('#958DF1').run()} className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}>Purple</button>
          <button onClick={() => editor.chain().focus().setColor('#000').run()} className={editor.isActive('textStyle', { color: '#000' }) ? 'is-active' : ''}>Black</button>
          <button onClick={() => editor.chain().focus().setColor('rgb(255, 0, 0)').run()} className={editor.isActive('textStyle', { backgroundColor: 'rgb(255, 0, 0)' }) ? 'is-active' : ''}>Red</button>
          <button>Bg</button>
          <button onClick={addImage}>Upload img</button>
          <button onClick={IncFontSize}>Inc Font</button>
          <button>{fontSize}</button>
          <button onClick={DecFontSize}>Dec Font</button>
         </div>
      </div>
    </>
  );
};

export default () => {
  return (
    <EditorProvider slotBefore={<Editor />} extensions={extensions} content={content}></EditorProvider>
  );
};
