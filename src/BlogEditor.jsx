import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdOutlineInsertPageBreak } from "react-icons/md";

import { RiListUnordered } from "react-icons/ri";
import { LuListOrdered } from "react-icons/lu";
import { AiOutlineBold } from "react-icons/ai";
import { FiItalic, FiUnderline } from "react-icons/fi";
import { IoIosUndo, IoIosRedo } from "react-icons/io";

import "./styles.scss";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import LineHeight from "./LineHeight";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import Underline from "@tiptap/extension-underline";
import CustomTableCell from "./CustomTableCell"; // Adjust the import based on your file structure
import PageBreak from "./PageBreak";
import Typography from "./components/Typography";
import TableComp from "./components/TableComp";
import Font from "./components/Font";
import HighlightComp from "./components/HighlightComp";
import AlignComp from "./components/AlignComp";
import LineSpaceComp from "./components/LineSpaceComp";
import ColorComp from "./components/ColorComp";
import FontSizeComp from "./components/FontSizeComp";
import FontSize from "./FontSize";
import ResizableImage from "./ResizableImage";
import Link from "@tiptap/extension-link";
import LinkComp from "./components/LinkComp";
import Youtube from "@tiptap/extension-youtube";
import YoutubeComp from "./components/YoutubeComp";
import ImageComp from "./components/ImageComp";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const EditorComponent = ({ outline, setOutline }) => {
  const { editor } = useCurrentEditor();

  useEffect(() => {
    if (!editor) {
      return;
    }

    const updateOutline = () => {
      const headings = [];
      editor.state.doc.descendants((node, pos) => {
        if (node.type.name === "heading") {
          headings.push({
            text: node.textContent,
            level: node.attrs.level,
            pos,
          });
        }
      });
      setOutline(headings);
    };

    editor.on("update", updateOutline);

    // Initial update
    updateOutline();

    // Cleanup
    return () => {
      editor.off("update", updateOutline);
    };
  }, [editor, setOutline]);

  if (!editor) {
    return null;
  }

  return (
    <>
   
      <div className="control-group taptap-header">
        <div className="button-group">
          <div>
            <button
              className="bg-none"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Search"
            >
              <IoSearch />
            </button>
          </div>
          <div>
            <button
              className="bg-none"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Undo"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().chain().focus().undo().run()}
            >
              <IoIosUndo />
            </button>
            <button
              className="bg-none"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Redu"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().chain().focus().redo().run()}
            >
              <IoIosRedo />
            </button>
          </div>
          <Typography />
          <Font />
          <FontSizeComp />
          <div>
            <button
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={
                editor.isActive("bold") ? "is-active bg-none" : "bg-none"
              }
            >
              <AiOutlineBold />
            </button>
          </div>
          <div>
            <button
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              className={
                editor.isActive("italic") ? "is-active bg-none" : "bg-none"
              }
            >
              <FiItalic />
            </button>
          </div>
          <div>
            <button
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Underline"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={
                editor.isActive("underline") ? "is-active bg-none" : "bg-none"
              }
            >
              {" "}
              <FiUnderline />{" "}
            </button>
          </div>
          <ColorComp />
          <HighlightComp />
          <div className="imagelinkvideo">
            <LinkComp />
            <ImageComp />
            <YoutubeComp />
          </div>
          <TableComp />
          <AlignComp />
          <LineSpaceComp />
          <div>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              data-tooltip-id="my-tooltip" data-tooltip-content="Unorder List"
              className={
                editor.isActive("bulletList") ? "is-active bg-none" : "bg-none"
              }
            >
              <RiListUnordered />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              data-tooltip-id="my-tooltip" data-tooltip-content="Order List"
              className={
                editor.isActive("orderedList") ? "is-active bg-none" : "bg-none"
              }
            >
              <LuListOrdered />
            </button>
          </div>
          <button
            className="bg-none"
            data-tooltip-id="my-tooltip" data-tooltip-content="Page Break"
            onClick={() => editor.chain().focus().insertPageBreak().run()}
          >
            <MdOutlineInsertPageBreak />
          </button>
        </div>
      </div>
    </>
  );
};

const extensions = [
  Color,
  FontSize,
  Link.configure({
    openOnClick: true,
    HTMLAttributes: {
      class: "my-custom-class",
    },
    autolink: true,
    defaultProtocol: "https",
    protocols: ["ftp", "mailto"],
  }),
  Youtube.configure({
    controls: false,
    nocookie: true,
  }),
  TextStyle.configure({ types: [ListItem.name] }),
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Highlight.configure({ multicolor: true }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  CustomTableCell,
  ResizableImage,
  Paragraph,
  Document,
  Underline,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  LineHeight,
  PageBreak,
];

const content = ` `;

const EditorWrapper = () => {
  const [outline, setOutline] = useState([]);

  return (
    <>
      <div className="parent-wrapper">
        <div className="flex1">
          <EditorProvider
            style={{ height: "800px" }}
            slotBefore={
              <EditorComponent outline={outline} setOutline={setOutline} />
            }
            extensions={extensions}
            content={content}
          ></EditorProvider>
        </div>
        <div className="flex2">
          <div className="outline">
            <h3>Outline</h3>
            {/* <p>Headings you add to the document will appear here.</p>  */}
            <ul className="outline-ul">
              {outline.map((heading, index) => (
                <li
                  key={index}
                  style={{ marginLeft: `${(heading.level - 1) * 20}px` }}
                >
                  {heading.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorWrapper;
