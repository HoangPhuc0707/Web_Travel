import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | PTX Travel - Phú Thọ Xanh Tourist',
    default: 'PTX Travel - Phú Thọ Xanh Tourist | Đặt Tour Du Lịch Uy Tín',
  },
  description: "Công ty du lịch uy tín hàng đầu tại Phú Thọ. Chuyên cung cấp tour du lịch trong nước và quốc tế với dịch vụ chuyên nghiệp, giá cạnh tranh.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="h-full bg-slate-50 font-body text-slate-900">
        {children}
      </body>
    </html>
  );
}
