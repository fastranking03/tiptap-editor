import { Node } from '@tiptap/core';

const PageBreak = Node.create({
  name: 'pageBreak',

  group: 'block',

  parseHTML() {
    return [
      {
        tag: 'div.page-break',
      },
    ];
  },

  renderHTML() {
    return ['div', { class: 'page-break' }];
  },

  addCommands() {
    return {
      insertPageBreak: () => ({ commands }) => {
        return commands.insertContent('<div class="page-break"></div>');
      },
    };
  },
});

export default PageBreak;
