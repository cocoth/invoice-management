"use client"

import { InvoiceData } from "@/types/index.type"
import { createContext, useContext, useState } from "react"

interface InvoiceContextType {
    setInvoiceData: (data: InvoiceData) => void
    invoiceData: InvoiceData

    getCurrentDate: () => string
    getDueDate: () => string
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined)


export const InvoiceProvider = ({ children }: { children: React.ReactNode }) => {
    const getCurrentDate = () => {
        const now = new Date()
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const day = String(now.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const getDueDate = () => {
        const now = new Date()
        const dueDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
        const year = dueDate.getFullYear()
        const month = String(dueDate.getMonth() + 1).padStart(2, '0')
        const day = String(dueDate.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const [invoiceData, setInvoiceData] = useState<InvoiceData>({
        invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
        invoiceDate: getCurrentDate(),
        dueDate: getDueDate(),
        fromName: "",
        fromEmail: "",
        fromPhone: "",
        fromAddress: "",
        toName: "",
        toEmail: "",
        toPhone: "",
        toAddress: "",
        items: [{ id: "1", description: "", quantity: 1, rate: 0 }],
        notes: "",
        bankName: "",
        accountNumber: "",
        accountName: "",
    })

    const value: InvoiceContextType = {
        setInvoiceData,
        invoiceData,
        getCurrentDate,
        getDueDate
    }

    return (
        <InvoiceContext.Provider value={value}>
            {children}
        </InvoiceContext.Provider>
    )
}

export const useInvoice = () => {
    const context = useContext(InvoiceContext)
    if (!context) {
        throw new Error("useInvoice must be used within an InvoiceProvider")
    }
    return context
}