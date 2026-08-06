import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type ContainerProps = {
  children: ReactNode
  className?: string
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={cn('mx-auto w-full max-w-310 px-6 sm:px-10', className)}>
      {children}
    </div>
  )
}

export default Container
