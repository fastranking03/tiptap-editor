import { Node, mergeAttributes } from '@tiptap/core';

const CustomList = Node.create({
  name: 'customList',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  content: 'listItem+',

  parseHTML() {
    return [
      {
        tag: 'ul',
      },
      {
        tag: 'ol',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      this.options.order === 'ordered' ? 'ol' : 'ul',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      toggleCustomList: () => ({ commands }) => {
        return commands.toggleList(this.name, 'listItem');
      },
    };
  },
});

export default CustomList;
