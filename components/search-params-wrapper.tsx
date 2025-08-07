"use client"

import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface SearchParamsWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function SearchParamsWrapper({ children, fallback }: SearchParamsWrapperProps) {
  const defaultFallback = (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <Skeleton className="h-4 w-32 mx-auto" />
      </div>
    </div>
  )

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  )
}
