"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Bot,
  Upload,
  FileSpreadsheet,
  ArrowLeft,
  Target,
  Settings,
  CreditCard,
  Key,
  Globe,
  Sliders,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageTransition } from "@/components/page-transition"
import { FormTransition } from "@/components/form-transition"
import { CollapsibleSection } from "@/components/collapsible-section"

interface BasicSettings {
  mailboxes: number
  emails_per_mailbox: number
  batch_duration_days: number
  emails_per_contact: number
  process_only_valid_emails: boolean
}

interface AdvancedSetting {
  size: string
  no_of_contacts: number
  primary_target_roles: string[]
  secondary_target_roles: string[]
}

interface APISettings {
  openai_api: string
  gemini_api: string
  claude_api: string
  selected_model: string
}

export default function CreateProjectPage() {
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    targetAudience: "",
  })
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [googleSheetUrl, setGoogleSheetUrl] = useState("")
  const [dataSource, setDataSource] = useState<"file" | "google-sheet">("file")
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const router = useRouter()

  // Basic Settings with defaults
  const [basicSettings, setBasicSettings] = useState<BasicSettings>({
    mailboxes: 5,
    emails_per_mailbox: 30,
    batch_duration_days: 10,
    emails_per_contact: 3,
    process_only_valid_emails: true,
  })

  // Advanced Settings with defaults
  const [advancedSettings, setAdvancedSettings] = useState<AdvancedSetting[]>([
    {
      size: "1-10",
      no_of_contacts: 2,
      primary_target_roles: ["CEO", "Founder"],
      secondary_target_roles: ["Owner", "Director"],
    },
    {
      size: "11-20",
      no_of_contacts: 3,
      primary_target_roles: ["CEO", "Founder", "Co-Founder"],
      secondary_target_roles: ["Director", "Head of"],
    },
    {
      size: "1-50",
      no_of_contacts: 4,
      primary_target_roles: ["CEO", "Founder", "Co-Founder", "Owner"],
      secondary_target_roles: ["Director", "Head of", "VP"],
    },
    {
      size: "50-100",
      no_of_contacts: 6,
      primary_target_roles: ["CEO", "Founder", "Co-Founder", "VP"],
      secondary_target_roles: ["Director", "Head of", "Senior Manager"],
    },
    {
      size: "100-200",
      no_of_contacts: 8,
      primary_target_roles: ["Director", "VP", "Head of"],
      secondary_target_roles: ["Senior Manager", "Manager"],
    },
    {
      size: "200-500",
      no_of_contacts: 10,
      primary_target_roles: ["Director", "Head of", "Senior Director"],
      secondary_target_roles: ["VP", "Senior Manager"],
    },
    {
      size: "500-1000",
      no_of_contacts: 13,
      primary_target_roles: ["Senior Manager", "Director", "Head of"],
      secondary_target_roles: ["Manager", "Senior Director"],
    },
  ])

  // API Settings
  const [apiSettings, setApiSettings] = useState<APISettings>({
    openai_api: "",
    gemini_api: "",
    claude_api: "",
    selected_model: "openai-gpt4",
  })

  const [paymentPlan, setPaymentPlan] = useState("starter")

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate project creation with all settings
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProjectData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const updateBasicSetting = (key: keyof BasicSettings, value: any) => {
    setBasicSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const updateAdvancedSetting = (index: number, field: keyof AdvancedSetting, value: any) => {
    setAdvancedSettings((prev) => prev.map((setting, i) => (i === index ? { ...setting, [field]: value } : setting)))
  }

  const updateAPISettings = (key: keyof APISettings, value: string) => {
    setApiSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const calculateEmailCapacity = () => {
    const capacity = basicSettings.mailboxes * basicSettings.emails_per_mailbox
    alert(`Total Email Capacity: ${capacity} emails`)
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Navigation */}
        <nav className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-white hover:text-purple-300">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboard
                  </Button>
                </Link>
                <div className="flex items-center space-x-2">
                  <Bot className="h-8 w-8 text-purple-400" />
                  <span className="text-2xl font-bold text-white">PERSONALIZE AI</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create New Project</h1>
            <p className="text-gray-300">Set up your AI-powered cold email campaign</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              <div className={`flex items-center space-x-2 ${step >= 1 ? "text-purple-400" : "text-gray-500"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${step >= 1 ? "bg-purple-600" : "bg-gray-600"}`}
                >
                  1
                </div>
                <span className="text-sm">Details</span>
              </div>
              <div className="w-4 h-px bg-gray-600"></div>
              <div className={`flex items-center space-x-2 ${step >= 2 ? "text-purple-400" : "text-gray-500"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${step >= 2 ? "bg-purple-600" : "bg-gray-600"}`}
                >
                  2
                </div>
                <span className="text-sm">Upload</span>
              </div>
              <div className="w-4 h-px bg-gray-600"></div>
              <div className={`flex items-center space-x-2 ${step >= 3 ? "text-purple-400" : "text-gray-500"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${step >= 3 ? "bg-purple-600" : "bg-gray-600"}`}
                >
                  3
                </div>
                <span className="text-sm">Settings</span>
              </div>
              <div className="w-4 h-px bg-gray-600"></div>
              <div className={`flex items-center space-x-2 ${step >= 4 ? "text-purple-400" : "text-gray-500"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${step >= 4 ? "bg-purple-600" : "bg-gray-600"}`}
                >
                  4
                </div>
                <span className="text-sm">Payment</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <FormTransition>
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Target className="h-5 w-5 mr-2" />
                      Project Details
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Basic information about your email campaign
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">
                        Project Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="e.g., SaaS Outreach Q1 2024"
                        value={projectData.name}
                        onChange={handleChange}
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 transition-all duration-200 focus:bg-white/10"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-white">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe your campaign goals and target audience..."
                        value={projectData.description}
                        onChange={handleChange}
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 min-h-[100px] transition-all duration-200 focus:bg-white/10"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="targetAudience" className="text-white">
                        Target Audience
                      </Label>
                      <Input
                        id="targetAudience"
                        name="targetAudience"
                        type="text"
                        placeholder="e.g., SaaS founders, Marketing directors, etc."
                        value={projectData.targetAudience}
                        onChange={handleChange}
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 transition-all duration-200 focus:bg-white/10"
                        required
                      />
                    </div>
                    <Button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 hover:scale-105"
                    >
                      Next: Upload Data
                    </Button>
                  </CardContent>
                </Card>
              </FormTransition>
            )}

            {step === 2 && (
              <FormTransition>
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <FileSpreadsheet className="h-5 w-5 mr-2" />
                      Upload Prospect Data
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Upload your data via CSV/Excel file or Google Sheets
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Data Source Selection */}
                    <div className="space-y-4">
                      <Label className="text-white">Choose Data Source</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          type="button"
                          variant={dataSource === "file" ? "default" : "outline"}
                          onClick={() => setDataSource("file")}
                          className={`p-4 h-auto ${
                            dataSource === "file"
                              ? "bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 hover:scale-105"
                              : "border-white/20 text-white hover:bg-white/10 transition-all duration-200 hover:scale-105"
                          }`}
                        >
                          <div className="text-center">
                            <Upload className="h-8 w-8 mx-auto mb-2" />
                            <div className="font-medium">Upload File</div>
                            <div className="text-xs opacity-70">CSV, XLSX files</div>
                          </div>
                        </Button>
                        <Button
                          type="button"
                          variant={dataSource === "google-sheet" ? "default" : "outline"}
                          onClick={() => setDataSource("google-sheet")}
                          className={`p-4 h-auto ${
                            dataSource === "google-sheet"
                              ? "bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 hover:scale-105"
                              : "border-white/20 text-white hover:bg-white/10 transition-all duration-200 hover:scale-105"
                          }`}
                        >
                          <div className="text-center">
                            <Globe className="h-8 w-8 mx-auto mb-2" />
                            <div className="font-medium">Google Sheets</div>
                            <div className="text-xs opacity-70">Share link</div>
                          </div>
                        </Button>
                      </div>
                    </div>

                    {dataSource === "file" && (
                      <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                        <input
                          type="file"
                          id="file-upload"
                          accept=".csv,.xlsx,.xls"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                          <p className="text-white font-medium mb-2">
                            {uploadedFile ? uploadedFile.name : "Click to upload or drag and drop"}
                          </p>
                          <p className="text-gray-400 text-sm">CSV, XLSX files up to 10MB</p>
                        </label>
                      </div>
                    )}

                    {dataSource === "google-sheet" && (
                      <div className="space-y-2">
                        <Label htmlFor="googleSheet" className="text-white">
                          Google Sheets URL
                        </Label>
                        <Input
                          id="googleSheet"
                          type="url"
                          placeholder="https://docs.google.com/spreadsheets/d/..."
                          value={googleSheetUrl}
                          onChange={(e) => setGoogleSheetUrl(e.target.value)}
                          className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 transition-all duration-200 focus:bg-white/10"
                        />
                        <p className="text-gray-400 text-xs">
                          Make sure the sheet is shared with view access for anyone with the link
                        </p>
                      </div>
                    )}

                    {(uploadedFile || googleSheetUrl) && (
                      <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                        <p className="text-green-400 font-medium">Data source configured successfully!</p>
                        <p className="text-green-300 text-sm">
                          {uploadedFile
                            ? `${uploadedFile.name} (${(uploadedFile.size / 1024).toFixed(1)} KB)`
                            : "Google Sheets URL provided"}
                        </p>
                      </div>
                    )}

                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                      <h4 className="text-blue-400 font-medium mb-2">Required Columns:</h4>
                      <ul className="text-blue-300 text-sm space-y-1">
                        <li>• Email (required)</li>
                        <li>• First Name (recommended)</li>
                        <li>• Last Name (recommended)</li>
                        <li>• Company (recommended)</li>
                        <li>• Company Size (recommended)</li>
                        <li>• Company Website (recommended)</li>
                        <li>• LinkedIn Profile of Company (recommended)</li>
                        <li>• Job Title (optional)</li>
                      </ul>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1 border-white/20 text-white hover:bg-white/10 transition-all duration-200 hover:scale-105"
                      >
                        Previous
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setStep(3)}
                        disabled={!uploadedFile && !googleSheetUrl}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 hover:scale-105"
                      >
                        Next: Project Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </FormTransition>
            )}

            {step === 3 && (
              <FormTransition>
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Project Settings
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Configure your campaign parameters and AI settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Email Capacity Section (renamed from Basic Settings) */}
                    <CollapsibleSection
                      title="Email Capacity"
                      icon={<Sliders className="h-4 w-4 text-purple-400" />}
                      defaultOpen={false}
                    >
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label className="text-white">Mailboxes</Label>
                            <Input
                              type="number"
                              value={basicSettings.mailboxes}
                              onChange={(e) => updateBasicSetting("mailboxes", Number(e.target.value))}
                              className="bg-white/5 border-white/20 text-white transition-all duration-200 focus:bg-white/10"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Emails per Mailbox</Label>
                            <Input
                              type="number"
                              value={basicSettings.emails_per_mailbox}
                              onChange={(e) => updateBasicSetting("emails_per_mailbox", Number(e.target.value))}
                              className="bg-white/5 border-white/20 text-white transition-all duration-200 focus:bg-white/10"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Batch Duration (Days)</Label>
                            <Input
                              type="number"
                              value={basicSettings.batch_duration_days}
                              onChange={(e) => updateBasicSetting("batch_duration_days", Number(e.target.value))}
                              className="bg-white/5 border-white/20 text-white transition-all duration-200 focus:bg-white/10"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white">Emails per Contact</Label>
                            <Input
                              type="number"
                              value={basicSettings.emails_per_contact}
                              onChange={(e) => updateBasicSetting("emails_per_contact", Number(e.target.value))}
                              className="bg-white/5 border-white/20 text-white transition-all duration-200 focus:bg-white/10"
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 mt-2">
                          <input
                            type="checkbox"
                            id="process_only_valid_emails"
                            checked={basicSettings.process_only_valid_emails}
                            onChange={(e) => updateBasicSetting("process_only_valid_emails", e.target.checked)}
                            className="rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-600"
                          />
                          <Label htmlFor="process_only_valid_emails" className="text-white">
                            Process only valid emails
                          </Label>
                        </div>

                        <Button
                          type="button"
                          onClick={calculateEmailCapacity}
                          className="mt-2 bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 hover:scale-105"
                        >
                          Calculate Email Capacity
                        </Button>
                      </div>
                    </CollapsibleSection>

                    {/* AI Models Tab */}
                    <div className="space-y-4">
                      <h3 className="text-white font-medium flex items-center">
                        <Key className="h-4 w-4 mr-2 text-purple-400" />
                        AI Models
                      </h3>
                      <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-4">
                        <div className="space-y-2">
                          <Label className="text-white">Select AI Model</Label>
                          <Select
                            value={apiSettings.selected_model}
                            onValueChange={(value) => updateAPISettings("selected_model", value)}
                          >
                            <SelectTrigger className="bg-white/5 border-white/20 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="openai-gpt4">OpenAI GPT-4</SelectItem>
                              <SelectItem value="openai-gpt4o">OpenAI GPT-4o</SelectItem>
                              <SelectItem value="openai-gpt35">OpenAI GPT-3.5 Turbo</SelectItem>
                              <SelectItem value="gemini-pro">Google Gemini Pro</SelectItem>
                              <SelectItem value="gemini-ultra">Google Gemini Ultra</SelectItem>
                              <SelectItem value="claude-3-opus">Anthropic Claude 3 Opus</SelectItem>
                              <SelectItem value="claude-3-sonnet">Anthropic Claude 3 Sonnet</SelectItem>
                              <SelectItem value="claude-3-haiku">Anthropic Claude 3 Haiku</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <Label className="text-white flex items-center">
                              <Key className="h-4 w-4 mr-2" />
                              OpenAI API Key
                            </Label>
                            <Input
                              type="password"
                              placeholder="sk-..."
                              value={apiSettings.openai_api}
                              onChange={(e) => updateAPISettings("openai_api", e.target.value)}
                              className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 transition-all duration-200 focus:bg-white/10"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white flex items-center">
                              <Key className="h-4 w-4 mr-2" />
                              Gemini API Key
                            </Label>
                            <Input
                              type="password"
                              placeholder="AI..."
                              value={apiSettings.gemini_api}
                              onChange={(e) => updateAPISettings("gemini_api", e.target.value)}
                              className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 transition-all duration-200 focus:bg-white/10"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white flex items-center">
                              <Key className="h-4 w-4 mr-2" />
                              Claude API Key
                            </Label>
                            <Input
                              type="password"
                              placeholder="sk-ant-..."
                              value={apiSettings.claude_api}
                              onChange={(e) => updateAPISettings("claude_api", e.target.value)}
                              className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 transition-all duration-200 focus:bg-white/10"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label className="text-white flex items-center">
                              <Key className="h-4 w-4 mr-2" />
                              ssm API KEY 
                            </Label>
                            <Input
                              type="password"
                              placeholder="sk-ant-..."
                              value={apiSettings.SSM_api}
                              onChange={(e) => updateAPISettings("claude_api", e.target.value)}
                              className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 transition-all duration-200 focus:bg-white/10"
                            />
                          </div>
                        </div>

                        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                          <p className="text-yellow-400 text-sm">
                            <strong>Note:</strong> API keys are encrypted and stored securely. You only need to provide
                            the key for your selected AI model.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Advanced Settings Collapsible Section - Moved below AI Models */}
                    <CollapsibleSection
                      title="Advanced Settings"
                      icon={<Users className="h-4 w-4 text-purple-400" />}
                      defaultOpen={false}
                    >
                      <div className="space-y-6">
                        {advancedSettings.map((setting, index) => (
                          <div key={index} className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
                            <h4 className="text-white font-medium mb-3">Company Size Range {index + 1}</h4>

                            <div className="space-y-2">
                              <Label className="text-white text-sm">Company Size</Label>
                              <Input
                                value={setting.size}
                                onChange={(e) => updateAdvancedSetting(index, "size", e.target.value)}
                                className="bg-white/5 border-white/20 text-white transition-all duration-200 focus:bg-white/10"
                                placeholder="e.g., 1-50"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label className="text-white text-sm">Number of Contacts</Label>
                              <Input
                                type="number"
                                value={setting.no_of_contacts}
                                onChange={(e) => updateAdvancedSetting(index, "no_of_contacts", Number(e.target.value))}
                                className="bg-white/5 border-white/20 text-white transition-all duration-200 focus:bg-white/10"
                                placeholder="e.g., 4"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label className="text-white text-sm">Primary Target Roles</Label>
                              <Input
                                value={setting.primary_target_roles.join(", ")}
                                onChange={(e) =>
                                  updateAdvancedSetting(index, "primary_target_roles", e.target.value.split(", "))
                                }
                                className="bg-white/5 border-white/20 text-white transition-all duration-200 focus:bg-white/10"
                                placeholder="e.g., CEO, Founder, Co-Founder"
                              />
                              <p className="text-gray-400 text-xs">Separate roles with commas</p>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-white text-sm">Secondary Target Roles</Label>
                              <Input
                                value={setting.secondary_target_roles.join(", ")}
                                onChange={(e) =>
                                  updateAdvancedSetting(index, "secondary_target_roles", e.target.value.split(", "))
                                }
                                className="bg-white/5 border-white/20 text-white transition-all duration-200 focus:bg-white/10"
                                placeholder="e.g., Director, Head of, VP"
                              />
                              <p className="text-gray-400 text-xs">Separate roles with commas</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CollapsibleSection>

                    <div className="flex space-x-4 mt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(2)}
                        className="flex-1 border-white/20 text-white hover:bg-white/10 transition-all duration-200 hover:scale-105"
                      >
                        Previous
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setStep(4)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 hover:scale-105"
                      >
                        Next: Payment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </FormTransition>
            )}

            {step === 4 && (
              <FormTransition>
                <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Choose Your Plan
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Select a plan that fits your campaign needs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Starter Plan */}
                      <Card
                        className={`cursor-pointer transition-all ${
                          paymentPlan === "starter"
                            ? "bg-purple-600/20 border-purple-400"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                        onClick={() => setPaymentPlan("starter")}
                      >
                        <CardContent className="p-6 text-center">
                          <h3 className="text-xl font-bold text-white mb-2">Starter</h3>
                          <div className="text-3xl font-bold text-purple-400 mb-4">
                            $29<span className="text-lg">/mo</span>
                          </div>
                          <ul className="text-gray-300 text-sm space-y-2 mb-6">
                            <li>• Up to 1,000 contacts</li>
                            <li>• 5 mailboxes</li>
                            <li>• Basic AI personalization</li>
                            <li>• Email support</li>
                          </ul>
                          <Button
                            type="button"
                            variant={paymentPlan === "starter" ? "default" : "outline"}
                            className={`w-full ${
                              paymentPlan === "starter"
                                ? "bg-purple-600 hover:bg-purple-700 transition-all duration-200 hover:scale-105"
                                : "border-white/20 text-white hover:bg-white/10 transition-all duration-200 hover:scale-105"
                            }`}
                          >
                            {paymentPlan === "starter" ? "Selected" : "Select Plan"}
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Professional Plan */}
                      <Card
                        className={`cursor-pointer transition-all ${
                          paymentPlan === "professional"
                            ? "bg-purple-600/20 border-purple-400"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                        onClick={() => setPaymentPlan("professional")}
                      >
                        <CardContent className="p-6 text-center">
                          <div className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full mb-2 inline-block">
                            POPULAR
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">Professional</h3>
                          <div className="text-3xl font-bold text-purple-400 mb-4">
                            $79<span className="text-lg">/mo</span>
                          </div>
                          <ul className="text-gray-300 text-sm space-y-2 mb-6">
                            <li>• Up to 5,000 contacts</li>
                            <li>• 15 mailboxes</li>
                            <li>• Advanced AI personalization</li>
                            <li>• Priority support</li>
                            <li>• Analytics dashboard</li>
                          </ul>
                          <Button
                            type="button"
                            variant={paymentPlan === "professional" ? "default" : "outline"}
                            className={`w-full ${
                              paymentPlan === "professional"
                                ? "bg-purple-600 hover:bg-purple-700 transition-all duration-200 hover:scale-105"
                                : "border-white/20 text-white hover:bg-white/10 transition-all duration-200 hover:scale-105"
                            }`}
                          >
                            {paymentPlan === "professional" ? "Selected" : "Select Plan"}
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Enterprise Plan */}
                      <Card
                        className={`cursor-pointer transition-all ${
                          paymentPlan === "enterprise"
                            ? "bg-purple-600/20 border-purple-400"
                            : "bg-white/5 border-white/10 hover:bg-white/10"
                        }`}
                        onClick={() => setPaymentPlan("enterprise")}
                      >
                        <CardContent className="p-6 text-center">
                          <h3 className="text-xl font-bold text-white mb-2">Enterprise</h3>
                          <div className="text-3xl font-bold text-purple-400 mb-4">
                            $199<span className="text-lg">/mo</span>
                          </div>
                          <ul className="text-gray-300 text-sm space-y-2 mb-6">
                            <li>• Unlimited contacts</li>
                            <li>• Unlimited mailboxes</li>
                            <li>• Custom AI models</li>
                            <li>• Dedicated support</li>
                            <li>• White-label option</li>
                          </ul>
                          <Button
                            type="button"
                            variant={paymentPlan === "enterprise" ? "default" : "outline"}
                            className={`w-full ${
                              paymentPlan === "enterprise"
                                ? "bg-purple-600 hover:bg-purple-700 transition-all duration-200 hover:scale-105"
                                : "border-white/20 text-white hover:bg-white/10 transition-all duration-200 hover:scale-105"
                            }`}
                          >
                            {paymentPlan === "enterprise" ? "Selected" : "Select Plan"}
                          </Button>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
                      <p className="text-green-400 font-medium">🎉 Special Launch Offer!</p>
                      <p className="text-green-300 text-sm">Get 30% off your first 3 months with code: LAUNCH30</p>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep(3)}
                        className="flex-1 border-white/20 text-white hover:bg-white/10 transition-all duration-200 hover:scale-105"
                      >
                        Previous
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white transition-all duration-200 hover:scale-105"
                      >
                        {isLoading ? "Creating Project..." : "Create Project & Pay"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </FormTransition>
            )}
          </form>
        </div>
      </div>
    </PageTransition>
  )
}
