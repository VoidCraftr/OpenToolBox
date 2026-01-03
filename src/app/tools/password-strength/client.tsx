"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Eye, EyeOff, ShieldCheck, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PasswordStrength() {
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const calculateStrength = (pwd: string) => {
        let score = 0
        if (!pwd) return 0

        if (pwd.length > 8) score += 20
        if (pwd.length > 12) score += 20
        if (/[A-Z]/.test(pwd)) score += 15
        if (/[a-z]/.test(pwd)) score += 15
        if (/[0-9]/.test(pwd)) score += 15
        if (/[^A-Za-z0-9]/.test(pwd)) score += 15

        return Math.min(100, score)
    }

    const estimateCrackTime = (pwd: string) => {
        if (!pwd) return "Instant"
        // Simple mock estimation based on entropy length
        const length = pwd.length
        const hasUpper = /[A-Z]/.test(pwd)
        const hasLower = /[a-z]/.test(pwd)
        const hasNumber = /[0-9]/.test(pwd)
        const hasSpecial = /[^A-Za-z0-9]/.test(pwd)

        const poolSize = (hasLower ? 26 : 0) + (hasUpper ? 26 : 0) + (hasNumber ? 10 : 0) + (hasSpecial ? 33 : 0)
        const entropy = Math.log2(Math.pow(poolSize || 1, length))

        if (entropy < 28) return "Instant"
        if (entropy < 36) return "A few seconds"
        if (entropy < 60) return "Few minutes to Days"
        if (entropy < 80) return "Years"
        if (entropy < 120) return "Centuries"
        return "Millennia"
    }

    const strength = calculateStrength(password)
    const crackTime = estimateCrackTime(password)

    const getStrengthLabel = (s: number) => {
        if (s < 40) return "Weak"
        if (s < 70) return "Moderate"
        if (s < 90) return "Strong"
        return "Very Strong"
    }

    const getStrengthColor = (s: number) => {
        if (s < 40) return "bg-red-500"
        if (s < 70) return "bg-orange-500"
        if (s < 90) return "bg-green-500"
        return "bg-emerald-600"
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Password Strength Checker</h1>
                <p className="text-muted-foreground">
                    Test the strength of your password and see how long it would take to crack.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Test Password</CardTitle>
                    <CardDescription>
                        Enter a password below. We check it locally in your browser; it is never sent to any server.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password..."
                            className="pr-10 text-lg py-6"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </Button>
                    </div>

                    {password && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                            <div className="space-y-2">
                                <div className="flex justify-between font-medium">
                                    <span>Strength: {getStrengthLabel(strength)}</span>
                                    <span>Time to crack: {crackTime}</span>
                                </div>
                                <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-500 ease-out ${getStrengthColor(strength)}`}
                                        style={{ width: `${strength}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 text-sm pt-2">
                                <div className="flex items-center gap-2">
                                    {password.length >= 8 ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-500" />}
                                    <span>At least 8 characters</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/[A-Z]/.test(password) ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-muted-foreground" />}
                                    <span>Uppercase Letter</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/[a-z]/.test(password) ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-muted-foreground" />}
                                    <span>Lowercase Letter</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/[0-9]/.test(password) ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-muted-foreground" />}
                                    <span>Number</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {/[^A-Za-z0-9]/.test(password) ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-muted-foreground" />}
                                    <span>Special Character</span>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
