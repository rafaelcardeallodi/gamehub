import { User } from 'lucide-react'

interface AvatarProps {
  size?: number
  isRounded?: boolean
}

export function Avatar({ size = 40, isRounded = true }: AvatarProps) {
  return (
    <div
      className="flex items-center justify-center bg-blue-500"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: isRounded ? '50%' : undefined,
      }}
    >
      <User />
    </div>
  )
}
