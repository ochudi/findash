import type { Metadata } from "next";
import "./globals.css";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { ClientOnly } from "@/components/client-only";

export const metadata: Metadata = {
  title: "Fin Dash | Financial Dashboard",
  description:
    "Fin Dash is a modern financial dashboard that allows staff to monitor both stock and cryptocurrency prices, trends, and market data in real-time. Stay informed and make smart decisions with real-time insights.",
  keywords: [
    "financial dashboard",
    "stock prices",
    "cryptocurrency",
    "market data",
    "real-time finance",
    "financial insights",
  ],
  authors: [
    {
      name: "Chukwudi Ofoma",
      url: "https://resume-chudi.vercel.app/",
    },
  ],
  openGraph: {
    title: "Fin Dash",
    description:
      "A financial dashboard that allows staff to monitor both stock and cryptocurrency prices, trends, and market data in real-time.",
    url: "https://resume-chudi.vercel.app/",
    siteName: "Fin Dash",
    images: [
      {
        url: "https://resume-chudi.vercel.app/",
        width: 1200,
        height: 630,
        alt: "Fin Dash Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fin Dash",
    description:
      "A financial dashboard that allows staff to monitor both stock and cryptocurrency prices, trends, and market data in real-time.",
    images: ["https://x.com/mrofoma/photo"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientOnly>
          <ThemeProvider attribute="class" defaultTheme="system">
            <SidebarProvider>
              <AppSidebar />
              <main className="w-screen h-screen overflow-hidden">
                <SidebarTrigger />
                {children}
                <Toaster />
              </main>
            </SidebarProvider>
          </ThemeProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
