import './styles.scss'
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// define your extension array
const extensions = [StarterKit];

const content = "<p>Hello World!</p>";

const Tiptap = () => {
  const editor = useEditor({
    extensions,
    content,
  });

  return (
    <>
      <div className="control-group">
        <div className="button-group">
          <button>
               Bold
         </button>
         </div>
           <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default Tiptap;
