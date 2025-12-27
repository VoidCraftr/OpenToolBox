"use client"

import { useState } from "react"
import { jwtDecode } from "jwt-decode"
import { AlertCircle, CheckCircle2 } from "lucide-react"

import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ToolWrapper } from "@/components/tools/ToolWrapper"

export default function JwtDecoderPage() {
    const [token, setToken] = useState("")
    const [header, setHeader] = useState<any>(null)
    const [payload, setPayload] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)

    const handleDecode = (val: string) => {
        setToken(val)
        if (!val.trim()) {
            setHeader(null)
            setPayload(null)
            setError(null)
            return
        }

        try {
            const decodedHeader = jwtDecode(val, { header: true })
            const decodedPayload = jwtDecode(val)

            setHeader(decodedHeader)
            setPayload(decodedPayload)
            setError(null)
        } catch (err) {
            setError("Invalid JWT Token")
            setHeader(null)
            setPayload(null)
        }
    }

    return (
        <ToolWrapper
            title="JWT Decoder"
            description="Decode JSON Web Tokens to view their header and payload. Client-side only."
            adSlot="jwt-decoder-slot"
        >
            <div className="grid gap-6">
                <div className="space-y-2">
                    <Textarea
                        placeholder="Paste your JWT token here (eyJ...)"
                        className="font-mono min-h-[120px] text-sm break-all"
                        value={token}
                        onChange={(e) => handleDecode(e.target.value)}
                    />
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {!error && payload && (
                        <Alert className="text-green-600 border-green-200 bg-green-50 dark:bg-green-900/10 dark:text-green-400 dark:border-green-900">
                            <CheckCircle2 className="h-4 w-4" />
                            <AlertTitle>Valid Token Structure</AlertTitle>
                            <AlertDescription>Successfully decoded.</AlertDescription>
                        </Alert>
                    )}
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Header</h3>
                        <pre className="bg-muted p-4 rounded-lg overflow-auto text-xs font-mono min-h-[200px] border">
                            {header ? JSON.stringify(header, null, 2) : "// Header will appear here"}
                        </pre>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Payload</h3>
                        <pre className="bg-muted p-4 rounded-lg overflow-auto text-xs font-mono min-h-[200px] border">
                            {payload ? JSON.stringify(payload, null, 2) : "// Payload will appear here"}
                        </pre>
                    </div>
                </div>
            </div>
        </ToolWrapper>
    )
}
