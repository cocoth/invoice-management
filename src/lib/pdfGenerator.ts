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

  // Helper function to format currency with better handling for large numbers
  const formatCurrency = (amount: number) => {
    // Format with proper Indonesian locale
    const formatted = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
    
    // Remove the currency symbol for cleaner look in tables
    return formatted.replace('Rp', 'Rp ')
  }

  // Helper function to format currency for table display (compact)
  const formatCurrencyCompact = (amount: number) => {
    if (amount >= 1000000000) {
      const billions = (amount / 1000000000).toFixed(1)
      return `Rp ${billions}B`
    } else if (amount >= 1000000) {
      const millions = (amount / 1000000).toFixed(1)
      return `Rp ${millions}M`
    } else if (amount >= 1000) {
      const thousands = (amount / 1000).toFixed(0)
      return `Rp ${thousands}K`
    }
    return formatCurrency(amount)
  }

  // Helper function to get short format for large numbers
  const getShortFormat = (amount: number) => {
    if (amount >= 1000000000) {
      return `(≈${(amount / 1000000000).toFixed(1)}B)`
    } else if (amount >= 1000000) {
      return `(≈${(amount / 1000000).toFixed(1)}M)`
    } else if (amount >= 1000) {
      return `(≈${(amount / 1000).toFixed(0)}K)`
    }
    return ''
  }

  // Helper function to add text with word wrap
  const addWrappedText = (text: string, x: number, y: number, maxWidth: number, lineHeight = 5) => {
    const lines = pdf.splitTextToSize(text, maxWidth)
    pdf.text(lines, x, y)
    return y + lines.length * lineHeight
  }

  // Helper function to check if we need a new page
  const checkNewPage = (additionalHeight = 20) => {
    if (yPosition + additionalHeight > pageHeight - 40) {
      pdf.addPage()
      yPosition = margin
      return true
    }
    return false
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

  // Calculate available width for each section
  const sectionWidth = (contentWidth / 2) - 5

  // FROM details
  pdf.setFontSize(10)
  pdf.setTextColor(0, 0, 0)
  pdf.setFont("helvetica", "bold")
  
  // Handle long names with wrapping
  const fromNameLines = pdf.splitTextToSize(data.fromName, sectionWidth)
  pdf.text(fromNameLines, margin, yPosition)
  let fromYOffset = fromNameLines.length * 4

  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(9)
  pdf.setTextColor(60, 60, 60)
  
  // Email with proper wrapping
  const fromEmailLines = pdf.splitTextToSize(data.fromEmail, sectionWidth)
  pdf.text(fromEmailLines, margin, yPosition + fromYOffset)
  fromYOffset += fromEmailLines.length * 4
  
  // Phone
  pdf.text(data.fromPhone, margin, yPosition + fromYOffset)
  fromYOffset += 4

  // Address with proper wrapping
  const fromAddressLines = pdf.splitTextToSize(data.fromAddress, sectionWidth)
  pdf.text(fromAddressLines, margin, yPosition + fromYOffset)
  fromYOffset += fromAddressLines.length * 4

  // BILL TO details
  pdf.setFontSize(10)
  pdf.setTextColor(0, 0, 0)
  pdf.setFont("helvetica", "bold")
  
  // Handle long names with wrapping
  const toNameLines = pdf.splitTextToSize(data.toName, sectionWidth)
  pdf.text(toNameLines, margin + contentWidth / 2, yPosition)
  let toYOffset = toNameLines.length * 4

  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(9)
  pdf.setTextColor(60, 60, 60)
  
  // Email with proper wrapping
  const toEmailLines = pdf.splitTextToSize(data.toEmail, sectionWidth)
  pdf.text(toEmailLines, margin + contentWidth / 2, yPosition + toYOffset)
  toYOffset += toEmailLines.length * 4
  
  // Phone
  pdf.text(data.toPhone, margin + contentWidth / 2, yPosition + toYOffset)
  toYOffset += 4

  // Address with proper wrapping
  const toAddressLines = pdf.splitTextToSize(data.toAddress, sectionWidth)
  pdf.text(toAddressLines, margin + contentWidth / 2, yPosition + toYOffset)
  toYOffset += toAddressLines.length * 4

  // Use the maximum offset to ensure proper spacing
  yPosition += Math.max(fromYOffset, toYOffset) + 10

  // Items table header
  checkNewPage(30)
  
  pdf.setFillColor(28, 57, 142) // Navy blue background
  pdf.rect(margin, yPosition - 5, contentWidth, 10, "F")

  pdf.setFontSize(10)
  pdf.setFont("helvetica", "bold")
  pdf.setTextColor(255, 255, 255) // White text on navy blue background
  pdf.text("Description", margin + 2, yPosition)
  pdf.text("Qty", margin + contentWidth - 75, yPosition, { align: "center" })
  pdf.text("Rate", margin + contentWidth - 45, yPosition, { align: "right" })
  pdf.text("Amount", margin + contentWidth - 2, yPosition, { align: "right" })

  yPosition += 10

  // Items
  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(9)
  pdf.setTextColor(60, 60, 60)

  data.items.forEach((item, index) => {
    const amount = item.quantity * item.rate

    // Check if we need a new page
    checkNewPage(25)

    // Handle long descriptions with word wrap
    const descriptionWidth = contentWidth - 80
    const descriptionLines = pdf.splitTextToSize(item.description, descriptionWidth)
    const lineHeight = 5
    const itemHeight = Math.max(lineHeight * descriptionLines.length, 12)

    // Description (with word wrap)
    pdf.text(descriptionLines, margin + 2, yPosition)

    // Quantity (center aligned)
    pdf.setFontSize(9)
    pdf.text(item.quantity.toString(), margin + contentWidth - 75, yPosition, { align: "center" })

    // Rate - use compact format for very large numbers
    let rateDisplay = item.rate >= 10000000 ? formatCurrencyCompact(item.rate) : formatCurrency(item.rate)
    pdf.setFontSize(8)
    pdf.text(rateDisplay, margin + contentWidth - 45, yPosition, { align: "right" })

    // If using compact format, show full amount on next line
    if (item.rate >= 10000000) {
      pdf.setFontSize(6)
      pdf.setTextColor(100, 100, 100)
      pdf.text(formatCurrency(item.rate), margin + contentWidth - 45, yPosition + 4, { align: "right" })
      pdf.setTextColor(60, 60, 60)
    }

    // Amount - use compact format for very large numbers
    let amountDisplay = amount >= 10000000 ? formatCurrencyCompact(amount) : formatCurrency(amount)
    
    pdf.setFontSize(9)
    pdf.setFont("helvetica", "bold")
    pdf.setTextColor(28, 57, 142) // Navy blue for amount
    pdf.text(amountDisplay, margin + contentWidth - 2, yPosition, { align: "right" })
    
    // If using compact format, show full amount on next line
    if (amount >= 10000000) {
      pdf.setFontSize(7)
      pdf.setTextColor(100, 100, 100)
      pdf.text(formatCurrency(amount), margin + contentWidth - 2, yPosition + 4, { align: "right" })
    }

    yPosition += itemHeight + 3

    // Draw separator line
    if (index < data.items.length - 1) {
      pdf.setDrawColor(220, 220, 220)
      pdf.line(margin, yPosition - 1, pageWidth - margin, yPosition - 1)
      yPosition += 3
    }

    // Reset font properties for next item
    pdf.setFont("helvetica", "normal")
    pdf.setFontSize(9)
    pdf.setTextColor(60, 60, 60)
  })

  yPosition += 5

  // Total section
  checkNewPage(20)
  
  pdf.setDrawColor(28, 57, 142) // Navy blue line
  pdf.setLineWidth(1)
  pdf.line(margin + contentWidth - 80, yPosition, pageWidth - margin, yPosition)

  yPosition += 7

  // Total amount with better formatting for large numbers
  let totalDisplay = total >= 100000000 ? formatCurrencyCompact(total) : formatCurrency(total)

  pdf.setFontSize(14)
  pdf.setFont("helvetica", "bold")
  pdf.setTextColor(28, 57, 142) // Navy blue color for total
  pdf.text("TOTAL", margin + contentWidth - 80, yPosition)
  
  // Main total amount - use compact format for very large numbers
  pdf.setFontSize(16)
  pdf.text(totalDisplay, pageWidth - margin, yPosition, { align: "right" })
  
  // If using compact format, show full amount on next line in readable font
  if (total >= 100000000) {
    pdf.setFontSize(9)
    pdf.setTextColor(100, 100, 100)
    pdf.text(formatCurrency(total), pageWidth - margin, yPosition + 5, { align: "right" })
  }

  yPosition += 18

  // Payment Details
  if (data.bankName) {
    // Check if we need a new page
    checkNewPage(35)

    pdf.setFillColor(238, 242, 255) // Light navy blue background
    pdf.roundedRect(margin, yPosition - 5, contentWidth, 30, 2, 2, "F")

    pdf.setFontSize(11)
    pdf.setFont("helvetica", "bold")
    pdf.setTextColor(28, 57, 142) // Navy blue color for header
    pdf.text("Payment Details", margin + 3, yPosition)

    yPosition += 8

    // Calculate column width
    const colWidth = contentWidth / 3

    pdf.setFontSize(8)
    pdf.setFont("helvetica", "normal")
    pdf.setTextColor(100, 100, 100)
    pdf.text("Bank Name", margin + 3, yPosition)
    pdf.text("Account Number", margin + colWidth + 3, yPosition)
    pdf.text("Account Name", margin + (2 * colWidth) + 3, yPosition)

    yPosition += 6

    pdf.setFontSize(9)
    pdf.setFont("helvetica", "bold")
    pdf.setTextColor(0, 0, 0)
    
    // Handle long bank names with wrapping
    const bankNameLines = pdf.splitTextToSize(data.bankName, colWidth - 6)
    pdf.text(bankNameLines, margin + 3, yPosition)
    
    // Account number (should fit in one line)
    pdf.text(data.accountNumber, margin + colWidth + 3, yPosition)
    
    // Handle long account names with wrapping
    const accountNameLines = pdf.splitTextToSize(data.accountName, colWidth - 6)
    pdf.text(accountNameLines, margin + (2 * colWidth) + 3, yPosition)

    // Calculate height needed for wrapped text
    const maxLines = Math.max(bankNameLines.length, accountNameLines.length)
    yPosition += (maxLines * 4) + 10
  }

  // Notes
  if (data.notes) {
    // Check if we need a new page
    checkNewPage(25)

    pdf.setDrawColor(200, 200, 200)
    pdf.line(margin, yPosition, pageWidth - margin, yPosition)

    yPosition += 8

    pdf.setFontSize(11)
    pdf.setFont("helvetica", "bold")
    pdf.setTextColor(28, 57, 142) // Navy blue color for notes header
    pdf.text("Notes", margin, yPosition)

    yPosition += 7

    pdf.setFontSize(9)
    pdf.setFont("helvetica", "normal")
    pdf.setTextColor(60, 60, 60)
    
    // Handle long notes with proper wrapping and page breaks
    const notesLines = pdf.splitTextToSize(data.notes, contentWidth)
    
    // Process notes line by line to handle page breaks
    notesLines.forEach((line: string, index: number) => {
      checkNewPage(8)
      pdf.text(line, margin, yPosition)
      yPosition += 5
    })

    yPosition += 5
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
