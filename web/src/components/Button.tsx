import clsx from 'clsx'
import { Loader } from 'lucide-react'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary'
  loading?: boolean
}

export function Button({
  className,
  variant = 'primary',
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        clsx(
          'flex h-8 items-center justify-center px-2.5 uppercase text-white transition-colors disabled:opacity-60',
          {
            'bg-blue-500 font-semibold enabled:hover:bg-blue-600':
              variant === 'primary',
            'bg-transparent': variant === 'secondary',
          },
        ),
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader className="animate-spin" /> : children}
    </button>
  )
}
