import { Extension } from '@tiptap/core';

const LineHeight = Extension.create({
  name: 'lineHeight',

  addOptions() {
    return {
      types: ['textStyle'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: 'normal',
            parseHTML: element => element.style.lineHeight,
            renderHTML: attributes => {
              if (!attributes.lineHeight) {
                return {};
              }
              return { style: `line-height: ${attributes.lineHeight}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setLineHeight: (lineHeight) => ({ chain }) => {
        return chain().setMark('textStyle', { lineHeight }).run();
      },
      unsetLineHeight: () => ({ chain }) => {
        return chain().setMark('textStyle', { lineHeight: null }).run();
      },
    };
  },
});


export default LineHeight