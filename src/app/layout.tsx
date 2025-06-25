import type { Metadata } from "next";
import "./globals.css";
import SessionProviders from "@/providers/SessionProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { META } from "@/shared/constants/metadata";

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  openGraph: {
    title: META.title,
    description: META.description,
    images: META.ogImage,
    url: META.url,
    siteName: META.siteName,
    locale: META.locale,
    type: META.type,
  },
  verification: {
    google: META.googleVerification,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <SessionProviders>
          <ReactQueryProvider>
            <main>{children}</main>
          </ReactQueryProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
