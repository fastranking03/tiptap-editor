import { Node } from '@tiptap/core';
import { mergeAttributes } from '@tiptap/react';

export default Node.create({
  name: 'resizableImage',

  group: 'block',

  inline: false,

  selectable: true,

  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      width: {
        default: 'auto',
      },
      height: {
        default: 'auto',
      },
      alignment: {
        default: 'center',
        parseHTML: element => element.style.float || 'center',
      },
      rotation: {
        default: 0,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { alignment } = HTMLAttributes;
    const style = `float: ${alignment}; transform: rotate(${HTMLAttributes.rotation}deg);`;
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { style })];
  },

  addCommands() {
    return {
      setImage: options => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        });
      },
      setImageSize: (width, height) => ({ commands, tr }) => {
        const { selection } = tr;
        const node = tr.doc.nodeAt(selection.from);

        if (node.type.name === this.name) {
          const newAttrs = {
            ...node.attrs,
            width,
            height,
          };

          return commands.updateAttributes(this.name, newAttrs);
        }
        return false;
      },
      setImageAlignment: alignment => ({ commands, tr }) => {
        const { selection } = tr;
        const node = tr.doc.nodeAt(selection.from);

        if (node.type.name === this.name) {
          const newAttrs = {
            ...node.attrs,
            alignment,
          };

          return commands.updateAttributes(this.name, newAttrs);
        }
        return false;
      },
      rotateImage: () => ({ commands, tr }) => {
        const { selection } = tr;
        const node = tr.doc.nodeAt(selection.from);

        if (node.type.name === this.name) {
          const newRotation = (node.attrs.rotation + 90) % 360;
          const newAttrs = {
            ...node.attrs,
            rotation: newRotation,
          };

          return commands.updateAttributes(this.name, newAttrs);
        }
        return false;
      },
    };
  },
});
