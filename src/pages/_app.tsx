import { type AppType } from "next/app";
import "~/styles/globals.css";

/* Context providers */
import { AuthContextProvider } from "~/context/AuthContext";
import { DataContextProvider } from "~/context/DataContext";

/* Components imports */
import Navbar from "~/sections/navbar";
import MessageCard from "~/components/MessageCard";
import Footer from "~/sections/footer";

// Font imports
import { Inter } from "next/font/google";

// Font declarations
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/* Api imports */
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${inter.variable} overflow-hidden font-inter`}>
      <AuthContextProvider>
        <DataContextProvider>
          {/* Navbar */}
          <Navbar />

          {/* Message card */}
          <MessageCard />

          {/* App */}
          <Component {...pageProps} />

          {/* Footer */}
          <Footer />
        </DataContextProvider>
      </AuthContextProvider>
    </main>
  );
};

export default api.withTRPC(MyApp);
