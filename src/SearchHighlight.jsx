import { Mark, mergeAttributes } from '@tiptap/core';

const SearchHighlight = Mark.create({
  name: 'highlight',
  addOptions() {
    return {
      HTMLAttributes: {
        class: 'search-highlight',
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'span[class="search-highlight"]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});

export default SearchHighlight;
