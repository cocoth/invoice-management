"use client"

import { FileText, Menu, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../../ui/button'
import { ThemeToggle } from './themeToggle'

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navRef = useRef<HTMLElement>(null)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isMenuOpen])

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMenuOpen])

    return (
        <>
            <header ref={navRef} className="border-b border-blue-900/10 dark:border-blue-300/20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
                <nav aria-label="Main navigation">
                    <div className="container mx-auto px-4 py-2">
                        <div className="flex items-center justify-between h-16">
                            {/* Logo */}
                            <Link 
                                href="/" 
                                className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer" 
                                onClick={closeMenu}
                                aria-label="Invoic - Go to homepage"
                            >
                                <div className="h-10 w-10 rounded-xl bg-blue-900 dark:bg-blue-700 flex items-center justify-center" aria-hidden="true">
                                    <FileText className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-xl md:text-2xl font-bold text-blue-900 dark:text-blue-300">Invoic</span>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex items-center gap-8">
                                <Link 
                                    href="#features" 
                                    className="text-sm font-medium text-gray-600 hover:text-blue-900 dark:text-gray-200 dark:hover:text-blue-300 transition-colors cursor-pointer"
                                    aria-label="Features section"
                                >
                                    Features
                                </Link>
                                <Link 
                                    href="#about" 
                                    className="text-sm font-medium text-gray-600 hover:text-blue-900 dark:text-gray-200 dark:hover:text-blue-300 transition-colors cursor-pointer"
                                    aria-label="About section"
                                >
                                    About
                                </Link>
                                <ThemeToggle/>
                                <Link href="/invoice" className="cursor-pointer" aria-label="Create new invoice">
                                    <Button className="bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
                                        Create Invoice
                                    </Button>
                                </Link>
                            </div>

                            {/* Mobile Navigation Toggle */}
                            <div className="lg:hidden flex items-center gap-4">
                                <ThemeToggle/>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleMenu}
                                    className="cursor-pointer"
                                    aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                                    aria-expanded={isMenuOpen}
                                    aria-controls="mobile-menu"
                                    aria-haspopup="true"
                                >
                                    {isMenuOpen ? (
                                        <X className="h-6 w-6 text-gray-600 dark:text-gray-300" aria-hidden="true" />
                                    ) : (
                                        <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" aria-hidden="true" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu - Separated from header */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ 
                            duration: 0.3, 
                            ease: [0.4, 0.0, 0.2, 1],
                            height: { duration: 0.3 },
                            opacity: { duration: 0.2 }
                        }}
                        className="lg:hidden fixed w-full top-[5rem] z-40 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border-b border-blue-900/10 dark:border-blue-300/20 shadow-lg overflow-hidden"
                        aria-label="Mobile navigation menu"
                    >
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ delay: 0.1, duration: 0.2 }}
                            className="container mx-auto px-4 py-6"
                        >
                            <div className="flex flex-col gap-4">
                                <Link 
                                    href="/#features" 
                                    className="text-sm font-medium text-gray-600 hover:text-blue-900 dark:text-gray-200 dark:hover:text-blue-300 transition-colors cursor-pointer py-2 px-2 rounded-md hover:bg-blue-50 dark:hover:bg-slate-800"
                                    onClick={closeMenu}
                                    aria-label="Features section"
                                >
                                    Features
                                </Link>
                                <Link 
                                    href="/#about" 
                                    className="text-sm font-medium text-gray-600 hover:text-blue-900 dark:text-gray-200 dark:hover:text-blue-300 transition-colors cursor-pointer py-2 px-2 rounded-md hover:bg-blue-50 dark:hover:bg-slate-800"
                                    onClick={closeMenu}
                                
                                    aria-label="About section"
                                >
                                    About
                                </Link>
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-2">
                                    <Link 
                                        href="/invoice" 
                                        className="cursor-pointer" 
                                        onClick={closeMenu}
                                        aria-label="Create new invoice"
                                    >
                                        <Button className="w-full bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
                                            Create Invoice
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
