"use client";

import { usePathname } from "next/navigation";
import Header from "./component/header.component/header";
import Footer from "./component/footer.component/footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayout = pathname === "/loginSection" || pathname === "/login";

  return (
    <>
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
