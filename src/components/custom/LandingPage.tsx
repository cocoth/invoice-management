"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileText, Download, Shield, Code, CheckCircle, Zap, Users, ArrowRight, Star, TrendingUp } from "lucide-react"
import { Navbar } from "@/components/custom/navigation/navbar"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"

export default function LandingPage() {
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const statsRef = useRef(null)
  
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" })
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })
  
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950 overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen relative container mx-auto px-4 py-10">
        {/* Background Elements - Animated */}
        <motion.div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ y, opacity }}
        >
          {/* Desktop only - reduced animations */}
          <div className="block">
            {[
              { size: 'w-72 h-72', pos: 'top-1/6 left-1/6', color: 'bg-emerald-500/15 dark:bg-emerald-400/15', delay: 0 },
              { size: 'w-80 h-80', pos: 'top-1/4 right-1/5', color: 'bg-rose-500/15 dark:bg-rose-400/15', delay: 0.2 },
              { size: 'w-64 h-64', pos: 'top-1/2 right-1/6', color: 'bg-amber-500/15 dark:bg-amber-300/15', delay: 0.4 },
              { size: 'w-96 h-96', pos: 'top-3/5 left-1/4', color: 'bg-cyan-500/15 dark:bg-cyan-400/15', delay: 0.6 },
              { size: 'w-88 h-88', pos: 'bottom-1/6 right-1/4', color: 'bg-violet-500/15 dark:bg-violet-400/15', delay: 0.8 },
              { size: 'w-72 h-72', pos: 'bottom-1/5 left-1/3', color: 'bg-teal-500/15 dark:bg-teal-400/15', delay: 1 },
            ].map((bubble, index) => (
              <motion.div
                key={index}
                className={`absolute ${bubble.pos} ${bubble.size} ${bubble.color} rounded-full blur-3xl`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 2,
                  delay: bubble.delay,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          {/* Mobile only - ultra minimal effects */}
          <div className="md:hidden">
            <motion.div 
              className="absolute top-1/5 left-1 size-56 bg-blue-500/15 dark:bg-blue-400/15 rounded-full blur-xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
            />
            <motion.div 
              className="absolute bottom-1/5 right-1/6 size-32 bg-indigo-500/15 dark:bg-indigo-400/15 rounded-full blur-xl"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />
          </div>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 100, opacity: 0 }}
            animate={heroInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Story Introduction */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                <Star className="w-4 h-4 mr-1" />
                Trusted by 10,000+ Tech Professionals
              </span>
            </motion.div>

            {/* Main Headline with Staggered Animation */}
            <motion.h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance">
              <motion.span 
                className="text-blue-900 dark:text-blue-400 block mb-2"
                initial={{ y: 50, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Invoic
              </motion.span>
              <motion.span 
                className="text-gray-800 dark:text-gray-100 text-3xl md:text-5xl font-semibold"
                initial={{ y: 50, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Professional Invoice Management
              </motion.span>
              <br />
              <motion.span 
                className="text-2xl md:text-4xl font-medium text-gray-600 dark:text-gray-300 mt-4 block"
                initial={{ y: 50, opacity: 0 }}
                animate={heroInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Made Simple & Powerful
              </motion.span>
            </motion.h1>

            {/* Story Description */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 text-pretty max-w-4xl mx-auto leading-relaxed">
                Imagine never worrying about invoicing again. Create stunning, professional invoices for your tech services in seconds.
              </p>
              <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
                <span className="text-blue-900 dark:text-blue-400 font-semibold">No signup, no database, completely free.</span> 
                Because your time should be spent building, not billing.
              </p>
            </motion.div>

            {/* CTA Buttons with Hover Effects */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-12 md:mb-16"
              initial={{ y: 50, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Link href="/invoice" className="group cursor-pointer w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  >
                    <FileText className="mr-2 md:mr-3 h-5 md:h-6 w-5 md:w-6 group-hover:rotate-12 transition-transform" />
                    Create Your First Invoice
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Feature Badges with Staggered Animation */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 md:gap-4"
              initial={{ y: 30, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              {[
                { icon: Zap, text: "Lightning Fast", delay: 0.1 },
                { icon: Shield, text: "100% Secure", delay: 0.2 },
                { icon: CheckCircle, text: "No Registration", delay: 0.3 },
                { icon: Users, text: "Tech Focused", delay: 0.4 }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white/90 md:bg-white/80 dark:bg-slate-800/90 md:dark:bg-slate-800/80 md:backdrop-blur-sm rounded-full border border-blue-900/10 dark:border-blue-400/20 shadow-sm"
                  initial={{ y: 20, opacity: 0 }}
                  animate={heroInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.6 + feature.delay }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <feature.icon className="h-4 w-4 text-blue-900 dark:text-blue-400" />
                  <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-200">{feature.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Stats Section */}
      <motion.section 
        ref={statsRef}
        className="container mx-auto px-4 py-16 relative"
        initial={{ opacity: 0 }}
        animate={statsInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-gray-800 dark:text-gray-100"
            initial={{ y: 50, opacity: 0 }}
            animate={statsInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The Numbers Speak for Themselves
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: "10,000+", label: "Happy Users", icon: Users, delay: 0.2 },
              { number: "50,000+", label: "Invoices Created", icon: FileText, delay: 0.4 },
              { number: "99.9%", label: "Uptime", icon: TrendingUp, delay: 0.6 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ y: 50, opacity: 0, scale: 0.8 }}
                animate={statsInView ? { y: 0, opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: stat.delay,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="p-6 md:p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-blue-900/10 dark:border-blue-400/20 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <motion.div
                    className="mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="h-8 w-8 mx-auto text-blue-900 dark:text-blue-400" />
                  </motion.div>
                  <motion.div
                    className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-blue-400 mb-2"
                    initial={{ scale: 0 }}
                    animate={statsInView ? { scale: 1 } : {}}
                    transition={{ 
                      duration: 0.8, 
                      delay: stat.delay + 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section - Enhanced with Storytelling */}
      <section ref={featuresRef} id="features" className="container mx-auto px-4 py-16 md:py-20 bg-white dark:bg-slate-900 md:bg-white/70 md:dark:bg-slate-900/70 md:backdrop-blur-sm relative">
        {/* Dark mode radial overlay - desktop only */}
        <div className="hidden dark:lg:block absolute inset-0 bg-gradient-radial from-blue-950/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 100, opacity: 0 }}
            animate={featuresInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={featuresInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-300 border border-green-200 dark:border-green-700">
                <CheckCircle className="w-4 h-4 mr-1" />
                Built for Your Success
              </span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-100"
              initial={{ y: 50, opacity: 0 }}
              animate={featuresInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Everything You Need to
              <span className="text-blue-900 dark:text-blue-400"> Invoice Like a Pro</span>
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 text-xl max-w-2xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={featuresInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Built specifically for developers, freelancers, and tech professionals who demand excellence
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: FileText,
                title: "Lightning-Fast Creation",
                description: "Our intuitive interface lets you create professional invoices in under 2 minutes. Smart auto-fill and templates speed up your workflow.",
                color: "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300",
                delay: 0.2
              },
              {
                icon: Download,
                title: "Beautiful PDF Export",
                description: "Generate pixel-perfect PDF invoices that look professional and include your branding. Ready to send immediately.",
                color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-300",
                delay: 0.4
              },
              {
                icon: Shield,
                title: "Privacy-First Design",
                description: "Zero data collection, no cloud storage, no tracking. Everything stays in your browser. Your privacy is our priority.",
                color: "bg-slate-100 dark:bg-slate-700/30 text-slate-900 dark:text-slate-300",
                delay: 0.6
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 100, opacity: 0, rotateX: 45 }}
                animate={featuresInView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
                transition={{ 
                  duration: 0.8, 
                  delay: feature.delay,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="group cursor-pointer"
              >
                <Card className="p-4 md:p-6 lg:p-8 h-full transition-all duration-300 border-0 bg-white dark:bg-slate-800 md:bg-white/90 md:dark:bg-slate-700/80 md:backdrop-blur-sm group-hover:shadow-2xl group-hover:border-blue-200 dark:group-hover:border-blue-700">
                  <motion.div 
                    className={`h-12 md:h-14 lg:h-16 w-12 md:w-14 lg:w-16 rounded-xl md:rounded-2xl ${feature.color} flex items-center justify-center mb-4 md:mb-6`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <feature.icon className="h-6 md:h-7 lg:h-8 w-6 md:w-7 lg:w-8" />
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800 dark:text-gray-100 group-hover:text-blue-900 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section - Enhanced Storytelling */}
      <section id="about" className="container mx-auto px-4 py-20 bg-gradient-to-r from-blue-900 to-indigo-900 dark:from-slate-900 dark:to-slate-800 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/20 text-white border border-white/30">
                <Code className="w-4 h-4 mr-1" />
                Your Success Story Starts Here
              </span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Perfect For Tech Professionals
            </motion.h2>
            
            <motion.p 
              className="text-blue-100 dark:text-gray-300 text-xl max-w-3xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Whether you're a freelance developer or running a tech consultancy, Invoic adapts to your needs
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Code,
                title: "Development Services",
                description: "Web development, mobile apps, custom software, API integrations, database design, and full-stack solutions.",
                features: ["Custom Software", "Web & Mobile Apps", "API Development", "Database Design"],
                delay: 0.2
              },
              {
                icon: Shield,
                title: "Security & Consulting",
                description: "Penetration testing, security audits, vulnerability assessments, and cybersecurity consulting services.",
                features: ["Penetration Testing", "Security Audits", "Vulnerability Assessment", "Security Consulting"],
                delay: 0.4
              }
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ x: index === 0 ? -100 : 100, opacity: 0, rotateY: 45 }}
                whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 1, 
                  delay: useCase.delay,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="p-6 md:p-8 bg-white/20 md:bg-white/10 md:backdrop-blur-sm border-white/20 text-white hover:bg-white/30 md:hover:bg-white/20 transition-all duration-300 group cursor-pointer">
                  <div className="flex items-start gap-6">
                    <motion.div 
                      className="h-14 w-14 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <useCase.icon className="h-7 w-7 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-200 transition-colors">{useCase.title}</h3>
                      <p className="text-blue-100 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                        {useCase.description}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {useCase.features.map((feature, idx) => (
                          <motion.div 
                            key={idx} 
                            className="flex items-center gap-2"
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: useCase.delay + 0.1 * idx }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              <CheckCircle className="h-4 w-4 text-green-400" />
                            </motion.div>
                            <span className="text-sm text-blue-100 dark:text-gray-300">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Grand Finale */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
          }}
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
                <Star className="w-4 h-4 mr-1" />
                Join the Revolution
              </span>
            </motion.div>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-gray-100"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Ready to Transform Your
              <span className="text-blue-900 dark:text-blue-400"> Invoicing Process?</span>
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 text-xl mb-10 max-w-2xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Join thousands of tech professionals who trust Invoic for their billing needs.
              Start creating professional invoices in seconds.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link href="/invoice" className="cursor-pointer group">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white px-10 py-4 text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  >
                    <motion.div
                      className="flex items-center"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <FileText className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                      Get Started Now - It's Free
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            <motion.p 
              className="text-sm text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              No credit card required • No signup needed • Start invoicing immediately
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Footer - Elegant Ending */}
      <motion.footer 
        className="bg-gray-900 dark:bg-slate-950 text-white py-12 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        {/* Subtle animated background */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            backgroundImage: "linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%)",
            backgroundSize: "20px 20px",
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-between gap-6"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="h-10 w-10 rounded-xl bg-blue-900 dark:bg-blue-700 flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FileText className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold">Invoic</span>
            </motion.div>
            
            <motion.p 
              className="text-gray-400 dark:text-gray-400 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              © 2025 Invoic. Professional invoice management for tech professionals.
            </motion.p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}
