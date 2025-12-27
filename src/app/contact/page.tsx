import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"

export const metadata = {
    title: "Contact Us - Nexus Tools",
    description: "Get in touch with the Nexus Tools team.",
}

export default function ContactPage() {
    return (
        <div className="mx-auto max-w-2xl py-12">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl">Get in touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                    <p className="text-muted-foreground">
                        Have a suggestion, found a bug, or just want to say hi? We'd love to hear from you.
                    </p>

                    <div className="flex flex-col items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <a href="mailto:hello@voidcraftr.com">
                            <Button size="lg" className="text-lg">hello@voidcraftr.com</Button>
                        </a>
                    </div>

                    <p className="text-sm text-muted-foreground">
                        Follow us on <a href="https://twitter.com/voidcraftr" className="underline">Twitter</a> for updates.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
