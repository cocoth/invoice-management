import jsPDF from "jspdf"

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

export async function generateInvoicePDF(data: InvoiceData, total: number) {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // Add PDF metadata
  pdf.setProperties({
    title: `Invoice ${data.invoiceNumber}`,
    subject: `Professional Invoice for ${data.toName}`,
    author: "createyourinvoice.vercel.app",
    keywords: "invoice, billing, professional services, programming, pentesting",
    creator: "Invoic - Professional Invoice Management"
  })

  const pageWidth = 210
  const pageHeight = 297
  const margin = 20
  const contentWidth = pageWidth - 2 * margin
  let yPosition = margin

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })
  }

  // Helper function to add text with word wrap
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight = 5) => {
    const lines = pdf.splitTextToSize(text, maxWidth)
    pdf.text(lines, x, y)
    return y + lines.length * lineHeight
  }

  // Set default font
  pdf.setFont("helvetica")

  // Header - INVOICE title and number
  pdf.setFontSize(24)
  pdf.setFont("helvetica", "bold")
  pdf.setTextColor(28, 57, 142) // Navy blue color (#1c398e)
  pdf.text("INVOICE", margin, yPosition)

  pdf.setFontSize(10)
  pdf.setFont("helvetica", "normal")
  pdf.setTextColor(100, 100, 100)
  pdf.text(`#${data.invoiceNumber}`, margin, yPosition + 7)

  // Invoice dates (right aligned)
  pdf.setFontSize(9)
  pdf.setTextColor(100, 100, 100)
  pdf.text("Invoice Date", pageWidth - margin, yPosition, { align: "right" })
  pdf.setTextColor(25, 55, 109) // Navy blue color
  pdf.setFont("helvetica", "bold")
  pdf.text(formatDate(data.invoiceDate), pageWidth - margin, yPosition + 5, { align: "right" })

  pdf.setFont("helvetica", "normal")
  pdf.setTextColor(100, 100, 100)
  pdf.text("Due Date", pageWidth - margin, yPosition + 12, { align: "right" })
  pdf.setTextColor(25, 55, 109) // Navy blue color
  pdf.setFont("helvetica", "bold")
  pdf.text(formatDate(data.dueDate), pageWidth - margin, yPosition + 17, { align: "right" })

  yPosition += 35

  // FROM and BILL TO sections
  pdf.setFontSize(9)
  pdf.setTextColor(100, 100, 100)
  pdf.setFont("helvetica", "bold")
  pdf.text("FROM", margin, yPosition)
  pdf.text("BILL TO", margin + contentWidth / 2, yPosition)

  yPosition += 6

  // FROM details
  pdf.setFontSize(10)
  pdf.setTextColor(0, 0, 0)
  pdf.setFont("helvetica", "bold")
  pdf.text(data.fromName, margin, yPosition)

  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(9)
  pdf.setTextColor(60, 60, 60)
  pdf.text(data.fromEmail, margin, yPosition + 5)
  pdf.text(data.fromPhone, margin, yPosition + 10)

  const fromAddressLines = pdf.splitTextToSize(data.fromAddress, contentWidth / 2 - 10)
  pdf.text(fromAddressLines, margin, yPosition + 15)

  // BILL TO details
  pdf.setFontSize(10)
  pdf.setTextColor(0, 0, 0)
  pdf.setFont("helvetica", "bold")
  pdf.text(data.toName, margin + contentWidth / 2, yPosition)

  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(9)
  pdf.setTextColor(60, 60, 60)
  pdf.text(data.toEmail, margin + contentWidth / 2, yPosition + 5)
  pdf.text(data.toPhone, margin + contentWidth / 2, yPosition + 10)

  const toAddressLines = pdf.splitTextToSize(data.toAddress, contentWidth / 2 - 10)
  pdf.text(toAddressLines, margin + contentWidth / 2, yPosition + 15)

  yPosition += 40

  // Items table header
  pdf.setFillColor(28, 57, 142) // Navy blue background
  pdf.rect(margin, yPosition - 5, contentWidth, 8, "F")

  pdf.setFontSize(9)
  pdf.setFont("helvetica", "bold")
  pdf.setTextColor(255, 255, 255) // White text on navy blue background
  pdf.text("Description", margin + 2, yPosition)
  pdf.text("Qty", margin + contentWidth - 60, yPosition, { align: "right" })
  pdf.text("Rate", margin + contentWidth - 35, yPosition, { align: "right" })
  pdf.text("Amount", margin + contentWidth - 2, yPosition, { align: "right" })

  yPosition += 8

  // Items
  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(9)
  pdf.setTextColor(60, 60, 60)

  data.items.forEach((item, index) => {
    const amount = item.quantity * item.rate

    // Check if we need a new page
    if (yPosition > pageHeight - 60) {
      pdf.addPage()
      yPosition = margin
    }

    pdf.text(item.description, margin + 2, yPosition)
    pdf.text(item.quantity.toString(), margin + contentWidth - 60, yPosition, { align: "right" })
    pdf.text(`IDR ${item.rate.toLocaleString("id-ID")}`, margin + contentWidth - 35, yPosition, { align: "right" })
    pdf.text(`IDR ${amount.toLocaleString("id-ID")}`, margin + contentWidth - 2, yPosition, { align: "right" })

    yPosition += 7

    // Draw separator line
    if (index < data.items.length - 1) {
      pdf.setDrawColor(220, 220, 220)
      pdf.line(margin, yPosition - 2, pageWidth - margin, yPosition - 2)
    }
  })

  yPosition += 5

  // Total
  pdf.setDrawColor(28, 57, 142) // Navy blue line
  pdf.setLineWidth(1)
  pdf.line(margin + contentWidth - 65, yPosition, pageWidth - margin, yPosition)

  yPosition += 7

  pdf.setFontSize(11)
  pdf.setFont("helvetica", "bold")
  pdf.setTextColor(28, 57, 142) // Navy blue color for total
  pdf.text("TOTAL", margin + contentWidth - 65, yPosition)
  pdf.text(`IDR ${total.toLocaleString("id-ID")}`, pageWidth - margin, yPosition, { align: "right" })

  yPosition += 15

  // Payment Details
  if (data.bankName) {
    // Check if we need a new page
    if (yPosition > pageHeight - 50) {
      pdf.addPage()
      yPosition = margin
    }

    pdf.setFillColor(238, 242, 255) // Light navy blue background
    pdf.roundedRect(margin, yPosition - 5, contentWidth, 25, 2, 2, "F")

    pdf.setFontSize(10)
    pdf.setFont("helvetica", "bold")
    pdf.setTextColor(28, 57, 142) // Navy blue color for header
    pdf.text("Payment Details", margin + 3, yPosition)

    yPosition += 7

    pdf.setFontSize(8)
    pdf.setFont("helvetica", "normal")
    pdf.setTextColor(100, 100, 100)
    pdf.text("Bank Name", margin + 3, yPosition)
    pdf.text("Account Number", margin + contentWidth / 3 + 3, yPosition)
    pdf.text("Account Name", margin + (2 * contentWidth) / 3 + 3, yPosition)

    yPosition += 5

    pdf.setFontSize(9)
    pdf.setFont("helvetica", "bold")
    pdf.setTextColor(0, 0, 0)
    pdf.text(data.bankName, margin + 3, yPosition)
    pdf.text(data.accountNumber, margin + contentWidth / 3 + 3, yPosition)
    pdf.text(data.accountName, margin + (2 * contentWidth) / 3 + 3, yPosition)

    yPosition += 15
  }

  // Notes
  if (data.notes) {
    // Check if we need a new page
    if (yPosition > pageHeight - 40) {
      pdf.addPage()
      yPosition = margin
    }

    pdf.setDrawColor(200, 200, 200)
    pdf.line(margin, yPosition, pageWidth - margin, yPosition)

    yPosition += 8

    pdf.setFontSize(10)
    pdf.setFont("helvetica", "bold")
    pdf.setTextColor(28, 57, 142) // Navy blue color for notes header
    pdf.text("Notes", margin, yPosition)

    yPosition += 6

    pdf.setFontSize(9)
    pdf.setFont("helvetica", "normal")
    pdf.setTextColor(60, 60, 60)
    const notesLines = pdf.splitTextToSize(data.notes, contentWidth)
    pdf.text(notesLines, margin, yPosition)
  }

  // Add copyright footer at the bottom of each page
  const addCopyrightFooter = (pageNum?: number) => {
    const footerY = pageHeight - 15

    // Copyright text
    pdf.setFontSize(8)
    pdf.setFont("helvetica", "normal")
    pdf.setTextColor(120, 120, 120)

    // Left side - Copyright notice
    pdf.text(`© ${new Date().getFullYear()} Invoic - Professional Invoice Management`, margin, footerY)

    // Right side - Generated by link text
    const linkUrl = "https://invoicme.vercel.app"
    const prefixText = "Invoice generated by "
    const brandText = "Invoic"

    // Calculate total text width to position it correctly on the right
    const totalTextWidth = (pdf.getStringUnitWidth(prefixText + brandText) * 8) / pdf.internal.scaleFactor
    const linkX = pageWidth - margin - totalTextWidth

    // Add prefix text in gray
    pdf.setTextColor(120, 120, 120)
    pdf.text(prefixText, linkX, footerY)

    // Calculate position for brand text
    const prefixWidth = (pdf.getStringUnitWidth(prefixText) * 8) / pdf.internal.scaleFactor
    const brandX = linkX + prefixWidth

    // Add brand text in navy blue as clickable link
    pdf.setTextColor(25, 55, 109) // Navy blue color
    pdf.textWithLink(brandText, brandX, footerY, { url: linkUrl })

    // Add page number if specified
    if (pageNum !== undefined) {
      const pageText = `Page ${pageNum}`
      const pageTextWidth = pdf.getStringUnitWidth(pageText) * 8 / pdf.internal.scaleFactor
      pdf.text(pageText, (pageWidth - pageTextWidth) / 2, footerY)
    }
  }

  // Add footer to all pages
  const totalPages = pdf.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i)
    addCopyrightFooter(i)
  }

  // Save the PDF
  pdf.save(`Invoice-${data.invoiceNumber}.pdf`)
}
