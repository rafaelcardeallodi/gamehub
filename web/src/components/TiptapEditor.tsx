'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import Placeholder from '@tiptap/extension-placeholder'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import Image from '@tiptap/extension-image'
import StarterKit from '@tiptap/starter-kit'

import { TiptapBar } from './TiptapBar'

interface TiptapEditorProps {
  content?: string
  onChange: (value: string) => void
}

export function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Paragraph,
      TextStyle,
      Color,
      Image,
      BulletList,
      OrderedList,
      ListItem,
      Placeholder.configure({
        placeholder: 'Comece a escrever...',
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div>
      <TiptapBar editor={editor} />

      <div className="max-h-[26rem] min-h-[10rem] overflow-y-auto overflow-x-hidden bg-zinc-900 px-4">
        <EditorContent
          editor={editor}
          className="prose prose-invert h-full max-w-none prose-headings:font-medium prose-headings:text-zinc-100 prose-h1:text-2xl prose-p:text-zinc-200"
        />
      </div>
    </div>
  )
}
