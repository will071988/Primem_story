import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Prime Story | Sua hist\u00f3ria merece destaque",
    template: "%s | Prime Story",
  },
  description:
    "Transformamos empresas em marcas memor\u00e1veis atrav\u00e9s de experi\u00eancias audiovisuais que geram conex\u00e3o, autoridade e resultados.",
  keywords: [
    "storymaker",
    "filmmaker",
    "produ\u00e7\u00e3o audiovisual",
    "marketing visual",
    "v\u00eddeos institucionais",
  ],
  authors: [{ name: "Prime Story" }],
  openGraph: {
    title: "Prime Story | Sua hist\u00f3ria merece destaque",
    description:
      "Transformamos empresas em marcas memor\u00e1veis atrav\u00e9s de experi\u00eancias audiovisuais.",
    type: "website",
    siteName: "Prime Story",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prime Story | Sua hist\u00f3ria merece destaque",
    description:
      "Transformamos empresas em marcas memor\u00e1veis atrav\u00e9s de experi\u00eancias audiovisuais.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} dark h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0A0A0A" />
      </head>
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-white">
        {children}
        <Toaster position="bottom-right" theme="dark" />
      </body>
    </html>
  );
}
