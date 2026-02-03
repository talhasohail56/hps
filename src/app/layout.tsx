import type { Metadata } from "next";
import { siteConfig } from "@/lib/data/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatLauncher } from "@/components/chat/ChatLauncher";
import { PostHogProvider } from "@/components/PostHogProvider";
import { PostHogPageView } from "@/components/PostHogPageView";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Premium Pool Care in Frisco, TX`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "pool cleaning Frisco TX",
    "pool service Frisco",
    "weekly pool cleaning",
    "pool maintenance DFW",
    "Hydra Pool Services",
    "pool chemicals Frisco",
    "pool repair Frisco TX",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Premium Pool Care in Frisco, TX`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Premium Pool Care in Frisco, TX`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white font-sans text-slate">
        <PostHogProvider>
          <PostHogPageView />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ChatLauncher />
        </PostHogProvider>
      </body>
    </html>
  );
}
