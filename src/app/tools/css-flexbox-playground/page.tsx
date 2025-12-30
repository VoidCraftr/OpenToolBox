import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Metadata } from "next"
import { FlexboxPlayground } from "./components/FlexboxPlayground"

export const metadata: Metadata = {
    title: "CSS Flexbox Playground | Visual Generator | OpenToolBox",
    description: "Learn and generate CSS Flexbox layouts visually. Interactive playground for aligning items, setting gaps, and understanding flex properties.",
    keywords: ["css flexbox", "flexbox generator", "css playground", "flexbox cheat sheet", "css layout tool"],
}

export default function FlexboxPlaygroundPage() {
    return (
        <ToolWrapper
            title="CSS Flexbox Playground"
            description="Visually build CSS layouts and generate the code instantly."
            toolSlug="css-flexbox-playground"
        >
            <FlexboxPlayground />

            <div className="mt-12 space-y-8 text-muted-foreground">
                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">Mastering Flexbox</h2>
                    <p className="mb-4">
                        Flexible Box Layout (Flexbox) is a CSS layout module that makes it easier to design flexible responsive layout structure without using float or positioning.
                    </p>
                </section>
            </div>
        </ToolWrapper>
    )
}
