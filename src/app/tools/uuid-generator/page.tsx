"use client"

import { useState } from "react"
import { Copy, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { ToolWrapper } from "@/components/tools/ToolWrapper"

export default function UuidGeneratorPage() {
    const [count, setCount] = useState([10])
    const [uuids, setUuids] = useState("")

    const generate = () => {
        const arr = []
        for (let i = 0; i < count[0]; i++) {
            arr.push(crypto.randomUUID())
        }
        setUuids(arr.join("\n"))
    }

    return (
        <ToolWrapper
            title="UUID Generator"
            description="Generate random version 4 UUIDs in bulk."
            adSlot="uuid-generator-slot"
        >
            <div className="grid gap-6">
                <div className="flex items-end gap-4">
                    <div className="flex-1 space-y-4">
                        <div className="flex justify-between">
                            <Label>Quantity</Label>
                            <span className="font-mono">{count[0]}</span>
                        </div>
                        <Slider value={count} onValueChange={setCount} min={1} max={100} step={1} />
                    </div>
                    <Button size="lg" onClick={generate}>
                        <RefreshCw className="mr-2 h-4 w-4" /> Generate
                    </Button>
                </div>

                <div className="relative">
                    <Textarea
                        value={uuids}
                        readOnly
                        className="font-mono min-h-[400px] text-sm leading-7"
                        placeholder="Click Generate to create UUIDs..."
                    />
                    <Button
                        size="icon"
                        variant="secondary"
                        className="absolute right-4 top-4"
                        onClick={() => navigator.clipboard.writeText(uuids)}
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </ToolWrapper>
    )
}
