import { FileText } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../../ui/button'

const Navbar = () => {
    return (
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
            <nav>
                <div className="container mx-auto px-4 py-4 items-center h-20">
                    <div className="flex items-center justify-between h-full">
                        <div className="flex items-center gap-2">
                            <FileText className="h-6 w-6 text-primary" />
                            <span className="hidden lg:block text-xl font-semibold">Invoic</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Features
                            </Link>
                            <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                About
                            </Link>
                            <Link
                                href="/invoice"
                            >
                                <Button
                                    className='cursor-pointer'
                                >
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