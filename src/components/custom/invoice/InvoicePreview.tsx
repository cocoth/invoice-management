"use client"

import { Card } from "@/components/ui/card"
import { FileText } from "lucide-react"
import { useState } from "react"
import { generateInvoicePDF } from "@/lib/pdfGenerator"
import { InnerNavbar } from "../navigation/innerNavbar"
import { InvoiceData } from "@/types/index.type"
import { Button } from "@/components/ui/button"
import Link from "next/link"


interface InvoicePreviewProps {
  data: InvoiceData
}

export default function InvoicePreview({ data }: InvoicePreviewProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const calculateSubtotal = () => {
    return data.items.reduce((sum, item) => sum + item.quantity * item.rate, 0)
  }

  const total = calculateSubtotal()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getShortFormat = (amount: number) => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)}B`
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(0)}K`
    }
    return ''
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
      <div className="container mx-auto px-4 py-8 max-w-xl md:max-w-4xl">
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Invoice Preview</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">Review your invoice before exporting to PDF</p>
        </div>
        <Card
          id="invoice-content"
          className="p-4 md:p-8 lg:p-12 bg-white dark:bg-slate-800 text-black dark:text-white shadow-xl border-0 dark:border dark:border-slate-600 overflow-hidden"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-0 mb-6 md:mb-8">
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-4xl font-bold mb-2 text-blue-900 dark:text-blue-400">INVOICE</h1>
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg">#{data.invoiceNumber}</p>
            </div>
            <div className="text-center md:text-right">
              <div className="mb-3 md:mb-0">
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">Invoice Date</p>
                <p className="font-bold text-blue-900 dark:text-blue-400 text-sm md:text-lg">{formatDate(data.invoiceDate)}</p>
              </div>
              <div className="mt-2 md:mt-3">
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">Due Date</p>
                <p className="font-bold text-blue-900 dark:text-blue-400 text-sm md:text-lg">{formatDate(data.dueDate)}</p>
              </div>
            </div>
          </div>

          {/* From and To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <h3 className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">FROM</h3>
              <div className="space-y-1">
                <p className="font-semibold text-black dark:text-white text-sm md:text-base break-words">{data.fromName}</p>
                <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 break-all">{data.fromEmail}</p>
                <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 break-words">{data.fromPhone}</p>
                <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 break-words">{data.fromAddress}</p>
              </div>
            </div>
            <div>
              <h3 className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">BILL TO</h3>
              <div className="space-y-1">
                <p className="font-semibold text-black dark:text-white text-sm md:text-base break-words">{data.toName}</p>
                <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 break-all">{data.toEmail}</p>
                <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 break-words">{data.toPhone}</p>
                <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 break-words">{data.toAddress}</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-6 md:mb-8">
            {/* Mobile Table View */}
            <div className="md:hidden">
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">ITEMS / SERVICES</h3>

              {/* Scrollable container for many items */}
              <div className={`space-y-3 ${data.items.length > 5 ? 'max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-blue-300 dark:scrollbar-thumb-blue-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800' : ''}`}>
                {data.items.map((item, index) => (
                  <div key={item.id} className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    {/* Card Header */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 border-b border-gray-200 dark:border-gray-700 rounded-t-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-2 py-1 rounded-full font-medium">
                          Item #{index + 1}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4 space-y-3">
                      {/* Description */}
                      <div>
                        <label className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium block mb-1">
                          Description
                        </label>
                        <p className="text-sm text-black dark:text-white leading-relaxed break-words">
                          {item.description || `Item ${index + 1}`}
                        </p>
                      </div>

                      {/* Quantity and Rate in separate rows for better UX */}
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
                            Quantity
                          </span>
                          <span className="text-sm font-semibold text-black dark:text-white">
                            {item.quantity}
                          </span>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                          <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
                            Rate per Unit
                          </span>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-black dark:text-white break-words">
                              {formatCurrency(item.rate)}
                            </div>
                            {getShortFormat(item.rate) && (
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {getShortFormat(item.rate)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Total Amount - Highlighted */}
                      <Card className="overflow-auto bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-blue-700 dark:text-blue-300 uppercase tracking-wide font-semibold">
                            Total Amount
                          </span>
                          <div className="text-right">
                            <div className="text-base font-bold text-blue-900 dark:text-blue-400 break-words">
                              {formatCurrency(item.quantity * item.rate)}
                            </div>
                            {getShortFormat(item.quantity * item.rate) && (
                              <div className="text-xs text-blue-600 dark:text-blue-400 opacity-80">
                                ≈ {getShortFormat(item.quantity * item.rate)}
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                ))}

                {/* Scroll indicator for many items */}
                {data.items.length > 5 && (
                  <div className="text-center py-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Scroll to see all {data.items.length} items
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block">
              <div className="overflow-x-auto">
                <div className="min-w-full">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gray-300 dark:border-gray-600 bg-blue-900 dark:bg-blue-700">
                        <th className="text-left p-3 font-semibold text-white text-sm lg:text-base min-w-[200px]">Description</th>
                        <th className="text-center p-3 font-semibold text-white text-sm lg:text-base w-16">Qty</th>
                        <th className="text-right p-3 font-semibold text-white text-sm lg:text-base w-32">Rate</th>
                        <th className="text-right p-3 font-semibold text-white text-sm lg:text-base w-32">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.items.map((item, index) => (
                        <tr key={item.id} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                          <td className="py-3 px-3 text-gray-800 dark:text-gray-200 text-sm lg:text-base">
                            <div className="break-words leading-relaxed">
                              {item.description || `Item ${index + 1}`}
                            </div>
                          </td>
                          <td className="text-center py-3 px-3 text-gray-800 dark:text-gray-200 text-sm lg:text-base font-medium">
                            {item.quantity}
                          </td>
                          <td className="text-right py-3 px-3 text-gray-800 dark:text-gray-200 text-sm lg:text-base font-medium">
                            <span className="whitespace-nowrap">{formatCurrency(item.rate)}</span>
                          </td>
                          <td className="text-right py-3 px-3 text-gray-800 dark:text-gray-200 text-sm lg:text-base font-bold">
                            <div className="text-right">
                              <span className="whitespace-nowrap text-blue-900 dark:text-blue-400 block">
                                {formatCurrency(item.quantity * item.rate)}
                              </span>
                              {getShortFormat(item.quantity * item.rate) && (
                                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                                  {getShortFormat(item.quantity * item.rate)}
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Totals Section */}
          <div className="border-t-2 border-gray-300 dark:border-gray-600 pt-4 mb-6 md:mb-8">
            {/* Mobile Layout */}
            <div className="md:hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
                <div className="flex flex-col space-y-3">
                  <div className="text-center">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide block mb-2">
                      Total Amount
                    </span>
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-blue-100 dark:border-blue-800">
                      <div className="text-base sm:text-lg font-bold text-blue-900 dark:text-blue-400 break-words leading-tight">
                        {formatCurrency(total)}
                      </div>
                      {getShortFormat(total) && (
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          ≈ {getShortFormat(total)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:block">
              <div className="flex justify-end">
                <div className="w-80 lg:w-96 xl:w-[28rem]">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-base lg:text-lg font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                          Total Amount
                        </span>
                        {getShortFormat(total) && (
                          <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Approximately {getShortFormat(total)}
                          </span>
                        )}
                      </div>
                      <div className="text-right ml-4 max-w-[60%]">
                        <div className="text-lg lg:text-xl xl:text-2xl font-bold text-blue-900 dark:text-blue-400 break-words leading-tight">
                          {formatCurrency(total)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          {data.bankName && (
            <div className="mb-6 md:mb-8 p-4 md:p-6 bg-gray-100 dark:bg-slate-700 rounded-lg">
              <h3 className="font-semibold mb-3 md:mb-4 text-black dark:text-white text-sm md:text-base">Payment Details</h3>

              {/* Mobile Layout */}
              <div className="md:hidden space-y-3">
                <div className="bg-white dark:bg-slate-600 p-3 rounded border">
                  <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Bank Name</p>
                  <p className="font-medium text-black dark:text-white mt-1 text-sm">{data.bankName}</p>
                </div>
                <div className="bg-white dark:bg-slate-600 p-3 rounded border">
                  <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Account Number</p>
                  <p className="font-medium text-black dark:text-white mt-1 text-sm font-mono">{data.accountNumber}</p>
                </div>
                <div className="bg-white dark:bg-slate-600 p-3 rounded border">
                  <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">Account Name</p>
                  <p className="font-medium text-black dark:text-white mt-1 text-sm">{data.accountName}</p>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-3 gap-4 lg:gap-6 text-sm lg:text-base">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wide">Bank Name</p>
                  <p className="font-medium text-black dark:text-white mt-1">{data.bankName}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wide">Account Number</p>
                  <p className="font-medium text-black dark:text-white mt-1 font-mono">{data.accountNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wide">Account Name</p>
                  <p className="font-medium text-black dark:text-white mt-1">{data.accountName}</p>
                </div>
              </div>
            </div>
          )}

          {/* Notes */}
          {data.notes && (
            <div className="border-t border-gray-300 dark:border-gray-600 pt-4 md:pt-6">
              <h3 className="font-semibold mb-2 md:mb-3 text-black dark:text-white text-sm md:text-base">Notes</h3>
              <div className="bg-gray-50 dark:bg-slate-700 p-3 md:p-4 rounded-lg border">
                <p className="text-xs md:text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {data.notes}
                </p>
              </div>
            </div>
          )}
        </Card>
        <section className="grid grid-cols-2 justify-center sm:flex space-x-4 sm:justify-end mt-8">
          <Link href="/invoice" className="cursor-pointer">
            <Button
              variant="outline"
              size="lg"
              className="px-6 w-full sm:w-auto md:px-8 py-3 border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </Button>
          </Link>
          <Button
            onClick={handleExportPDF}
            size="lg"
            className="px-6 w-full sm:w-auto md:px-10 py-3 bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-xl transition-shadow duration-200 cursor-pointer"
          >
            <FileText className="mr-2 md:mr-3 h-4 md:h-5 w-4 md:w-5" />
            {isGenerating ? 'Generating...' : 'Export'}
          </Button>
        </section>
      </div>
    </div>
  )
}
