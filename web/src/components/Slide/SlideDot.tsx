import clsx from 'clsx'
import { ComponentProps } from 'react'

interface SlideDotProps extends ComponentProps<'button'> {
  isActive: boolean
}

export function SlideDot(props: SlideDotProps) {
  return (
    <button
      className={clsx('h-2 w-2 ', {
        'bg-blue-500': props.isActive,
        'bg-zinc-300': !props.isActive,
      })}
      {...props}
    />
  )
}
