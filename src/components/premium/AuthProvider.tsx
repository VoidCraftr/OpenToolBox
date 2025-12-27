"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { Crown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AuthContextType {
    isPro: boolean
    togglePro: () => void
}

const AuthContext = createContext<AuthContextType>({
    isPro: false,
    togglePro: () => { },
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isPro, setIsPro] = useState(false)

    // Persist mock auth state
    useEffect(() => {
        const stored = localStorage.getItem("nexus-auth-pro")
        if (stored === "true") setIsPro(true)
    }, [])

    const togglePro = () => {
        setIsPro((prev) => {
            const newState = !prev
            localStorage.setItem("nexus-auth-pro", String(newState))
            return newState
        })
    }

    return (
        <AuthContext.Provider value={{ isPro, togglePro }}>
            {children}
            {null}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
