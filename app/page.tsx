import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Bot, Mail, Target, Zap, Users, BarChart3, Shield } from "lucide-react"
import Link from "next/link"
import { PageTransition } from "@/components/page-transition"
import { StaggerAnimation, StaggerItem } from "@/components/stagger-animation"

export default function HomePage() {
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
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:text-purple-300">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Revolutionize Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {" "}
                Cold Email{" "}
              </span>
              Campaigns
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              AI-powered personalization that converts prospects into customers. Automate your cold email outreach with
              intelligent targeting and dynamic content generation.
            </p>
            <div className="flex justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-16">
              Powerful Features for Email Marketing Agencies
            </h2>
            <StaggerAnimation className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <StaggerItem>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <Target className="h-12 w-12 text-purple-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Targeting</h3>
                    <p className="text-gray-300">
                      Intelligent prospect analysis and segmentation for maximum conversion rates.
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <Mail className="h-12 w-12 text-purple-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Dynamic Personalization</h3>
                    <p className="text-gray-300">
                      Generate unique, personalized emails for each prospect automatically.
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <Zap className="h-12 w-12 text-purple-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Automation Engine</h3>
                    <p className="text-gray-300">Set up complex email sequences that run on autopilot.</p>
                  </CardContent>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <Users className="h-12 w-12 text-purple-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Team Collaboration</h3>
                    <p className="text-gray-300">Manage multiple campaigns and team members from one dashboard.</p>
                  </CardContent>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <BarChart3 className="h-12 w-12 text-purple-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics</h3>
                    <p className="text-gray-300">
                      Track performance with detailed insights and optimization suggestions.
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
              <StaggerItem>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <Shield className="h-12 w-12 text-purple-400 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Compliance Ready</h3>
                    <p className="text-gray-300">Built-in GDPR and CAN-SPAM compliance features.</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            </StaggerAnimation>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Cold Email Strategy?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of agencies already using PERSONALIZE AI to boost their conversion rates.
            </p>
            <Link href="/register">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 text-lg">
                Start Your Free Trial Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black/20 backdrop-blur-sm py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Bot className="h-6 w-6 text-purple-400" />
              <span className="text-lg font-semibold text-white">PERSONALIZE AI</span>
            </div>
            <p className="text-gray-400">© 2024 Personalize AI. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}
