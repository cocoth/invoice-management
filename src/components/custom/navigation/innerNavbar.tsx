"use client"

import { ArrowLeft, Eye } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { ThemeToggle } from './themeToggle'
import { Button } from '@/components/ui/button'
import { useRouter, usePathname } from 'next/navigation'

export const InnerNavbar = ({
    backTitle,
    backHref,
    next,
    title,
    icon,
}: {
    backTitle: string,
    backHref: string,
    next: () => void,
    title: string
    icon?: React.ReactNode,
}) => {
    const router = useRouter()


    const handleBack = () => {
        router.push(backHref)
    }

    return (
        <div className="border-b border-blue-900/10 dark:border-blue-400/30 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 py-4 h-20">
                <div className="flex items-center justify-between h-full">
                    <Button
                        onClick={handleBack}
                        variant="ghost"
                        className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 dark:text-blue-200 hover:text-blue-900 dark:hover:text-blue-100 transition-colors cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    >
                        <ArrowLeft className="size-6 md:size-7" />
                        <span className="hidden md:block">
                            Back to {backTitle}
                        </span>
                        <span className="md:hidden">
                            Back
                        </span>
                    </Button>
                    <div className="flex items-center space-x-2 md:space-x-5">
                        <ThemeToggle />
                        <Button onClick={next} className="bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-3 py-2 md:px-6 md:py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer text-xs md:text-sm">
                            {icon ? (icon) : (
                                <Eye className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
                            )}
                            <span>{title}</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
