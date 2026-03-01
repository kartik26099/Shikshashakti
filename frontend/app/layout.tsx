import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import SpeechNavigation from "@/components/speech-navigation"
import { ErrorBoundary } from "@/components/error-boundary"
import { ReactErrorHandler, setupReactErrorHandling } from "@/components/react-error-handler"
import { Toaster } from "sonner"
import Script from "next/script"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Education Platform - Transform Learning Into Action",
  description: "Bridge the gap between learning concepts and building real projects with AI-powered tools",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
        </head>
        <body className={inter.className} suppressHydrationWarning>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>

            <ErrorBoundary>
              <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
                <SpeechNavigation />
                <ReactErrorHandler />
                <Toaster position="top-right" richColors />
              </div>
            </ErrorBoundary>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
