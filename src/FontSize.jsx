import { Extension } from '@tiptap/core';

const FontSize = Extension.create({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['textStyle', 'paragraph', 'heading', 'listItem'],
      defaultSize: '16px',
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: this.options.defaultSize,
            parseHTML: (element) => element.style.fontSize.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize: (size) => ({ chain }) => {
        return chain().setMark('textStyle', { fontSize: size }).run();
      },
      setNodeFontSize: (size) => ({ chain }) => {
        return chain().setNode('paragraph', { fontSize: size }).run();
      },
    };
  },
});


export default FontSize;
