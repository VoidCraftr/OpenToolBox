"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, X, FileUp, Download, ArrowUp, ArrowDown } from "lucide-react"
import jsPDF from "jspdf"

export default function ImageToPdf() {
    const [images, setImages] = useState<{ id: string, src: string, file: File }[]>([])
    const [isGenerating, setIsGenerating] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newImages = Array.from(e.target.files).map(file => ({
                id: Math.random().toString(36).substr(2, 9),
                src: URL.createObjectURL(file),
                file
            }))
            setImages(prev => [...prev, ...newImages])
        }
    }

    const removeImage = (id: string) => {
        setImages(prev => prev.filter(img => img.id !== id))
    }

    const moveImage = (index: number, direction: 'up' | 'down') => {
        if (direction === 'up' && index > 0) {
            const newImages = [...images]
            const temp = newImages[index]
            newImages[index] = newImages[index - 1]
            newImages[index - 1] = temp
            setImages(newImages)
        } else if (direction === 'down' && index < images.length - 1) {
            const newImages = [...images]
            const temp = newImages[index]
            newImages[index] = newImages[index + 1]
            newImages[index + 1] = temp
            setImages(newImages)
        }
    }

    const generatePdf = async () => {
        if (images.length === 0) return

        setIsGenerating(true)
        const pdf = new jsPDF()

        for (let i = 0; i < images.length; i++) {
            const img = images[i]
            const imgProps = await getImageProperties(img.src)

            // Calculate dimensions to fit A4 page
            const pageWidth = pdf.internal.pageSize.getWidth()
            const pageHeight = pdf.internal.pageSize.getHeight()
            const ratio = Math.min(pageWidth / imgProps.width, pageHeight / imgProps.height)
            const imgWidth = imgProps.width * ratio
            const imgHeight = imgProps.height * ratio
            const x = (pageWidth - imgWidth) / 2
            const y = (pageHeight - imgHeight) / 2

            if (i > 0) pdf.addPage()
            pdf.addImage(img.src, 'JPEG', x, y, imgWidth, imgHeight)
        }

        pdf.save("converted-images.pdf")
        setIsGenerating(false)
    }

    const getImageProperties = (src: string): Promise<{ width: number, height: number }> => {
        return new Promise((resolve) => {
            const img = new Image()
            img.onload = () => {
                resolve({ width: img.width, height: img.height })
            }
            img.src = src
        })
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Image to PDF</h1>
                <p className="text-muted-foreground">
                    Convert multiple images (JPG, PNG) into a single PDF document.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <div>Upload Images</div>
                        <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                            <Upload className="w-4 h-4 mr-2" />
                            Add Images
                        </Button>
                    </CardTitle>
                    <CardDescription>
                        Drag and drop supported. Reorder images before generating PDF.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/png, image/jpeg, image/jpg"
                        multiple
                        onChange={handleFileUpload}
                    />

                    {images.length === 0 ? (
                        <div
                            className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 cursor-pointer transition-colors"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <FileUp className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                            <h3 className="text-lg font-medium">No images uploaded</h3>
                            <p className="text-sm text-muted-foreground mt-2">Click to select files</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {images.map((img, index) => (
                                <div key={img.id} className="relative group border rounded-md overflow-hidden bg-muted aspect-[3/4]">
                                    <img src={img.src} alt="Preview" className="w-full h-full object-contain" />
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button size="icon" variant="secondary" className="h-6 w-6" onClick={() => removeImage(img.id)}>
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </div>
                                    <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button size="icon" variant="secondary" className="h-6 w-6" disabled={index === 0} onClick={() => moveImage(index, 'up')}>
                                            <ArrowUp className="w-3 h-3" />
                                        </Button>
                                        <Button size="icon" variant="secondary" className="h-6 w-6" disabled={index === images.length - 1} onClick={() => moveImage(index, 'down')}>
                                            <ArrowDown className="w-3 h-3" />
                                        </Button>
                                    </div>
                                    <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded">
                                        Page {index + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex justify-end pt-4 border-t">
                        <Button
                            size="lg"
                            disabled={images.length === 0 || isGenerating}
                            onClick={generatePdf}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            {isGenerating ? "Generating..." : "Generate PDF"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
