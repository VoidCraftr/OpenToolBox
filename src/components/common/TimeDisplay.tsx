"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

export function TimeDisplay() {
    const [time, setTime] = useState<string | null>(null)

    useEffect(() => {
        const updateTime = () => {
            // Use browser's locale and timezone
            setTime(new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            }))
        }

        updateTime()
        const timer = setInterval(updateTime, 1000) // Update every second to be accurate, though we only show minutes
        return () => clearInterval(timer)
    }, [])

    if (!time) return null // Don't render on server to avoid hydration mismatch

    return (
        <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/80 bg-muted/30 px-2.5 py-1 rounded-md border border-border/50">
            <Clock className="h-3 w-3" />
            <span>{time}</span>
        </div>
    )
}
