import Image from '@tiptap/extension-image';

const ResizableImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: 'auto',
        parseHTML: element => element.style.width || 'auto',
        renderHTML: attributes => {
          if (!attributes.width) {
            return {};
          }
          return { style: `width: ${attributes.width}` };
        },
      },
      rotate: {
        default: '0',
        parseHTML: element => element.style.transform?.replace(/[^0-9]/g, '') || '0',
        renderHTML: attributes => {
          if (!attributes.rotate) {
            return {};
          }
          return { style: `transform: rotate(${attributes.rotate}deg)` };
        },
      },
    };
  },
  addNodeView() {
    return ({ node, getPos }) => {
      const dom = document.createElement('div');
      dom.className = 'resizable-image';
      
      const img = document.createElement('img');
      img.src = node.attrs.src;
      img.style.width = node.attrs.width;
      img.style.transform = `rotate(${node.attrs.rotate}deg)`;

      const handleMousedown = event => {
        img.classList.add('resizing');
        const startX = event.clientX;
        const startWidth = parseInt(document.defaultView.getComputedStyle(img).width, 10);
        
        const doDrag = dragEvent => {
          img.style.width = `${startWidth + dragEvent.clientX - startX}px`;
          this.editor.commands.updateAttributes('image', { width: img.style.width });
        };
        const stopDrag = () => {
          img.classList.remove('resizing');
          document.documentElement.removeEventListener('mousemove', doDrag, false);
          document.documentElement.removeEventListener('mouseup', stopDrag, false);
        };

        document.documentElement.addEventListener('mousemove', doDrag, false);
        document.documentElement.addEventListener('mouseup', stopDrag, false);

        event.preventDefault();
      };

      img.addEventListener('mousedown', handleMousedown);

      dom.appendChild(img);
      return {
        dom,
        update: updatedNode => {
          if (updatedNode.type.name !== 'image') {
            return false;
          }
          img.src = updatedNode.attrs.src;
          img.style.width = updatedNode.attrs.width;
          img.style.transform = `rotate(${updatedNode.attrs.rotate}deg)`;
          return true;
        },
      };
    };
  },
});

export default ResizableImage;
