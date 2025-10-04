"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Plus, Trash2, Download } from "lucide-react"
import Link from "next/link"
import InvoicePreview from "@/components/custom/invoice/InvoicePreview"

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
}

interface InvoiceData {
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  fromName: string
  fromEmail: string
  fromPhone: string
  fromAddress: string
  toName: string
  toEmail: string
  toPhone: string
  toAddress: string
  items: InvoiceItem[]
  notes: string
  bankName: string
  accountNumber: string
  accountName: string
}

export default function InvoiceCreator() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    invoiceDate: new Date(Date.now()).toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
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

  const [showPreview, setShowPreview] = useState(false)

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { id: Date.now().toString(), description: "", quantity: 1, rate: 0 }],
    })
  }

  const removeItem = (id: string) => {
    if (invoiceData.items.length > 1) {
      setInvoiceData({
        ...invoiceData,
        items: invoiceData.items.filter((item) => item.id !== id),
      })
    }
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    })
  }

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((sum, item) => sum + item.quantity * item.rate, 0)
  }

  const handlePreview = () => {
    setShowPreview(true)
  }

  if (showPreview) {
    return <InvoicePreview data={invoiceData} onBack={() => setShowPreview(false)} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 h-20">
          <div className="flex items-center justify-between h-full">
            <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
            <Button onClick={handlePreview} className="cursor-pointer">
              <Download className="mr-2 h-4 w-4" />
              Preview & Export
            </Button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Invoice</h1>
          <p className="text-muted-foreground">Fill in the details below to generate your professional invoice</p>
        </div>

        <div className="space-y-6">
          {/* Invoice Details */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input
                  id="invoiceNumber"
                  value={invoiceData.invoiceNumber}
                  onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
                  placeholder="INV-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoiceDate">Invoice Date</Label>
                <Input
                  id="invoiceDate"
                  type="date"
                  value={invoiceData.invoiceDate}
                  onChange={(e) => setInvoiceData({ ...invoiceData, invoiceDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={invoiceData.dueDate}
                  onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                />
              </div>
            </div>
          </Card>

          {/* From (Your Details) */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">From (Your Details)</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fromName">Your Name / Business Name</Label>
                <Input
                  id="fromName"
                  value={invoiceData.fromName}
                  onChange={(e) => setInvoiceData({ ...invoiceData, fromName: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromEmail">Email</Label>
                <Input
                  id="fromEmail"
                  type="email"
                  value={invoiceData.fromEmail}
                  onChange={(e) => setInvoiceData({ ...invoiceData, fromEmail: e.target.value })}
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromPhone">Phone</Label>
                <Input
                  id="fromPhone"
                  value={invoiceData.fromPhone}
                  onChange={(e) => setInvoiceData({ ...invoiceData, fromPhone: e.target.value })}
                  placeholder="+62 812 3456 7890"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fromAddress">Address</Label>
                <Input
                  id="fromAddress"
                  value={invoiceData.fromAddress}
                  onChange={(e) => setInvoiceData({ ...invoiceData, fromAddress: e.target.value })}
                  placeholder="Jakarta, Indonesia"
                />
              </div>
            </div>
          </Card>

          {/* To (Client Details) */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Bill To (Client Details)</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="toName">Client Name / Company</Label>
                <Input
                  id="toName"
                  value={invoiceData.toName}
                  onChange={(e) => setInvoiceData({ ...invoiceData, toName: e.target.value })}
                  placeholder="Client Company"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="toEmail">Email</Label>
                <Input
                  id="toEmail"
                  type="email"
                  value={invoiceData.toEmail}
                  onChange={(e) => setInvoiceData({ ...invoiceData, toEmail: e.target.value })}
                  placeholder="client@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="toPhone">Phone</Label>
                <Input
                  id="toPhone"
                  value={invoiceData.toPhone}
                  onChange={(e) => setInvoiceData({ ...invoiceData, toPhone: e.target.value })}
                  placeholder="+62 812 9876 5432"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="toAddress">Address</Label>
                <Input
                  id="toAddress"
                  value={invoiceData.toAddress}
                  onChange={(e) => setInvoiceData({ ...invoiceData, toAddress: e.target.value })}
                  placeholder="Bandung, Indonesia"
                />
              </div>
            </div>
          </Card>

          {/* Items/Services */}
          <Card className="p-6 max-h-[calc(100dvh-6rem)] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Services / Items</h2>
            </div>
            <div className="space-y-4">
              {invoiceData.items.map((item, index) => (
                <div key={item.id} className="flex gap-4 items-start">
                  <div className="flex-1 grid md:grid-cols-[2fr,1fr,1fr,auto] gap-4 items-end">
                    <div className="space-y-2">
                      <Label htmlFor={`desc-${item.id}`}>Description</Label>
                      <Input
                        id={`desc-${item.id}`}
                        value={item.description}
                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                        placeholder="Web Development Service"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`qty-${item.id}`}>Quantity</Label>
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
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`rate-${item.id}`}>Rate (IDR)</Label>
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
                        className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium min-w-[120px] text-right">
                        IDR {(item.quantity * item.rate).toLocaleString("id-ID")}
                      </div>
                      {invoiceData.items.length > 1 && (
                        <Button
                          onClick={() => removeItem(item.id)}
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-end">
                  <div className="w-64">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total:</span>
                      <span>IDR {calculateSubtotal().toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section className="flex w-full justify-end">
              <Button
                onClick={addItem}
                variant="outline"
                size="sm"
                className="cursor-pointer"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </section>
          </Card>

          {/* Payment Details */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  value={invoiceData.bankName}
                  onChange={(e) => setInvoiceData({ ...invoiceData, bankName: e.target.value })}
                  placeholder="Bank BCA"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={invoiceData.accountNumber}
                  onChange={(e) => setInvoiceData({ ...invoiceData, accountNumber: e.target.value })}
                  placeholder="1234567890"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountName">Account Name</Label>
                <Input
                  id="accountName"
                  value={invoiceData.accountName}
                  onChange={(e) => setInvoiceData({ ...invoiceData, accountName: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
            </div>
          </Card>

          {/* Notes */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Additional Notes</h2>
            <Textarea
              value={invoiceData.notes}
              onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
              placeholder="Thank you for your business. Payment is due within 30 days."
              rows={4}
            />
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Link href="/">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button onClick={handlePreview} size="lg" className="cursor-pointer">
              <Download className="mr-2 h-4 w-4" />
              Preview & Export PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
