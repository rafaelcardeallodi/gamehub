interface LogoLineProps {
  className?: string
}

export function LogoLine({ className }: LogoLineProps) {
  return (
    <svg
      width={246}
      height={384}
      viewBox="0 0 246 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g opacity={0.2} stroke="#fff" strokeWidth={2}>
        <path d="M-105.48 0.999512H245V87.119412H-105.48z" />
        <path d="M-107 149.258h278.032v88.599H-107v-88.599z" />
        <path d="M-105.48 300.602H245V386.7219H-105.48z" />
      </g>
    </svg>
  )
}
