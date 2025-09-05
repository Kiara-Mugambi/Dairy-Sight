"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Users, Search, Plus, Trash2, Briefcase } from "lucide-react"

interface Employee {
  id: string
  name: string
  role: string
  phone: string
  status: "active" | "inactive"
}

export default function EmployeeDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [newEmployee, setNewEmployee] = useState({ name: "", role: "", phone: "" })

  useEffect(() => {
    loadEmployees()
  }, [])

  // Mock / fallback data
  const loadEmployees = async () => {
    try {
      const response = await fetch("/api/employees")
      if (response.ok) {
        const data = await response.json()
        setEmployees(data)
      } else {
        fallbackData()
      }
    } catch (error) {
      console.error("Error loading employees:", error)
      fallbackData()
    }
  }

  const fallbackData = () => {
    setEmployees([
      { id: "1", name: "John Doe", role: "Field Officer", phone: "0712345678", status: "active" },
      { id: "2", name: "Jane Smith", role: "Manager", phone: "0723456789", status: "active" },
      { id: "3", name: "Peter Mwangi", role: "Clerk", phone: "0734567890", status: "inactive" },
    ])
  }

  // Add new employee
  const addEmployee = () => {
    if (!newEmployee.name || !newEmployee.role || !newEmployee.phone) return
    const newEntry: Employee = {
      id: Date.now().toString(),
      name: newEmployee.name,
      role: newEmployee.role,
      phone: newEmployee.phone,
      status: "active",
    }
    setEmployees([...employees, newEntry])
    setNewEmployee({ name: "", role: "", phone: "" })
  }

  // Remove employee
  const removeEmployee = (id: string) => {
    setEmployees(employees.filter((e) => e.id !== id))
  }

  const filteredEmployees = employees.filter((e) =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const activeCount = employees.filter((e) => e.status === "active").length
  const inactiveCount = employees.filter((e) => e.status === "inactive").length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employee Operations</h1>
            <p className="text-gray-600">Manage your cooperative's workforce</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Employees</CardTitle>
              <CardDescription>All registered employees</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{employees.length}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active</CardTitle>
              <CardDescription>Currently working</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{activeCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inactive</CardTitle>
              <CardDescription>Suspended or left</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-red-600">{inactiveCount}</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Employee Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add Employee</CardTitle>
            <CardDescription>Register a new employee</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Full Name"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            />
            <Input
              placeholder="Role"
              value={newEmployee.role}
              onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
            />
            <Input
              placeholder="Phone Number"
              value={newEmployee.phone}
              onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
            />
            <Button onClick={addEmployee}>
              <Plus className="h-4 w-4 mr-2" /> Add
            </Button>
          </CardContent>
        </Card>

        {/* Search + Employee List */}
        <div className="flex items-center mb-4">
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <Card key={employee.id}>
              <CardHeader className="flex justify-between items-center">
                <div>
                  <CardTitle>{employee.name}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> {employee.role}
                  </CardDescription>
                </div>
                <Badge variant={employee.status === "active" ? "default" : "destructive"}>
                  {employee.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">📞 {employee.phone}</p>
                <div className="flex justify-end mt-4">
                  <Button variant="destructive" size="sm" onClick={() => removeEmployee(employee.id)}>
                    <Trash2 className="h-4 w-4 mr-1" /> Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
