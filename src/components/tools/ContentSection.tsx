import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface FaqItem {
    question: string
    answer: string
}

interface ContentSectionProps {
    title: string
    description?: string
    features?: string[]
    faq?: FaqItem[]
}

export function ContentSection({ title, description, features, faq }: ContentSectionProps) {
    return (
        <div className="mt-16 space-y-12 max-w-4xl mx-auto">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                {description && (
                    <div className="text-muted-foreground leading-7 text-lg space-y-4">
                        {description.split('\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>
                )}
            </div>

            {features && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Key Features</h3>
                    <ul className="grid gap-2 sm:grid-cols-2">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-muted-foreground">
                                <div className="h-2 w-2 rounded-full bg-primary" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {faq && faq.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
                    <Accordion type="single" collapsible className="w-full">
                        {faq.map((item, i) => (
                            <AccordionItem key={i} value={`item-${i}`}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            )}
        </div>
    )
}
