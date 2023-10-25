/* Next imports */
import { type Metadata } from "next";

/* Providers imports */
import { Providers } from "./providers";

/* Metadata declaration */
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

/* Styles imports */
import "./globals.css";

/* Fonts imports */
import { Open_Sans } from "next/font/google";

/* Fonts declarations */
const openSans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`light ${openSans.className}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
