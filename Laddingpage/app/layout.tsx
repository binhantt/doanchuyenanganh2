import type { Metadata } from "next";
import "./globals.css";
import NavbarWrapper from "@/src/components/NavbarWrapper";
import { Footer } from "@/src/features/footer";
import { Chatbot } from "@/src/features/chat";

export const metadata: Metadata = {
  title: "Wedding Studio - Dịch vụ tổ chức tiệc cưới chuyên nghiệp",
  description: "Tổ chức tiệc cưới trọn gói với dịch vụ chuyên nghiệp, trang trí đẹp, giá cả hợp lý. Liên hệ ngay để được tư vấn miễn phí!",
  keywords: "tiệc cưới, tổ chức tiệc cưới, wedding planner, trang trí tiệc cưới, chụp ảnh cưới",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="antialiased">
        <NavbarWrapper />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
