"use client"

import { FileText, Menu, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../../ui/button'
import { ThemeToggle } from './themeToggle'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <header className="border-b border-blue-900/10 dark:border-blue-300/20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
            <nav>
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer" onClick={closeMenu}>
                            <div className="h-10 w-10 rounded-xl bg-blue-900 dark:bg-blue-700 flex items-center justify-center">
                                <FileText className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl md:text-2xl font-bold text-blue-900 dark:text-blue-300">Invoic</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-blue-900 dark:text-gray-200 dark:hover:text-blue-300 transition-colors cursor-pointer">
                                Features
                            </Link>
                            <Link href="#about" className="text-sm font-medium text-gray-600 hover:text-blue-900 dark:text-gray-200 dark:hover:text-blue-300 transition-colors cursor-pointer">
                                About
                            </Link>
                            <ThemeToggle/>
                            <Link href="/invoice" className="cursor-pointer">
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
                            >
                                {isMenuOpen ? (
                                    <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                                ) : (
                                    <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="lg:hidden border-t border-blue-900/10 dark:border-blue-300/20 mt-4 pt-4 pb-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-b-lg">
                            <div className="flex flex-col gap-4">
                                <Link 
                                    href="#features" 
                                    className="text-sm font-medium text-gray-600 hover:text-blue-900 dark:text-gray-200 dark:hover:text-blue-300 transition-colors cursor-pointer py-2"
                                    onClick={closeMenu}
                                >
                                    Features
                                </Link>
                                <Link 
                                    href="#about" 
                                    className="text-sm font-medium text-gray-600 hover:text-blue-900 dark:text-gray-200 dark:hover:text-blue-300 transition-colors cursor-pointer py-2"
                                    onClick={closeMenu}
                                >
                                    About
                                </Link>
                                <Link href="/invoice" className="cursor-pointer mt-2" onClick={closeMenu}>
                                    <Button className="w-full bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
                                        Create Invoice
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar