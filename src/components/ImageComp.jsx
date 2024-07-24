import { FaRegImages } from "react-icons/fa6";
import { useCallback } from "react";
import { useCurrentEditor } from '@tiptap/react';

function ImageComp() {
  const { editor } = useCurrentEditor();

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

  return (
    <button className='bg-none' onClick={addImage} data-tooltip-id="my-tooltip" data-tooltip-content="Image">
      <FaRegImages />
    </button>
  );
}

export default ImageComp;
