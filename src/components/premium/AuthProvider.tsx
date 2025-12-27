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
            <div className="fixed bottom-4 right-4 z-50">
                <Button
                    onClick={togglePro}
                    variant={isPro ? "default" : "secondary"}
                    className="shadow-lg"
                >
                    {isPro ? "Simulate Free User" : "Simulate Pro User"}
                    {isPro && <Crown className="ml-2 h-4 w-4 text-yellow-300" />}
                </Button>
            </div>
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
