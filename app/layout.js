"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "./components";
import { AuthContextProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "News App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <AuthContextProvider>
          <NavBar />
          <main>{children}</main>
        </AuthContextProvider>
      </body>
    </html>
  );
}
