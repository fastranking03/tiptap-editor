import { Node, mergeAttributes } from '@tiptap/core';

const CustomOrderedList = Node.create({
  name: 'orderedList',

  addOptions() {
    return {
      itemType: 'arabic', // default item type
      itemTypes: ['arabic', 'roman', 'alpha'],
      HTMLAttributes: {},
    };
  },

  group: 'block',

  content: 'listItem+',

  addAttributes() {
    return {
      itemType: {
        default: this.options.itemType,
        parseHTML: element => {
          const type = element.getAttribute('data-item-type');
          return this.options.itemTypes.includes(type) ? type : this.options.itemType;
        },
        renderHTML: attributes => {
          return {
            'data-item-type': attributes.itemType,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'ol',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['ol', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addKeyboardShortcuts() {
    return {
      'Tab': () => this.editor.commands.sinkListItem('listItem'),
      'Shift-Tab': () => this.editor.commands.liftListItem('listItem'),
    };
  },
});

// Helper function to convert itemType to CSS style
function getListStyle(type) {
  switch (type) {
    case 'roman':
      return 'lower-roman';
    case 'alpha':
      return 'lower-alpha';
    default:
      return 'decimal';
  }
}

const CustomListItem = Node.create({
  name: 'listItem',

  content: 'paragraph block*',

  defining: true,

  parseHTML() {
    return [
      {
        tag: 'li',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const parentItemType = node.attrs.parentItemType || 'arabic';
    const style = `list-style-type: ${getListStyle(parentItemType)};`;
    return ['li', mergeAttributes({ style }, HTMLAttributes), 0];
  },
});

 
export   {CustomOrderedList,  CustomListItem}
 
 
