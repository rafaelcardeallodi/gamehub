'use client'

import { ReactNode } from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface AccordionProps {
  title: string
  value: string
  children: ReactNode
  className?: string
}

export function Accordion({
  title,
  value,
  children,
  className,
}: AccordionProps) {
  return (
    <AccordionPrimitive.Root type="single" defaultValue={value}>
      <AccordionPrimitive.Item value={value}>
        <AccordionPrimitive.Trigger className="flex h-10 w-full items-center justify-between bg-gradient-to-r from-blue-500 to-blue-400 px-4">
          <span className="text-[0.9375rem] font-medium uppercase">
            {title}
          </span>

          <ChevronDown />
        </AccordionPrimitive.Trigger>

        <AccordionPrimitive.Content className={twMerge('mt-4', className)}>
          {children}
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    </AccordionPrimitive.Root>
  )
}
