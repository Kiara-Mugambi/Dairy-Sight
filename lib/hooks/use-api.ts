"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client"

export function useApi<T>(apiCall: () => Promise<T>, dependencies: any[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const result = await apiCall()
        if (isMounted) {
          setData(result)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "An error occurred")
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, dependencies)

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiCall()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}

// Specific hooks for common operations
export function useFarmers(status?: string) {
  return useApi(() => apiClient.getFarmers(status), [status])
}

export function useDashboardStats() {
  return useApi(() => apiClient.getDashboardStats(), [])
}

export function useMilkIntakes(params?: { farmerId?: string; startDate?: string; endDate?: string }) {
  return useApi(() => apiClient.getMilkIntakes(params), [params])
}

export function useMilkOfftakes(limit?: number) {
  return useApi(() => apiClient.getMilkOfftakes(limit), [limit])
}
