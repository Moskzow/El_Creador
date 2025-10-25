import type { Metadata } from "next";
import { Inter, Lora, Montserrat, Oswald, Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Font configurations (remain the same)
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "El Creador de Menús",
  description: "Crea menús de restaurante de forma fácil y profesional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Load html2canvas and jsPDF from a CDN */}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js" strategy="beforeInteractive" />
      </head>
      <body className={`${inter.variable} ${roboto.variable} ${montserrat.variable} ${lora.variable} ${oswald.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}