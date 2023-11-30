import { Editor } from '@tiptap/react'
import clsx from 'clsx'
import { ComponentProps } from 'react'

interface TiptapButtonProps extends ComponentProps<'button'> {
  editor: Editor | null
  isActive?: boolean
}

export function TiptapButton({
  editor,
  isActive,
  ...props
}: TiptapButtonProps) {
  return (
    <button
      type="button"
      onClick={() => editor?.chain().focus().toggleBold().run()}
      className={clsx(
        'flex h-7 w-7 items-center justify-center transition-colors hover:bg-zinc-700',
        {
          'bg-zinc-700': isActive,
        },
      )}
      {...props}
    />
  )
}
