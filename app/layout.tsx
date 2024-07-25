import type { Metadata } from "next"

import "@/styles/globals.css"

import { SiteConfig } from "@/config/site-config"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/providers/theme-provider"

export const metadata: Metadata = {
  title: SiteConfig.Name,
  description: SiteConfig.Description,
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: dark)",
        href: SiteConfig.favicon.dark,
        url: SiteConfig.favicon.dark,
      },
      {
        media: "(prefers-color-scheme: light)",
        href: SiteConfig.favicon.light,
        url: SiteConfig.favicon.light,
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
