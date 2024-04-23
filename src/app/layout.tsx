import type { Metadata } from "next";
import { Inter, Kantumruy_Pro, Poppins } from "next/font/google";
import "./globals.css";
import NextUILayout from "./NextUIProvider";
import NavbarComponent from "@/components/layouts/navbar/NavbarComponent";
import { Suspense } from "react";
import LoadingComponent from "./loading";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";
import StyledJsxRegistry from "./registry";
import SessionWrapper from "./SessionWrapper";

export const metadata: Metadata = {
  title: {
    template: "%s - Sparkle",
    default: "Sparkle - Your Destination for Fashion",
  },
  description: "Discover the latest trends in fashion at Sparkle. From chic dresses to stylish accessories, find everything you need to elevate your wardrobe.",
  keywords: ["Sparkle", "clothing", "fashion", "apparel", "style", "trend", "shop", "ecommerce", "sell"],
  openGraph: {
    title: {
      template: "%s - Sparkle",
      default: "Sparkle",
    },
    description: "Discover the latest trends in fashion at Sparkle. From chic dresses to stylish accessories, find everything you need to elevate your wardrobe.",
    images: [
      "https://i.pinimg.com/564x/22/05/06/220506e55b35f626c9bc28f42e3609df.jpg",
    ],
  },
};


const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  style: ["italic", "normal"],
  variable: "--font-poppins",
});

const kantumruy_pro = Kantumruy_Pro({
  subsets: ["khmer"],
  display: "swap",
  variable: "--font-kantumruy-pro",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={`${poppins.variable} ${kantumruy_pro.variable}`}>
          <NextUILayout>
            <StyledJsxRegistry>
              <NavbarComponent />
              <Suspense fallback={<LoadingComponent />}>
                <ErrorBoundary errorComponent={Error}>{children}</ErrorBoundary>
              </Suspense>
            </StyledJsxRegistry>
          </NextUILayout>
        </body>
      </html>
    </SessionWrapper>
  );
}
