"use client"
import InvoicePreview from '@/components/custom/invoice/InvoicePreview'
import { useInvoice } from '@/providers/InvoiceProvider'
import React from 'react'

const InvoicePreviewPage = () => {
    const {
        invoiceData,
    } = useInvoice()
    return (
        <div>
            <InvoicePreview data={invoiceData}/>
        </div>
    )
}

export default InvoicePreviewPage