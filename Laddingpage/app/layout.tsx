"use client";
import "./globals.css";
import { usePathname } from "next/navigation";
import NavbarWrapper from "@/src/components/NavbarWrapper";
import { Footer } from "@/src/features/footer";
import { Chatbot } from "@/src/features/chat";

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideLayoutRoutes = [
    "/invitations/view"
  ];

  const shouldHideLayout = hideLayoutRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
    <html lang="vi">
      <body className="antialiased">
      {!shouldHideLayout && <NavbarWrapper />}

      <main id="main-content">
        {children}
      </main>

      {!shouldHideLayout && <Footer />}
      {!shouldHideLayout && <Chatbot />}
      </body>
      </html>
    </>
  );
}
