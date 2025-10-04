'use client'

import * as React from 'react'
import {
    ThemeProvider as NextThemesProvider,
    type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <>
            </>
        )
    }

    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
