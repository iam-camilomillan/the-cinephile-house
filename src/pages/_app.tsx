import { type AppType } from "next/app";
import "~/styles/globals.css";

// Font imports
import { Inter } from "next/font/google";

// Font declarations
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/* Context providers */
import { AuthContextProvider } from "~/context/AuthContext";
import { DataContextProvider } from "~/context/DataContext";

/* Component imports */
import Navbar from "~/sections/Navbar";
import MessageCard from "~/components/MessageCard";
import Footer from "~/sections/Footer";

/* Api imports */
import { api } from "~/utils/api";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${inter.variable} font-inter overflow-hidden`}>
      {/* Context provider */}
      <AuthContextProvider>
        <DataContextProvider>
          {/* Navbar */}
          <Navbar />

          {/* Message card */}
          <MessageCard />

          {/* App */}
          <Component {...pageProps} />
        </DataContextProvider>
      </AuthContextProvider>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default api.withTRPC(MyApp);
