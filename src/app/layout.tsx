import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../css/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Invoic - Professional Invoice Management",
  description: "Create stunning, professional invoices for your tech services in seconds. No signup, no database, completely free. Perfect for developers, freelancers, and tech consultancies.",
  keywords: "invoice generator, tech invoice, developer invoice, freelancer billing, professional invoicing, PDF invoice maker, free invoice tool, no signup invoice",
  authors: [{ name: "HALO-Foundation" }],
  robots: "index, follow",
  openGraph: {
    title: "Invoic - Professional Invoice Management",
    description: "Create stunning, professional invoices for your tech services in seconds. No signup required, completely free.",
    type: "website",
    url: "https://invoicme.vercel.app",
    siteName: "Invoic",
    images: [
      {
        url: "/image.png",
        width: 1200,
        height: 630,
        alt: "Invoic - Professional Invoice Management"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoic - Professional Invoice Management",
    description: "Create stunning, professional invoices for your tech services in seconds. No signup required, completely free.",
    images: ["/image.png"]
  },
  alternates: {
    canonical: "https://invoicme.vercel.app"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Invoic",
    "description": "Professional invoice management platform for tech professionals. Create, manage, and export invoices with no signup required.",
    "url": "https://invoic.vercel.app",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Professional invoice creation",
      "PDF export",
      "No signup required",
      "Privacy-first design",
      "Tech-focused templates"
    ],
    "provider": {
      "@type": "Organization",
      "name": "HALO-Foundation"
    }
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* <!-- Google Tag Manager --> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-NP8NQZSL');`
          }}
        />
        {/* <!-- End Google Tag Manager --> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}
      >
        {/* <!-- Google Tag Manager (noscript) --> */}
        <noscript>
          <iframe 
        src="https://www.googletagmanager.com/ns.html?id=GTM-NP8NQZSL"
        height="0" 
        width="0" 
        style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        {/* <!-- End Google Tag Manager (noscript) --> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          enableColorScheme
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
