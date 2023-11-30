interface PaginationItemProps {
  number: number
  isCurrent?: boolean
  onPageChange: (page: number) => void
}

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <button className="w-6 bg-blue-500" disabled>
        {number}
      </button>
    )
  }

  return (
    <button className="w-6 bg-zinc-800" onClick={() => onPageChange(number)}>
      {number}
    </button>
  )
}
