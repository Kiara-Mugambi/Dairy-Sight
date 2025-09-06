// Client-side API utilities
export class ApiClient {
  private baseUrl: string

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Unknown error" }))
      throw new Error(error.error || `HTTP ${response.status}`)
    }

    return response.json()
  }

  // Farmers
  async getFarmers(status?: string) {
    const params = status ? `?status=${status}` : ""
    return this.request(`/farmers${params}`)
  }

  async getFarmer(id: string) {
    return this.request(`/farmers/${id}`)
  }

  async createFarmer(farmer: any) {
    return this.request("/farmers", {
      method: "POST",
      body: JSON.stringify(farmer),
    })
  }

  async approveFarmer(id: string) {
    return this.request(`/farmers/${id}/approve`, {
      method: "POST",
    })
  }

  async rejectFarmer(id: string) {
    return this.request(`/farmers/${id}/reject`, {
      method: "POST",
    })
  }

  // Milk Intake
  async getMilkIntakes(params?: { farmerId?: string; startDate?: string; endDate?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.farmerId) searchParams.set("farmerId", params.farmerId)
    if (params?.startDate) searchParams.set("startDate", params.startDate)
    if (params?.endDate) searchParams.set("endDate", params.endDate)

    const query = searchParams.toString()
    return this.request(`/milk-intake${query ? `?${query}` : ""}`)
  }

  async recordMilkIntake(intake: any) {
    return this.request("/milk-intake", {
      method: "POST",
      body: JSON.stringify(intake),
    })
  }

  // Milk Offtake
  async getMilkOfftakes(limit?: number) {
    const params = limit ? `?limit=${limit}` : ""
    return this.request(`/milk-offtake${params}`)
  }

  async createMilkOfftake(offtake: any) {
    return this.request("/milk-offtake", {
      method: "POST",
      body: JSON.stringify(offtake),
    })
  }

  // Dashboard
  async getDashboardStats() {
    return this.request("/dashboard/stats")
  }

  // Employees
  async getEmployees() {
    return this.request("/employees")
  }

  async createEmployee(employee: any) {
    return this.request("/employees", {
      method: "POST",
      body: JSON.stringify(employee),
    })
  }

  // Auth
  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }
}

export const apiClient = new ApiClient()
