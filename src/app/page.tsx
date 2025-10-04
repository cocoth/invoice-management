import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, Download, Shield, Code, CheckCircle, Zap, Users } from "lucide-react"
import Navbar from "@/components/custom/navigation/navbar"

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:bg-gradient-radial dark:from-blue-950 dark:via-slate-900 dark:to-black">
      <Navbar />

      {/* Hero Section */}
      <section className="min-h-screen relative container mx-auto px-4 py-16 md:py-24">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/6 left-1/6 w-72 h-72 bg-emerald-500/15 dark:bg-emerald-400/15 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/4 right-1/5 w-80 h-80 bg-rose-500/15 dark:bg-rose-400/15 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-1/6 w-64 h-64 bg-amber-500/15 dark:bg-amber-300/15 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-3/5 left-1/4 w-96 h-96 bg-cyan-500/15 dark:bg-cyan-400/15 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/6 right-1/4 w-88 h-88 bg-violet-500/15 dark:bg-violet-400/15 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/5 left-1/3 w-72 h-72 bg-teal-500/15 dark:bg-teal-400/15 rounded-full blur-3xl"></div>
            <div className="absolute top-3/4 right-1/3 w-60 h-60 bg-pink-500/15 dark:bg-pink-400/15 rounded-full blur-3xl"></div>
            <div className="absolute top-1/3 left-1/5 w-68 h-68 bg-orange-500/15 dark:bg-orange-400/15 rounded-full blur-3xl animate-pulse"></div>
            <div className="hidden dark:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-radial from-indigo-400/4 via-purple-400/2 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-16">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance">
              <span className="text-blue-900 dark:text-blue-400 block mb-2">
                Invoic
              </span>
              <span className="text-gray-800 dark:text-gray-100 text-3xl md:text-5xl font-semibold">
                Professional Invoice Management
              </span>
              <br />
              <span className="text-2xl md:text-4xl font-medium text-gray-600 dark:text-gray-300 mt-4 block">
                Made Simple & Powerful
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 text-pretty max-w-4xl mx-auto leading-relaxed">
              Create stunning, professional invoices for your tech services in seconds.
              <span className="text-blue-900 dark:text-blue-400 font-semibold"> No signup, no database, completely free.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
              <Link href="/invoice" className="group cursor-pointer">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 cursor-pointer"
                >
                  <FileText className="mr-3 h-6 w-6" />
                  Create Invoice Now
                </Button>
              </Link>
              {/* <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
              >
                <Download className="mr-3 h-6 w-6" />
                View Demo
              </Button> */}
            </div>

            {/* Features Pills */}
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: Zap, text: "Lightning Fast" },
                { icon: Shield, text: "100% Secure" },
                { icon: CheckCircle, text: "No Registration" },
                { icon: Users, text: "Tech Focused" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-blue-900/10 dark:border-blue-400/20 shadow-sm">
                  <feature.icon className="h-4 w-4 text-blue-900 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm relative">
        {/* Dark mode radial overlay */}
        <div className="hidden dark:block absolute inset-0 bg-gradient-radial from-blue-950/20 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-100">
              Everything You Need to
              <span className="text-blue-900 dark:text-blue-400"> Invoice Like a Pro</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-xl max-w-2xl mx-auto">
              Built specifically for developers, freelancers, and tech professionals who demand excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Lightning-Fast Creation",
                description: "Our intuitive interface lets you create professional invoices in under 2 minutes. Smart auto-fill and templates speed up your workflow.",
                color: "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300"
              },
              {
                icon: Download,
                title: "Beautiful PDF Export",
                description: "Generate pixel-perfect PDF invoices that look professional and include your branding. Ready to send immediately.",
                color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-300"
              },
              {
                icon: Shield,
                title: "Privacy-First Design",
                description: "Zero data collection, no cloud storage, no tracking. Everything stays in your browser. Your privacy is our priority.",
                color: "bg-slate-100 dark:bg-slate-700/30 text-slate-900 dark:text-slate-300"
              }
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 dark:bg-slate-700/50 backdrop-blur-sm"
              >
                <div className={`h-16 w-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="about" className="container mx-auto px-4 py-20 bg-gradient-to-r from-blue-900 to-indigo-900 dark:from-slate-900 dark:to-slate-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Perfect For Tech Professionals
            </h2>
            <p className="text-blue-100 dark:text-gray-300 text-xl max-w-3xl mx-auto">
              Whether you're a freelance developer or running a tech consultancy, Invoic adapts to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Code,
                title: "Development Services",
                description: "Web development, mobile apps, custom software, API integrations, database design, and full-stack solutions.",
                features: ["Custom Software", "Web & Mobile Apps", "API Development", "Database Design"]
              },
              {
                icon: Shield,
                title: "Security & Consulting",
                description: "Penetration testing, security audits, vulnerability assessments, and cybersecurity consulting services.",
                features: ["Penetration Testing", "Security Audits", "Vulnerability Assessment", "Security Consulting"]
              }
            ].map((useCase, index) => (
              <Card key={index} className="p-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <useCase.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-4">{useCase.title}</h3>
                    <p className="text-blue-100 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                      {useCase.description}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {useCase.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-sm text-blue-100 dark:text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            Ready to Transform Your
            <span className="text-blue-900 dark:text-blue-400"> Invoicing Process?</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of tech professionals who trust Invoic for their billing needs.
            Start creating professional invoices in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/invoice" className="cursor-pointer">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 text-white px-10 py-4 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                <FileText className="mr-3 h-6 w-6" />
                Get Started Now - It's Free
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            No credit card required • No signup needed • Start invoicing immediately
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-slate-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-900 dark:bg-blue-700 flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Invoic</span>
            </div>
            <p className="text-gray-400 dark:text-gray-400 text-center">
              © 2025 Invoic. Professional invoice management for tech professionals.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
