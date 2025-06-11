"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bot, Mail, Lock, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageTransition } from "@/components/page-transition"
import { FormTransition } from "@/components/form-transition"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      // Simple validation for demo
      if (formData.email && formData.password) {
        router.push("/dashboard")
      } else {
        setError("Please enter both email and password")
      }
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <FormTransition delay={0.1}>
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center space-x-2">
                <Bot className="h-8 w-8 text-purple-400" />
                <span className="text-2xl font-bold text-white">PERSONALIZE AI</span>
              </Link>
            </div>
          </FormTransition>

          <FormTransition delay={0.2}>
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
                <CardDescription className="text-gray-300">Sign in to your account to continue</CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <FormTransition delay={0.3}>
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  </FormTransition>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <FormTransition delay={0.3}>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 transition-all duration-200 focus:bg-white/10"
                          required
                        />
                      </div>
                    </div>
                  </FormTransition>
                  <FormTransition delay={0.4}>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white">
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleChange}
                          className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-gray-400 transition-all duration-200 focus:bg-white/10"
                          required
                        />
                      </div>
                    </div>
                  </FormTransition>
                  <FormTransition delay={0.5}>
                    <div className="flex items-center justify-between">
                      <Link
                        href="/forgot-password"
                        className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </FormTransition>
                  <FormTransition delay={0.6}>
                    <Button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 hover:scale-105"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </FormTransition>
                </form>
                <FormTransition delay={0.7}>
                  <div className="mt-6 text-center">
                    <p className="text-gray-300">
                      Don't have an account?{" "}
                      <Link
                        href="/register"
                        className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                      >
                        Sign up
                      </Link>
                    </p>
                  </div>
                </FormTransition>
              </CardContent>
            </Card>
          </FormTransition>
        </div>
      </div>
    </PageTransition>
  )
}
