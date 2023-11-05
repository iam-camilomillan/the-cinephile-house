/* Next imports */
import { headers } from "next/headers";

/* TRPC imports */
import { TRPCReactProvider } from "~/trpc/react";

/* Components imports */
import NavbarServer from "~/app/_components/navbar-server";
import FooterServer from "~/app/_components/footer-server";

/* Font imports */
import { Open_Sans } from "next/font/google";

/* Font declarations */
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

/* Styles imports */
import "~/styles/globals.css";

/* NextUI imports */
import { NextUIProviderClient } from "./providers";

/* Metadata declarations */
export const metadata = {
  title: "The Cinephile House",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark font-sans ${openSans.variable}`}>
      <body>
        <TRPCReactProvider headers={headers()}>
          <NextUIProviderClient>
            {/* Navbar */}
            <NavbarServer />

            {children}

            {/* Footer */}
            <FooterServer />
          </NextUIProviderClient>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
