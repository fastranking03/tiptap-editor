import { Extension } from '@tiptap/core';

const TextIndent = Extension.create({
  name: 'textIndent',

  addOptions() {
    return {
      types: ['paragraph', 'heading'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textIndent: {
            default: 0,
            parseHTML: element => parseInt(element.style.textIndent) || 0,
            renderHTML: attributes => {
              if (!attributes.textIndent) {
                return {};
              }
              return {
                style: `text-indent: ${attributes.textIndent}px`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setIndent: indent => ({ commands }) => {
        return this.options.types.every(type => commands.updateAttributes(type, { textIndent: indent }));
      },
    };
  },
});

export default TextIndent;
