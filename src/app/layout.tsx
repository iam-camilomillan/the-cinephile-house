/* Next imports */
import { cookies } from "next/headers";

/* TRPC imports */
import { TRPCReactProvider } from "~/trpc/react";

/* Components imports */
import NavbarServer from "~/app/_components/navbar-server";
import FooterServer from "~/app/_components/footer-server";

/* NextUI imports */
import { NextUIProviderClient } from "~/app/providers";

/* Styles imports */
import "~/styles/globals.css";

/* Font imports */
import { Open_Sans } from "next/font/google";

/* Font declarations */
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
    <html lang="en" className={`font-sans ${openSans.variable}`}>
      <body>
        <TRPCReactProvider cookies={cookies().toString()}>
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
