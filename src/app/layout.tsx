/* Next imports */
import { type Metadata } from "next";

/* Providers imports */
import { Providers } from "@/app/providers";

/* Components imports */
import NavbarServer from "@/components/navbar-server";
import FooterServer from "@/components/footer-server";

/* Metadata declaration */
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

/* Styles imports */
import "@/styles/globals.css";

/* Fonts imports */
import { Inter } from "next/font/google";

/* Fonts declarations */
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.className}`}>
      <body>
        <Providers>
          {/* Navbar */}
          <NavbarServer />

          {children}

          {/* Footer */}
          <FooterServer />
        </Providers>
      </body>
    </html>
  );
}
