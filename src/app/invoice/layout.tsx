import { InvoiceProvider } from '@/providers/InvoiceProvider'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <InvoiceProvider>
            {children}
        </InvoiceProvider>
    )
}

export default Layout