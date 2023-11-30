import { Editor } from '@tiptap/react'

import { TiptapButton } from './TiptapButton'

import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Image,
  Italic,
  List,
  ListOrdered,
  Pilcrow,
  Strikethrough,
} from 'lucide-react'
import { useCallback } from 'react'

interface TiptapBarProps {
  editor: Editor
}

export function TiptapBar({ editor }: TiptapBarProps) {
  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  return (
    <div className="flex items-center gap-2 bg-zinc-850 p-1.5">
      <TiptapButton
        editor={editor}
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')}
      >
        <Bold size={20} />
      </TiptapButton>

      <TiptapButton
        editor={editor}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
      >
        <Italic size={20} />
      </TiptapButton>

      <TiptapButton
        editor={editor}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive('strike')}
      >
        <Strikethrough size={20} />
      </TiptapButton>

      <input
        type="color"
        onChange={(event) =>
          editor.chain().focus().setColor(event.target.value).run()
        }
        value={editor.getAttributes('textStyle').color}
        data-testid="setColor"
        className="h-7 w-7 cursor-pointer bg-transparent"
      />

      <div className="ml-2 mr-3 h-5 w-px bg-white/25" />

      <TiptapButton
        editor={editor}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
      >
        <Heading1 size={20} />
      </TiptapButton>

      <TiptapButton
        editor={editor}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
      >
        <Heading2 size={20} />
      </TiptapButton>

      <TiptapButton
        editor={editor}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
      >
        <Heading3 size={20} />
      </TiptapButton>

      <TiptapButton
        editor={editor}
        onClick={() => editor.chain().focus().setParagraph().run()}
        isActive={editor.isActive('paragraph')}
      >
        <Pilcrow size={20} />
      </TiptapButton>
      <TiptapButton
        editor={editor}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
      >
        <List size={20} />
      </TiptapButton>
      <TiptapButton
        editor={editor}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
      >
        <ListOrdered size={20} />
      </TiptapButton>
      <TiptapButton editor={editor} onClick={addImage}>
        <Image size={20} />
      </TiptapButton>
    </div>
  )
}
