'use client'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const Loader = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="space-y-4">
        <Skeleton className="h-10 w-[1000px]" />
        <Skeleton className="h-10 w-[1000px]" />
        <Skeleton className="h-10 w-[1000px]" />
        <Skeleton className="h-10 w-[1000px]" />
        <Skeleton className="h-10 w-[1000px]" />
        <Skeleton className="h-10 w-[1000px]" />
        <Skeleton className="h-10 w-[1000px]" />
      </div>
    </div>
  )
}
