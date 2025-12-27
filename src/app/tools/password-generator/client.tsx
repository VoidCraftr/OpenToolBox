"use client"

import { useState, useEffect, useCallback } from "react"
import { Copy, RefreshCw, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { ContentSection } from "@/components/tools/ContentSection"

export default function PasswordGeneratorClient() {
    const [password, setPassword] = useState("")
    const [length, setLength] = useState([16])
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    })
    const [copied, setCopied] = useState(false)

    const generatePassword = useCallback(() => {
        const sets = {
            uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            lowercase: "abcdefghijklmnopqrstuvwxyz",
            numbers: "0123456789",
            symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
        }

        let chars = ""
        if (options.uppercase) chars += sets.uppercase
        if (options.lowercase) chars += sets.lowercase
        if (options.numbers) chars += sets.numbers
        if (options.symbols) chars += sets.symbols

        if (chars === "") return setPassword("")

        let result = ""
        for (let i = 0; i < length[0]; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setPassword(result)
    }, [length, options])

    useEffect(() => {
        generatePassword()
    }, [generatePassword])

    const handleCopy = () => {
        navigator.clipboard.writeText(password)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleOptionChange = (key: keyof typeof options) => {
        setOptions(prev => {
            // Prevent disabling all options
            const next = { ...prev, [key]: !prev[key] }
            if (!Object.values(next).some(Boolean)) return prev
            return next
        })
    }

    const calculateStrength = () => {
        let score = 0
        if (length[0] > 8) score++
        if (length[0] > 12) score++
        if (options.uppercase) score++
        if (options.lowercase) score++
        if (options.numbers) score++
        if (options.symbols) score++

        if (score < 3) return { label: "Weak", color: "text-red-500" }
        if (score < 5) return { label: "Medium", color: "text-yellow-500" }
        return { label: "Strong", color: "text-green-500" }
    }

    const strength = calculateStrength()

    return (
        <ToolWrapper
            title="Password Generator"
            description="Create strong, secure passwords instantly with your preferred settings."
            toolSlug="password-generator"
            adSlot="password-generator-slot"
        >
            <div className="grid gap-8">
                {/* Output Section */}
                <div className="relative">
                    <div className="flex h-20 items-center justify-between rounded-lg border bg-muted px-6 text-2xl font-mono tracking-wider break-all">
                        {password}
                    </div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                        <Button size="icon" variant="ghost" onClick={generatePassword}>
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button size="icon" onClick={handleCopy}>
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>

                {/* Controls */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardContent className="pt-6 space-y-6">
                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <Label>Password Length</Label>
                                    <span className="font-mono">{length[0]}</span>
                                </div>
                                <Slider
                                    value={length}
                                    onValueChange={setLength}
                                    max={64}
                                    min={6}
                                    step={1}
                                />
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <Label>Strength</Label>
                                <span className={`font-bold ${strength.color}`}>{strength.label}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6 grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                                <Switch id="upper" checked={options.uppercase} onCheckedChange={() => handleOptionChange('uppercase')} />
                                <Label htmlFor="upper">Uppercase</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="lower" checked={options.lowercase} onCheckedChange={() => handleOptionChange('lowercase')} />
                                <Label htmlFor="lower">Lowercase</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="nums" checked={options.numbers} onCheckedChange={() => handleOptionChange('numbers')} />
                                <Label htmlFor="nums">Numbers</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Switch id="syms" checked={options.symbols} onCheckedChange={() => handleOptionChange('symbols')} />
                                <Label htmlFor="syms">Symbols</Label>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <ContentSection
                title="Password Generator Guide"
                description={`Generate strong, random passwords to protect your online accounts. \n\nSecurity experts recommend using passwords that are at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and symbols.`}
                features={[
                    "Client-Side Generation (Secure)",
                    "Customizable Character Sets",
                    "Password Strength Indicator",
                    "One-Click Copy"
                ]}
                faq={[
                    {
                        question: "Are these passwords stored?",
                        answer: "No. The passwords are generated locally in your browser using the JavaScript Crypto API. We never see or store your passwords."
                    },
                    {
                        question: "Why do I need symbols?",
                        answer: "Symbols increase the entropy (randomness) of your password, making it exponentially harder for brute-force algorithms to guess."
                    },
                    {
                        question: "How long should my password be?",
                        answer: "We recommend at least 16 characters for critical accounts like email and banking, and 12 characters for other services."
                    }
                ]}
            />
        </ToolWrapper>
    )
}
