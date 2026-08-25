"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import "./rich-text-editor.css";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
};

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false, // SSR hydration mismatch se bachne ke liye
    shouldRerenderOnTransaction: true, // v3 mein toolbar active-states dikhane ke liye zaroori
    extensions: [
      StarterKit.configure({
        link: { openOnClick: false }, // v3 StarterKit mein Link built-in hai
      }),
      Placeholder.configure({
        placeholder: "Blog content likhna shuru karein...",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: { attributes: { class: "rte-content" } },
  });

  if (!editor) return null;

  // Button click se editor ka text-selection na khoye — warna pehla
  // click "miss" hota hai kyunki button focus le leta hai selection se pehle
  const keepFocus = (e: React.MouseEvent) => e.preventDefault();

  return (
    <div className="rte-wrapper">
      <div className="rte-toolbar" onMouseDown={keepFocus}>
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

        <button
          type="button"
          title="Heading 2"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
        >
          H2
        </button>
        <button
          type="button"
          title="Heading 3"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={editor.isActive("heading", { level: 3 }) ? "active" : ""}
        >
          H3
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

        <span className="rte-divider" />

        <button
          type="button"
          title="Link"
          onClick={() => {
            const previousUrl = editor.getAttributes("link").href || "";
            const url = window.prompt("Link URL daalein:", previousUrl);
            if (url === null) return; // Cancel dabaya
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

        <span className="rte-divider" />

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
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
