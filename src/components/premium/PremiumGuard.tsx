"use client"

import { Lock } from "lucide-react"
import { useAuth } from "@/components/premium/AuthProvider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function PremiumGuard({ children }: { children: React.ReactNode }) {
    const { isPro } = useAuth()

    if (isPro) return <>{children}</>

    return (
        <Card className="relative overflow-hidden border-dashed">
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px]" />
            <CardContent className="flex flex-col items-center justify-center p-12 text-center relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Pro Feature</h3>
                <p className="text-muted-foreground my-2 max-w-sm">
                    This feature is available exclusively to Pro users. Upgrade now to unlock unlimited access.
                </p>
                <Button className="mt-4">Upgrade to Pro</Button>
            </CardContent>
        </Card>
    )
}
