import { useState, useEffect, useCallback } from 'react';
import { IoSearch, IoClose } from 'react-icons/io5';
import { useCurrentEditor } from '@tiptap/react';
import SearchHighlight from '../SearchHighlight';

function SearchComp() {
  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const {editor} = useCurrentEditor({
    extensions: [SearchHighlight],
  });

  const clearHighlights = useCallback(() => {
    if (editor) {
      const { doc } = editor.state;
      doc.descendants((node, pos) => {
        if (node.isText) {
          editor.chain().setTextSelection({ from: pos, to: pos + node.nodeSize }).unsetMark('highlight').run();
        }
      });
    }
  }, [editor]);

  const applyHighlights = useCallback(() => {
    if (!editor || !searchTerm) return;

    const { state } = editor;
    const { doc } = state;

    const matches = [];
    doc.descendants((node, pos) => {
      if (node.isText) {
        const text = node.text;
        const regex = new RegExp(searchTerm, 'gi');
        let match;

        while ((match = regex.exec(text)) !== null) {
          matches.push({
            from: pos + match.index,
            to: pos + match.index + searchTerm.length,
          });
        }
      }
    });

    // Clear previous highlights
    clearHighlights();

    // Apply new highlights
    matches.forEach(({ from, to }) => {
      editor.chain().setTextSelection({ from, to }).setMark('highlight').run();
    });

    // Reset selection
    editor.chain().setTextSelection(0).run();
  }, [editor, searchTerm, clearHighlights]);

  useEffect(() => {
    if (searchTerm) {
      applyHighlights();
    } else {
      clearHighlights();
    }
  }, [searchTerm, applyHighlights, clearHighlights]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    clearHighlights();
    setToggle(false);
  };

  return (
    <div className="position-relative">
      <button
        className="bg-none"
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Search"
        onClick={() => setToggle(!toggle)}
      >
        <IoSearch />
      </button>
      {toggle && (
        <div className="comman-grid hg-grid">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search..."
            autoFocus // Ensure the input is focused when opened
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="clear-button"
              aria-label="Clear search"
            >
              <IoClose />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchComp;
