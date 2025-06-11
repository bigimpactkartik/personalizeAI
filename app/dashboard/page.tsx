"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Plus, BarChart3, Settings, LogOut, FileSpreadsheet } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PageTransition } from "@/components/page-transition"
import { StaggerAnimation, StaggerItem } from "@/components/stagger-animation"
import { FormTransition } from "@/components/form-transition"

export default function DashboardPage() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  const recentProjects = [
    { name: "SaaS Outreach Q1", status: "Active", prospects: 450, responses: 89 },
    { name: "E-commerce Campaign", status: "Paused", prospects: 320, responses: 67 },
    { name: "Tech Startup Leads", status: "Active", prospects: 280, responses: 52 },
    { name: "Healthcare Prospects", status: "Completed", prospects: 150, responses: 38 },
  ]

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Navigation */}
        <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-2">
                <Bot className="h-8 w-8 text-purple-400" />
                <span className="text-2xl font-bold text-white">PERSONALIZE AI</span>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" className="text-white hover:text-purple-300 transition-colors">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="text-white hover:text-purple-300 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <FormTransition delay={0.1}>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome back, John!</h1>
                <p className="text-gray-300">Here's what's happening with your campaigns today.</p>
              </div>
              <Link href="/create-project">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 hover:scale-105">
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </Link>
            </div>
          </FormTransition>

          {/* Quick Actions */}
          <StaggerAnimation className="grid md:grid-cols-2 gap-6 mb-8" staggerDelay={0.1}>
            <StaggerItem>
              <Link href="/create-project">
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 cursor-pointer hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <FileSpreadsheet className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">Create Project</h3>
                    <p className="text-gray-300 text-sm">Upload your prospect list and start a new campaign</p>
                  </CardContent>
                </Card>
              </Link>
            </StaggerItem>
            <StaggerItem>
              <Card className="bg-white/10 border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 cursor-pointer hover:scale-105">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">Display Projects</h3>
                  <p className="text-gray-300 text-sm">View and manage your existing campaigns</p>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerAnimation>

          {/* Recent Projects */}
          <FormTransition delay={0.4}>
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Recent Projects</CardTitle>
                <CardDescription className="text-gray-300">
                  Your latest email campaigns and their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StaggerAnimation className="space-y-4" staggerDelay={0.05}>
                  {recentProjects.map((project, index) => (
                    <StaggerItem key={index}>
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-200">
                        <div className="flex items-center space-x-4">
                          <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                          <div>
                            <h4 className="text-white font-medium">{project.name}</h4>
                            <p className="text-gray-400 text-sm">
                              {project.prospects} prospects • {project.responses} responses
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              project.status === "Active"
                                ? "bg-green-500/20 text-green-400"
                                : project.status === "Paused"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-gray-500/20 text-gray-400"
                            }`}
                          >
                            {project.status}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-purple-400 hover:text-purple-300 transition-colors"
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerAnimation>
              </CardContent>
            </Card>
          </FormTransition>
        </div>
      </div>
    </PageTransition>
  )
}
