import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "B-Sync — Find Blood Donors Near You",
  description: "A nationwide network connecting blood donors with those in need across India. Find donors by blood group, location, and availability. Every drop counts — save a life today.",
  keywords: "blood donor, blood donation, India, blood bank, blood request, emergency blood, donor network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-[#333333]">
        <Navbar />
        <div className="pt-16 min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
