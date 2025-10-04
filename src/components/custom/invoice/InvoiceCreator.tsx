"use client"

import { useState, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Eye } from "lucide-react"
import Link from "next/link"
import { InnerNavbar } from "../navigation/innerNavbar"
import { InvoiceData, InvoiceItem } from "@/types/index.type"
import { useInvoice } from "@/providers/InvoiceProvider"
import { useRouter } from "next/navigation"


export default function InvoiceCreator() {
  const {
    invoiceData,
    setInvoiceData
  } = useInvoice()

  const router = useRouter()

  // Optimized update function dengan useCallback
  const updateInvoiceData = useCallback((updates: Partial<InvoiceData>) => {
    setInvoiceData({
      ...invoiceData,
      ...updates
    })
  }, [invoiceData, setInvoiceData])

  // Optimized functions
  const addItem = useCallback(() => {
    updateInvoiceData({
      items: [...invoiceData.items, { id: Date.now().toString(), description: "", quantity: 1, rate: 0 }]
    })
  }, [invoiceData.items, updateInvoiceData])

  const removeItem = useCallback((id: string) => {
    if (invoiceData.items.length > 1) {
      updateInvoiceData({
        items: invoiceData.items.filter((item) => item.id !== id)
      })
    }
  }, [invoiceData.items, updateInvoiceData])

  const updateItem = useCallback((id: string, field: keyof InvoiceItem, value: string | number) => {
    updateInvoiceData({
      items: invoiceData.items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    })
  }, [invoiceData.items, updateInvoiceData])

  // Memoized calculation
  const subtotal = useMemo(() => {
    return invoiceData.items.reduce((sum, item) => sum + item.quantity * item.rate, 0)
  }, [invoiceData.items])

  const handlePreview = useCallback(() => {
    router.push("/invoice/preview")
  }, [router])

  return (
    <div className="from-slate-50 via-blue-50 to-indigo-100 dark:bg-blue-900/20">
      {/* Header */}
      <InnerNavbar
        backTitle="Home"
        backHref="/"
        next={handlePreview}
        title="Preview"
        icon={<Eye className="mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />}
      />

      {/* Form */}
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-5xl">
        <div className="mb-6 md:mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-800 dark:text-white">
            Create Your
            <span className="text-blue-900 dark:text-white"> Professional Invoice</span>
          </h1>
          <p className="text-gray-600 dark:text-blue-100 text-base md:text-lg max-w-2xl mx-auto">Fill in the details below to generate your professional invoice with Invoic</p>
        </div>        <div className="space-y-6 md:space-y-8">
          {/* Invoice Details */}
          <Card className="p-4 md:p-8 bg-white dark:bg-gray-800 md:bg-white/90 md:dark:bg-gray-800/90 md:backdrop-blur-sm border-blue-900/10 dark:border-blue-400/30 shadow-sm md:shadow-lg md:hover:shadow-xl md:dark:shadow-blue-500/20 transition-shadow duration-200">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-blue-900 dark:text-white">Invoice Details</h2>
            <div className="grid md:grid-cols-3 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="invoiceNumber" className="text-gray-700 dark:text-gray-300 font-medium">Invoice Number</Label>
                <Input
                  id="invoiceNumber"
                  value={invoiceData.invoiceNumber}
                  onChange={(e) => updateInvoiceData({ invoiceNumber: e.target.value })}
                  placeholder="INV-001"
                  className="border-gray-200 dark:border-blue-400/40 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-300 focus:border-blue-900 dark:focus:border-blue-300 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoiceDate" className="text-gray-700 dark:text-gray-300 font-medium">Invoice Date</Label>
                <Input
                  id="invoiceDate"
                  type="date"
                  value={invoiceData.invoiceDate}
                  onChange={(e) => updateInvoiceData({ invoiceDate: e.target.value })}
                  className="border-gray-200 dark:border-blue-400/40 dark:bg-gray-700/80 dark:text-white focus:border-blue-900 dark:focus:border-blue-300 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate" className="text-gray-700 dark:text-gray-300 font-medium">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={(e) => updateInvoiceData({ dueDate: e.target.value })}
                  className="border-gray-200 dark:border-blue-400/40 dark:bg-gray-700/80 dark:text-white focus:border-blue-900 dark:focus:border-blue-300 transition-colors"
                />
              </div>
            </div>
          </Card>

          {/* From (Your Details) */}
          <Card className="p-4 md:p-8 bg-white dark:bg-gray-800 md:bg-white/90 md:dark:bg-gray-800/90 md:backdrop-blur-sm border-blue-900/10 dark:border-blue-400/30 shadow-sm md:shadow-lg md:hover:shadow-xl md:dark:shadow-blue-500/20 transition-shadow duration-200">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-blue-900 dark:text-white">From (Your Details)</h2>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="fromName" className="text-gray-700 dark:text-gray-300 font-medium">Your Name / Business Name</Label>
                <Input
                  id="fromName"
                  value={invoiceData.fromName}
                  onChange={(e) => updateInvoiceData({ fromName: e.target.value })}
                  placeholder="John Doe"
                  className="border-gray-200 focus:border-blue-900 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromEmail" className="text-gray-700 dark:text-gray-300 font-medium">Email</Label>
                <Input
                  id="fromEmail"
                  type="email"
                  value={invoiceData.fromEmail}
                  onChange={(e) => updateInvoiceData({ fromEmail: e.target.value })}
                  placeholder="john@example.com"
                  className="border-gray-200 focus:border-blue-900 focus:ring-blue-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromPhone" className="text-gray-700 dark:text-gray-300 font-medium">Phone</Label>
                <Input
                  id="fromPhone"
                  value={invoiceData.fromPhone}
                  onChange={(e) => updateInvoiceData({ fromPhone: e.target.value })}
                  placeholder="+62 812 3456 7890"
                  className="border-gray-200 focus:border-blue-900 focus:ring-blue-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromAddress" className="text-gray-700 dark:text-gray-300 font-medium">Address</Label>
                <Input
                  id="fromAddress"
                  value={invoiceData.fromAddress}
                  onChange={(e) => updateInvoiceData({ fromAddress: e.target.value })}
                  placeholder="Jakarta, Indonesia"
                  className="border-gray-200 focus:border-blue-900 focus:ring-blue-900"
                />
              </div>
            </div>
          </Card>

          {/* To (Client Details) */}
          <Card className="p-4 md:p-8 bg-white dark:bg-slate-800 md:bg-white/80 md:dark:bg-slate-800/90 md:backdrop-blur-sm border-blue-900/10 dark:border-blue-300/20 shadow-sm md:shadow-lg md:hover:shadow-xl transition-shadow duration-200">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-blue-900 dark:text-white">Bill To (Client Details)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="toName" className="text-gray-700 dark:text-gray-300 font-medium">Client Name / Company</Label>
                <Input
                  id="toName"
                  value={invoiceData.toName}
                  onChange={(e) => updateInvoiceData({ toName: e.target.value })}
                  placeholder="Client Company"
                  className="border-gray-200 focus:border-blue-900 focus:ring-blue-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="toEmail" className="text-gray-700 dark:text-gray-300 font-medium">Email</Label>
                <Input
                  id="toEmail"
                  type="email"
                  value={invoiceData.toEmail}
                  onChange={(e) => updateInvoiceData({ toEmail: e.target.value })}
                  placeholder="client@example.com"
                  className="border-gray-200 focus:border-blue-900 focus:ring-blue-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="toPhone" className="text-gray-700 dark:text-gray-300 font-medium">Phone</Label>
                <Input
                  id="toPhone"
                  value={invoiceData.toPhone}
                  onChange={(e) => updateInvoiceData({ toPhone: e.target.value })}
                  placeholder="+62 812 9876 5432"
                  className="border-gray-200 focus:border-blue-900 focus:ring-blue-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="toAddress" className="text-gray-700 dark:text-gray-300 font-medium">Address</Label>
                <Input
                  id="toAddress"
                  value={invoiceData.toAddress}
                  onChange={(e) => updateInvoiceData({ toAddress: e.target.value })}
                  placeholder="Bandung, Indonesia"
                  className="border-gray-200 focus:border-blue-900 focus:ring-blue-900"
                />
              </div>
            </div>
          </Card>

          {/* Items/Services */}
          <Card className="p-4 md:p-8 max-h-[80dvh] md:max-h-[85dvh] bg-white dark:bg-gray-800 md:bg-white/90 md:dark:bg-gray-800/90 md:backdrop-blur-sm border-blue-900/10 dark:border-blue-400/30 shadow-sm md:shadow-lg md:hover:shadow-xl md:dark:shadow-blue-500/20 transition-shadow duration-200">
            <div className="mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-blue-900 dark:text-white">Services / Items</h2>
            </div>
            <div className="space-y-4 md:space-y-6 max-h-[60vh] md:max-h-[70vh] overflow-y-auto pr-1 md:pr-2 py-2 md:py-3">
              {invoiceData.items.map((item, index) => (
                <div key={item.id} className="p-3 md:p-4 bg-gray-50 dark:bg-gray-700/60 rounded-lg border border-gray-200 dark:border-blue-400/40 relative hover:bg-gray-100 dark:hover:bg-gray-600/60 transition-colors">
                  <div className="grid md:grid-cols-[2fr,1fr,1fr,auto] gap-3 md:gap-4 items-end">
                    <div className="space-y-2">
                      <Label htmlFor={`desc-${item.id}`} className="text-gray-700 dark:text-gray-300 font-medium">Description</Label>
                      <Input
                        id={`desc-${item.id}`}
                        value={item.description}
                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                        placeholder="Web Development Service"
                        className="border-gray-200 focus:border-blue-900 focus:ring-blue-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`qty-${item.id}`} className="text-gray-700 dark:text-gray-300 font-medium">Quantity</Label>
                      <Input
                        id={`qty-${item.id}`}
                        type="text"
                        inputMode="numeric"
                        value={item.quantity === 1 ? "" : item.quantity.toString()}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9]/g, "");
                          updateItem(item.id, "quantity", Number.parseInt(value) || 1);
                        }}
                        placeholder="1"
                        className="border-gray-200 focus:border-blue-900 focus:ring-blue-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`rate-${item.id}`} className="text-gray-700 dark:text-gray-300 font-medium">Rate (IDR)</Label>
                      <Input
                        id={`rate-${item.id}`}
                        type="text"
                        inputMode="numeric"
                        value={item.rate === 0 ? "" : item.rate.toString()}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^0-9.]/g, "");
                          updateItem(item.id, "rate", Number.parseFloat(value) || 0);
                        }}
                        placeholder="1000000"
                        style={{ appearance: "textfield" }}
                        className="border-gray-200 focus:border-blue-900 focus:ring-blue-900 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-bold min-w-[120px] text-right text-blue-900 dark:text-gray-300">
                        IDR {(item.quantity * item.rate).toLocaleString("id-ID")}
                      </div>
                      {invoiceData.items.length > 1 && (
                        <Button
                          onClick={() => removeItem(item.id)}
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <Button onClick={addItem} variant="outline" size="sm" className="border-blue-900 dark:border-blue-400 text-blue-900 dark:text-white hover:bg-blue-900 dark:hover:bg-blue-600 hover:text-white transition-colors cursor-pointer self-end">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
              <div className="border-t-2 border-blue-900 dark:border-blue-400 pt-6 mt-6 bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <div className="flex w-full justify-end">
                  <div className="flex justify-between gap-2 text-xl md:text-2xl font-bold text-blue-900 dark:text-white">
                    <p>
                      Total:
                    </p>
                    <span>IDR {subtotal.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Payment Details */}
          <Card className="p-4 md:p-8 bg-white dark:bg-gray-800 md:bg-white/80 md:backdrop-blur-sm border-blue-900/10 dark:border-blue-300/20 md:dark:bg-gray-800/90 shadow-sm md:shadow-lg md:hover:shadow-xl transition-shadow duration-200">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-blue-900 dark:text-white">Payment Details</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="bankName" className="text-gray-700 dark:text-gray-300 font-medium">Bank Name</Label>
                <Input
                  id="bankName"
                  value={invoiceData.bankName}
                  onChange={(e) => updateInvoiceData({ bankName: e.target.value })}
                  placeholder="Bank BCA"
                  className="border-gray-200 focus:border-blue-900 focus:ring-blue-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber" className="text-gray-700 dark:text-gray-300 font-medium">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={invoiceData.accountNumber}
                  onChange={(e) => updateInvoiceData({ accountNumber: e.target.value })}
                  placeholder="1234567890"
                  className="border-gray-200 focus:border-blue-900 focus:ring-blue-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountName" className="text-gray-700 dark:text-gray-300 font-medium">Account Name</Label>
                <Input
                  id="accountName"
                  value={invoiceData.accountName}
                  onChange={(e) => updateInvoiceData({ accountName: e.target.value })}
                  placeholder="John Doe"
                  className="border-gray-200 focus:border-blue-900 focus:ring-blue-900"
                />
              </div>
            </div>
          </Card>

          {/* Notes */}
          <Card className="p-4 md:p-8 bg-white dark:bg-gray-800 md:bg-white/80 md:backdrop-blur-sm border-blue-900/10 dark:border-blue-300/20 md:dark:bg-gray-800/90 shadow-sm md:shadow-lg md:hover:shadow-xl transition-shadow duration-200">
            <h2 className="text-xl md:text-2xl font-bold text-blue-900 dark:text-white">Additional Notes</h2>
            <Textarea
              value={invoiceData.notes}
              onChange={(e) => updateInvoiceData({ notes: e.target.value })}
              placeholder="Thank you for your business. Payment is due within 30 days."
              rows={4}
              className="border-gray-200 focus:border-blue-900 focus:ring-blue-900"
            />
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 justify-center sm:flex space-x-4 sm:justify-end">
            <Link href="/" className="cursor-pointer">
              <Button
                variant="outline"
                size="lg"
                className="px-6 w-full sm:w-auto md:px-8 py-3 border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </Button>
            </Link>
            <Button
              onClick={handlePreview}
              size="lg"
              className="px-6 w-full sm:w-auto md:px-10 py-3 bg-blue-900 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-xl transition-shadow duration-200 cursor-pointer"
            >
              <Eye className="mr-2 md:mr-3 h-4 md:h-5 w-4 md:w-5" />
              Preview
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
