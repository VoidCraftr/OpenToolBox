import {
    Code,
    FileImage,
    Lock,
    Type,
    QrCode,
    Scale,
    Timer,
    BoxSelect,
    Palette,
    Fingerprint,
    Keyboard,
    Database,
    RefreshCcw,
    Binary,
    Clock,
    LucideIcon
} from "lucide-react"

export type ToolCategory = "developer" | "design" | "security" | "media" | "text" | "social" | "general"

export interface ToolMetadata {
    slug: string
    name: string
    description: string
    category: ToolCategory
    icon: LucideIcon
    isNew?: boolean
    isPopular?: boolean
    isPremium?: boolean
}

export const tools: ToolMetadata[] = [
    // --- Developer Tools ---
    {
        slug: "json-formatter",
        name: "JSON Formatter",
        description: "Free Online JSON Formatter, Minifier & Validator.",
        category: "developer",
        icon: Code,
        isPopular: true,
    },
    {
        slug: "sql-formatter",
        name: "SQL Formatter",
        description: "Free Online SQL Formatter & Prettifier for developers.",
        category: "developer",
        icon: Database,
        isNew: true,
    },
    {
        slug: "jwt-decoder",
        name: "JWT Decoder",
        description: "Free Online JWT Decoder. Debug tokens securely in your browser.",
        category: "developer",
        icon: Lock,
        isNew: true,
    },
    {
        slug: "uuid-generator",
        name: "UUID Generator",
        description: "Free Bulk UUID Generator (v4). Create unique IDs instantly.",
        category: "developer",
        icon: Fingerprint,
        isNew: true,
    },
    {
        slug: "cron-generator",
        name: "Cron Generator",
        description: "Free Cron Expression Generator with next run preview.",
        category: "developer",
        icon: Clock,
        isNew: true,
    },
    {
        slug: "keycode-info",
        name: "Keycode Info",
        description: "Online Keycode Finder. Get JavaScript event key codes visually.",
        category: "developer",
        icon: Keyboard,
        isNew: true,
    },

    // --- Design Tools ---
    {
        slug: "image-converter",
        name: "Image Converter",
        description: "Free Image Converter. Convert JPG, PNG to WebP securely.",
        category: "media",
        icon: FileImage,
        isPopular: true,
    },
    {
        slug: "box-shadow-generator",
        name: "Box Shadow Generator",
        description: "Free CSS Box Shadow Generator. Visual design tool for developers.",
        category: "design",
        icon: BoxSelect,
        isNew: true,
    },
    {
        slug: "gradient-generator",
        name: "Gradient Generator",
        description: "Free CSS Gradient Generator. Create beautiful linear & radial gradients.",
        category: "design",
        icon: Palette,
        isNew: true,
    },

    // --- Security Tools ---
    {
        slug: "password-generator",
        name: "Password Generator",
        description: "Free Strong Password Generator. Create secure passwords instantly.",
        category: "security",
        icon: Lock,
        isPopular: true,
    },

    // --- Text Tools ---
    {
        slug: "word-counter",
        name: "Word Counter",
        description: "Free Online Word Counter & Character Count Tool.",
        category: "text",
        icon: Type,
    },
    {
        slug: "diff-viewer",
        name: "Diff Viewer",
        description: "Free Text Diff Viewer. Compare strings and find differences online.",
        category: "text",
        icon: RefreshCcw,
        isNew: true,
    },

    // --- General/Consumer Tools ---
    {
        slug: "qr-code-generator",
        name: "QR Code Generator",
        description: "Free QR Code Generator with Logo support. High-quality PNG download.",
        category: "general",
        icon: QrCode,
        isNew: true,
    },
    {
        slug: "unit-converter",
        name: "Unit Converter",
        description: "Free Unit Converter. Convert Length, Weight, Temperature with formulas.",
        category: "general",
        icon: Scale,
        isNew: true,
    },
    {
        slug: "stopwatch",
        name: "Stopwatch & Timer",
        description: "Free Online Stopwatch with Laps and Countdown Timer.",
        category: "general",
        icon: Timer,
        isNew: true,
    },
]

export const categories: { id: ToolCategory; label: string; icon: LucideIcon }[] = [
    { id: "developer", label: "Developer", icon: Code },
    { id: "design", label: "Design", icon: Palette },
    { id: "media", label: "Media", icon: FileImage },
    { id: "security", label: "Security", icon: Lock },
    { id: "text", label: "Text", icon: Type },
    { id: "general", label: "General", icon: RefreshCcw },
]
