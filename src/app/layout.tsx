import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CommandMenu } from "@/components/command-menu";

import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Nitish Kumar Bharti | Portfolio",
  description:
    "Personal portfolio of Nitish Kumar Bharti, an MCA student and developer.",
  icons: {
    icon: "/assets/logo.png",
    apple: "/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={200}>
            <div className="relative flex min-h-screen flex-col bg-green-grid">
              <SiteHeader />

              <main className="page-content w-full flex-1 px-4 pb-16 pt-20 sm:px-6 lg:px-8">
                {children}
              </main>

              <SiteFooter />

              {/* Bottom gradient */}
              <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 h-[60px] bg-gradient-to-t from-background/80 to-transparent [mask-image:linear-gradient(to_top,black_50%,transparent)]" />
              <CommandMenu />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
