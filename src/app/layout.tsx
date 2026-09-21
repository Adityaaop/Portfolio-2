import type { Metadata } from "next";
import { Black_Ops_One, Kalam, Abril_Fatface, Gloria_Hallelujah, Trocchi, Notable, Pixelify_Sans, JetBrains_Mono, Doto } from "next/font/google";
import "./globals.css";
import SpaceBackground from "@/components/SpaceBackground";
import { ToastProvider } from "@/components/ui/Toast";

const hero = Abril_Fatface({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hero",
  display: "swap",
});

const heading = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const subheading = Trocchi({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-subheading",
  display: "swap",
});

const body = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const doto = Doto({
  subsets: ["latin"],
  variable: "--font-doto",
  display: "swap",
});

const data = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-data",
  display: "swap",
});

const ui = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const accentBold = Notable({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-accent-bold",
  display: "swap",
});

const handwritten = Gloria_Hallelujah({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handwritten",
  display: "swap",
});

const kalam = Kalam({
  weight: ["400", "700"],
  subsets: ["devanagari", "latin"],
  variable: "--font-kalam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aditya Ranjan | Full Stack Developer & SOC Portfolio",
  description: "Portfolio of Aditya Ranjan, Computer Science undergraduate, Full Stack Developer, and SOC enthusiast skilled in React.js, JavaScript, Node.js, and AWS.",
  keywords: ["Aditya Ranjan", "Full Stack Developer", "SOC", "React", "JavaScript", "Next.js", "Portfolio", "IILM University"],
  authors: [{ name: "Aditya Ranjan" }],
  openGraph: {
    title: "Aditya Ranjan | Full Stack Developer & SOC Portfolio",
    description: "Portfolio of Aditya Ranjan, Computer Science undergraduate, Full Stack Developer, and SOC enthusiast skilled in React.js, JavaScript, Node.js, and AWS.",
    url: "https://aditya.dev",
    siteName: "Aditya Ranjan Portfolio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Ranjan | Full Stack Developer & SOC Portfolio",
    description: "Portfolio of Aditya Ranjan, Computer Science undergraduate, Full Stack Developer, and SOC enthusiast skilled in React.js, JavaScript, Node.js, and AWS.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hero.variable} ${heading.variable} ${subheading.variable} ${body.variable} ${data.variable} ${ui.variable} ${accentBold.variable} ${handwritten.variable} ${kalam.variable} ${doto.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-transparent text-white font-sans selection:bg-accent selection:text-black relative">
        <SpaceBackground />
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
