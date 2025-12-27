"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Check, Copy, Twitter, Github, Linkedin, Instagram, Facebook } from "lucide-react"

export default function ContactPage() {
    const [copied, setCopied] = useState(false)
    const email = "hello@voidcraftr.com"

    const copyEmail = () => {
        navigator.clipboard.writeText(email)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="mx-auto max-w-5xl py-12 md:py-24 px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">

                {/* Text Content */}
                <div className="space-y-6">
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                        Contact Us
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Let's build something together.
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Have a suggestion for a new tool? Found a bug? Or just want to just say hi?
                        We are a small team of open-source enthusiasts and we'd love to hear from you.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-4">
                        <a href="https://twitter.com/voidcraftr" target="_blank" rel="noreferrer">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Twitter className="h-4 w-4" /> Twitter
                            </Button>
                        </a>
                        <a href="https://github.com/voidcraftr" target="_blank" rel="noreferrer">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Github className="h-4 w-4" /> GitHub
                            </Button>
                        </a>
                        <a href="https://linkedin.com/in/voidcraftr" target="_blank" rel="noreferrer">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Linkedin className="h-4 w-4" /> LinkedIn
                            </Button>
                        </a>
                        <a href="https://instagram.com/voidcraftr" target="_blank" rel="noreferrer">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Instagram className="h-4 w-4" /> Instagram
                            </Button>
                        </a>
                        <a href="https://facebook.com/voidcraftr" target="_blank" rel="noreferrer">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Facebook className="h-4 w-4" /> Facebook
                            </Button>
                        </a>
                    </div>
                </div>

                {/* Contact Card */}
                <div className="mx-auto w-full max-w-md">
                    <Card className="overflow-hidden border-2 border-muted bg-gradient-to-br from-background to-muted/20">
                        <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-8 ring-primary/5">
                                <Mail className="h-8 w-8 text-primary" />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-bold">Email Us Directly</h3>
                                <p className="text-sm text-muted-foreground">
                                    We usually respond within 24 hours.
                                </p>
                            </div>

                            <div className="flex w-full items-center gap-2 rounded-lg border bg-background p-2 pl-4">
                                <span className="flex-1 text-left font-mono text-sm text-muted-foreground truncate">
                                    {email}
                                </span>
                                <Button size="sm" onClick={copyEmail} className={copied ? "bg-green-600 hover:bg-green-700" : ""}>
                                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                            </div>

                            <div className="relative w-full">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or
                                    </span>
                                </div>
                            </div>

                            <a href={`mailto:${email}`} className="w-full">
                                <Button size="lg" className="w-full" variant="secondary">
                                    Open Mail App
                                </Button>
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
