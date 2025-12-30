import { ToolWrapper } from "@/components/tools/ToolWrapper"
import { Metadata } from "next"
import { MarkdownEditor } from "./components/MarkdownEditor"

export const metadata: Metadata = {
    title: "Free Online Markdown Editor & Viewer | Live Preview | OpenToolBox",
    description: "Write and preview Markdown in real-time. A clean, split-pane editor for developers and writers to draft READMES, docs, and notes.",
    keywords: ["markdown editor", "markdown viewer", "online markdown preview", "readme generator", "md editor"],
}

export default function MarkdownEditorPage() {
    return (
        <ToolWrapper
            title="Markdown Editor"
            description="A clean, real-time Markdown editor with split-pane preview."
            toolSlug="markdown-editor"
        >
            <MarkdownEditor />

            <div className="mt-12 space-y-8 text-muted-foreground">
                <section>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">About Markdown</h2>
                    <p>
                        Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.
                        Created by John Gruber in 2004, Markdown is now one of the world’s most popular markup languages.
                    </p>
                </section>
            </div>
        </ToolWrapper>
    )
}
