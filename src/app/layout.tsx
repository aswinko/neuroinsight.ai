import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/src/lib/utils";
import { Navbar } from "@/src/components/layout/navbar";
import { ThemeProvider } from "@/src/components/layout/theme-provider";
import { FooterSection } from "../components/layout/footer";
import { auth } from "@/auth";
import {SessionProvider} from "next-auth/react"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NeuroInsight.ai - Advanced File Interaction Chatbot",
  description:
    "An advanced chatbot designed to facilitate seamless interaction with your local file system using the Retrieval-Augmented Generation (RAG) model.",
  openGraph: {
    type: "website",
    url: "",
    title: "NeuroInsight.ai - Advanced File Interaction Chatbot",
    description:
      "Enhance file system navigation and management with NeuroInsight.ai's innovative RAG model, enabling efficient search and interaction with files.",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "NeuroInsight.ai Logo",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  
  return (
    <SessionProvider session={session}>
      <html lang="pt-br" suppressHydrationWarning>
        <body className={cn("min-h-screen bg-background", inter.className)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />

            {children}
            <FooterSection />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>

  );
}
