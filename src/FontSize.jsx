import { Mark } from '@tiptap/core';

const FontSize = Mark.create({
  name: 'fontSize',

  addAttributes() {
    return {
      size: {
        default: '16px',
        parseHTML: element => element.style.fontSize,
        renderHTML: attributes => {
          return {
            style: `font-size: ${attributes.size}`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[style]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', HTMLAttributes, 0];
  },

  addCommands() {
    return {
      setFontSize:
        size =>
        ({ commands }) => {
          return commands.setMark(this.name, { size });
        },
      unsetFontSize:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },
});

export default FontSize;
