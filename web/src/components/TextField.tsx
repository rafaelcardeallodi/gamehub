import { ComponentProps } from 'react'
import { useFormContext } from 'react-hook-form'

type TextFieldProps = ComponentProps<'input'> & {
  name: string
  labelText?: string
  errorMessage?: string
}

export function TextField({
  name,
  labelText,
  errorMessage,
  ...props
}: TextFieldProps) {
  const { register } = useFormContext()

  return (
    <div className="flex flex-col gap-2">
      {labelText && (
        <label htmlFor={name} className="text-white/80">
          {labelText}
        </label>
      )}

      <div className="flex flex-col">
        <input
          type="text"
          id={name}
          className="w-full bg-zinc-900 px-4 py-3 text-base text-white outline-none ring-blue-500 focus-within:ring-2"
          {...register(name)}
          {...props}
        />
        <span className="h-4 text-[12px] text-red-500">{errorMessage}</span>
      </div>
    </div>
  )
}
