import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, Download, Shield, Code } from "lucide-react"
import Navbar from "@/components/custom/navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm mb-6">
            <Shield className="h-4 w-4" />
            <span>Professional Invoice Management</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Create Professional Invoices for Your Services
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Generate clean, professional invoices for your programming and pentesting services. Export to PDF instantly,
            no database required, completely free.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/invoice">
              <Button size="lg" className="w-full sm:w-auto">
                <FileText className="mr-2 h-5 w-5" />
                Create Invoice Now
              </Button>
            </Link>
            {/* <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-transparent"
            >
              <Download className="mr-2 h-5 w-5" />
              View Sample
            </Button> */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-muted-foreground text-lg">Simple, fast, and professional invoice creation</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Invoice Creation</h3>
              <p className="text-muted-foreground">
                Fill in your service details, client information, and pricing. Our intuitive interface makes it quick
                and simple.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">PDF Export</h3>
              <p className="text-muted-foreground">
                Export your invoices to professionally formatted PDF files ready to send to your clients.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Database Required</h3>
              <p className="text-muted-foreground">
                All data stays in your browser. No registration, no login, complete privacy and security.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="about" className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfect For Tech Professionals</h2>
            <p className="text-muted-foreground text-lg">Designed specifically for developers and security experts</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-2">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Programming Services</h3>
                  <p className="text-muted-foreground text-sm">
                    Web development, mobile apps, custom software solutions, API integrations, and more.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Pentesting Services</h3>
                  <p className="text-muted-foreground text-sm">
                    Security audits, vulnerability assessments, penetration testing, and security consulting.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Create Your Invoice?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Start creating professional invoices in seconds. No signup required.
          </p>
          <Link href="/invoice">
            <Button size="lg">
              <FileText className="mr-2 h-5 w-5" />
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-semibold">InvoiceFlow</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 InvoiceFlow. Professional invoice management for tech services.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
