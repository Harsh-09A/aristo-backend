"use client";

import { useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
// import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import {TextStyle} from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import CharacterCount from "@tiptap/extension-character-count";
import "./rich-text-editor.css";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
};

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const colorInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({
        link: { openOnClick: false },
      }),
      Placeholder.configure({
        placeholder: "Blog content likhna shuru karein...",
      }),
      // Image.configure({ inline: false, allowBase64: false }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyle, // Color mark ke liye base zaroori hai
      Color,
      Highlight.configure({ multicolor: true }),
      CharacterCount,
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: { attributes: { class: "rte-content" } },
  });

  if (!editor) return null;

  // Button click se editor ka selection na khoye
  const keepFocus = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== "SELECT" && target.tagName !== "INPUT") {
      e.preventDefault();
    }
  };

  const currentHeadingValue = editor.isActive("heading", { level: 1 })
    ? "1"
    : editor.isActive("heading", { level: 2 })
      ? "2"
      : editor.isActive("heading", { level: 3 })
        ? "3"
        : editor.isActive("heading", { level: 4 })
          ? "4"
          : editor.isActive("heading", { level: 5 })
            ? "5"
            : editor.isActive("heading", { level: 6 })
              ? "6"
              : "0";

  return (
    <div className="rte-wrapper">
      <div className="rte-toolbar" onMouseDown={keepFocus}>
        <button
          type="button"
          title="Undo"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <i className="bi bi-arrow-counterclockwise"></i>
        </button>
        <button
          type="button"
          title="Redo"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <i className="bi bi-arrow-clockwise"></i>
        </button>

        <span className="rte-divider" />

        {/* Paragraph + H1 se H6 — dropdown se, taaki toolbar bhare nahi */}
        <select
          className="rte-heading-select"
          title="Heading level"
          value={currentHeadingValue}
          onChange={(e) => {
            const level = Number(e.target.value);
            if (level === 0) {
              editor.chain().focus().setParagraph().run();
            } else {
              editor
                .chain()
                .focus()
                .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
                .run();
            }
          }}
        >
          <option value="0">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
          <option value="5">Heading 5</option>
          <option value="6">Heading 6</option>
        </select>

        <span className="rte-divider" />

        <button
          type="button"
          title="Bold"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "active" : ""}
        >
          <i className="bi bi-type-bold"></i>
        </button>
        <button
          type="button"
          title="Italic"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "active" : ""}
        >
          <i className="bi bi-type-italic"></i>
        </button>
        <button
          type="button"
          title="Underline"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "active" : ""}
        >
          <i className="bi bi-type-underline"></i>
        </button>
        <button
          type="button"
          title="Strikethrough"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "active" : ""}
        >
          <i className="bi bi-type-strikethrough"></i>
        </button>

        <span className="rte-divider" />

        {/* Text color */}
        <button
          type="button"
          title="Text color"
          onClick={() => colorInputRef.current?.click()}
        >
          <i className="bi bi-palette2"></i>
        </button>
        <input
          ref={colorInputRef}
          type="color"
          className="rte-color-input"
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
        />
        {/* Highlight */}
        <button
          type="button"
          title="Highlight"
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#fff3a3" }).run()
          }
          className={editor.isActive("highlight") ? "active" : ""}
        >
          <i className="bi bi-highlighter"></i>
        </button>

        <span className="rte-divider" />

        <button
          type="button"
          title="Align left"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "active" : ""}
        >
          <i className="bi bi-text-left"></i>
        </button>
        <button
          type="button"
          title="Align center"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={editor.isActive({ textAlign: "center" }) ? "active" : ""}
        >
          <i className="bi bi-text-center"></i>
        </button>
        <button
          type="button"
          title="Align right"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "active" : ""}
        >
          <i className="bi bi-text-right"></i>
        </button>

        <span className="rte-divider" />

        <button
          type="button"
          title="Bullet list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "active" : ""}
        >
          <i className="bi bi-list-ul"></i>
        </button>
        <button
          type="button"
          title="Numbered list"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "active" : ""}
        >
          <i className="bi bi-list-ol"></i>
        </button>
        <button
          type="button"
          title="Quote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "active" : ""}
        >
          <i className="bi bi-blockquote-left"></i>
        </button>
        <button
          type="button"
          title="Code block"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "active" : ""}
        >
          <i className="bi bi-code-slash"></i>
        </button>
        <button
          type="button"
          title="Divider line"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <i className="bi bi-dash-lg"></i>
        </button>

        <span className="rte-divider" />

        <button
          type="button"
          title="Link"
          onClick={() => {
            const previousUrl = editor.getAttributes("link").href || "";
            const url = window.prompt("Link URL daalein:", previousUrl);
            if (url === null) return;
            if (url === "") {
              editor.chain().focus().unsetLink().run();
            } else {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={editor.isActive("link") ? "active" : ""}
        >
          <i className="bi bi-link-45deg"></i>
        </button>

      </div>

      <EditorContent editor={editor} />

      {/* Word / character count footer */}
      <div className="rte-footer">
        {editor.storage.characterCount.words()} words ·{" "}
        {editor.storage.characterCount.characters()} characters
      </div>
    </div>
  );
}
