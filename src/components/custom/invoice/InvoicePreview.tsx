"use client"

import { Card } from "@/components/ui/card"
import { FileText } from "lucide-react"
import { useState } from "react"
import { generateInvoicePDF } from "@/lib/pdfGenerator"
import { InnerNavbar } from "../navigation/innerNavbar"
import { InvoiceData } from "@/types/index.type"


interface InvoicePreviewProps {
  data: InvoiceData
}

export default function InvoicePreview({ data }: InvoicePreviewProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const calculateSubtotal = () => {
    return data.items.reduce((sum, item) => sum + item.quantity * item.rate, 0)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })
  }

  const handleExportPDF = async () => {
    setIsGenerating(true)
    try {
      await generateInvoicePDF(data, calculateSubtotal())
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <InnerNavbar
        backTitle="Edit"
        backHref="/invoice"
        next={handleExportPDF}
        title={isGenerating ? "Generating..." : "Export"}
        icon={<FileText className="mr-1 md:mr-2 h-4 w-4 md:h-5 md:w-5" />}
      />

      {/* Invoice Preview */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Invoice Preview</h1>
          <p className="text-gray-600 dark:text-gray-300">Review your invoice before exporting to PDF</p>
        </div>
        <Card className="p-8 md:p-12 bg-white dark:bg-slate-800 text-black dark:text-white shadow-xl border-0 dark:border dark:border-slate-600" id="invoice-content">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-blue-900 dark:text-blue-400">INVOICE</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg">#{data.invoiceNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Invoice Date</p>
              <p className="font-bold text-blue-900 dark:text-blue-400 text-lg">{formatDate(data.invoiceDate)}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 font-medium">Due Date</p>
              <p className="font-bold text-blue-900 dark:text-blue-400 text-lg">{formatDate(data.dueDate)}</p>
            </div>
          </div>

          {/* From and To */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">FROM</h3>
              <div className="space-y-1">
                <p className="font-semibold text-black dark:text-white">{data.fromName}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{data.fromEmail}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{data.fromPhone}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{data.fromAddress}</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">BILL TO</h3>
              <div className="space-y-1">
                <p className="font-semibold text-black dark:text-white">{data.toName}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{data.toEmail}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{data.toPhone}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{data.toAddress}</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300 dark:border-gray-600 bg-blue-900 dark:bg-blue-700">
                  <th className="text-left p-3 font-semibold text-white">Description</th>
                  <th className="text-right p-3 font-semibold text-white">Qty</th>
                  <th className="text-right p-3 font-semibold text-white">Rate</th>
                  <th className="text-right p-3 font-semibold text-white">Amount</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 dark:border-gray-600">
                    <td className="py-3 text-gray-800 dark:text-gray-200">{item.description}</td>
                    <td className="text-right py-3 text-gray-800 dark:text-gray-200">{item.quantity}</td>
                    <td className="text-right py-3 text-gray-800 dark:text-gray-200">IDR {item.rate.toLocaleString("id-ID")}</td>
                    <td className="text-right py-3 text-gray-800 dark:text-gray-200">
                      IDR {(item.quantity * item.rate).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="flex justify-end mb-8">
            <div className="w-64">
              <div className="flex justify-between py-2 border-t-2 border-gray-300 dark:border-gray-600">
                <span className="font-bold text-lg text-black dark:text-white">TOTAL</span>
                <span className="font-bold text-lg text-black dark:text-white">IDR {calculateSubtotal().toLocaleString("id-ID")}</span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          {data.bankName && (
            <div className="mb-8 p-4 bg-gray-100 dark:bg-slate-700 rounded-lg">
              <h3 className="font-semibold mb-2 text-black dark:text-white">Payment Details</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Bank Name</p>
                  <p className="font-medium text-black dark:text-white">{data.bankName}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Account Number</p>
                  <p className="font-medium text-black dark:text-white">{data.accountNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Account Name</p>
                  <p className="font-medium text-black dark:text-white">{data.accountName}</p>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          {data.notes && (
            <div className="border-t border-gray-300 dark:border-gray-600 pt-6">
              <h3 className="font-semibold mb-2 text-black dark:text-white">Notes</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{data.notes}</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
