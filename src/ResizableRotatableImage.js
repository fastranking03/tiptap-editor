import { Node, mergeAttributes } from '@tiptap/core';
import Image from '@tiptap/extension-image';

const ResizableRotatableImage = Image.extend({
  name: 'resizableImage',

  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: 'auto',
        parseHTML: element => element.style.width,
        renderHTML: attributes => {
          if (!attributes.width) {
            return {};
          }
          return { style: `width: ${attributes.width}` };
        },
      },
      height: {
        default: 'auto',
        parseHTML: element => element.style.height,
        renderHTML: attributes => {
          if (!attributes.height) {
            return {};
          }
          return { style: `height: ${attributes.height}` };
        },
      },
      rotate: {
        default: '0deg',
        parseHTML: element => element.style.transform.replace('rotate(', '').replace(')', ''),
        renderHTML: attributes => {
          if (!attributes.rotate) {
            return {};
          }
          return { style: `transform: rotate(${attributes.rotate})` };
        },
      },
    };
  },

  addNodeView() {
    return ({ node, getPos, editor }) => {
      const dom = document.createElement('div');
      dom.classList.add('resizable-image');
      dom.style.position = 'relative';
      dom.style.display = 'inline-block';

      const img = document.createElement('img');
      img.src = node.attrs.src;
      img.style.width = node.attrs.width;
      img.style.height = node.attrs.height;
      img.style.transform = `rotate(${node.attrs.rotate})`;
      img.style.display = 'block'; // Ensures the image doesn't have any surrounding white space.
      img.addEventListener('click', () => {
        dom.classList.toggle('active');
      });

      dom.appendChild(img);

      const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
      corners.forEach(corner => {
        const resizeHandle = document.createElement('div');
        resizeHandle.classList.add('resize-handle', corner);
        dom.appendChild(resizeHandle);

        resizeHandle.addEventListener('mousedown', event => {
          event.preventDefault();
          const startX = event.pageX;
          const startY = event.pageY;
          const startWidth = parseInt(document.defaultView.getComputedStyle(img).width, 10);
          const startHeight = parseInt(document.defaultView.getComputedStyle(img).height, 10);

          const doDrag = e => {
            const newWidth = startWidth + (e.pageX - startX) * (corner.includes('right') ? 1 : -1);
            const newHeight = startHeight + (e.pageY - startY) * (corner.includes('bottom') ? 1 : -1);
            img.style.width = `${newWidth}px`;
            img.style.height = `${newHeight}px`;
            editor.chain().updateAttributes('resizableImage', {
              width: img.style.width,
              height: img.style.height,
            }).run();
          };

          const stopDrag = () => {
            document.documentElement.removeEventListener('mousemove', doDrag, false);
            document.documentElement.removeEventListener('mouseup', stopDrag, false);
          };

          document.documentElement.addEventListener('mousemove', doDrag, false);
          document.documentElement.addEventListener('mouseup', stopDrag, false);
        });
      });

      const rotateHandle = document.createElement('div');
      rotateHandle.classList.add('rotate-handle');
      rotateHandle.innerHTML = '↻';
      dom.appendChild(rotateHandle);

      rotateHandle.addEventListener('click', () => {
        const currentRotate = parseInt(img.style.transform.replace('rotate(', '').replace(')', ''), 10) || 0;
        const newRotate = (currentRotate + 180) % 360;
        img.style.transform = `rotate(${newRotate}deg)`;
        editor.chain().updateAttributes('resizableImage', {
          rotate: `${newRotate}deg`,
        }).run();
      });

      return {
        dom,
      };
    };
  },
});

export default ResizableRotatableImage;
