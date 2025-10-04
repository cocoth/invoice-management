import { FileText } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../../ui/button'
import { ThemeToggle } from './themeToggle'

const Navbar = () => {
    return (
        <header className="border-b border-blue-900/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
            <nav>
                <div className="container mx-auto px-4 py-4 items-center h-20">
                    <div className="flex items-center justify-between h-full">
                        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer">
                            <div className="h-10 w-10 rounded-xl bg-blue-900 flex items-center justify-center">
                                <FileText className="h-6 w-6 text-white" />
                            </div>
                            <span className="hidden lg:block text-2xl font-bold text-blue-900 dark:text-blue-300">Invoic</span>
                        </Link>
                        <div className="flex items-center gap-8">
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
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar