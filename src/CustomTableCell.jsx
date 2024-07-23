import { TableCell as OriginalTableCell } from '@tiptap/extension-table-cell';

const CustomTableCell = OriginalTableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor:{
        default: null,
        parseHTML: element => element.style.backgroundColor,
        renderHTML: attributes => {
          if (!attributes.backgroundColor) {
            return {};
          }
          return {
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

export default CustomTableCell