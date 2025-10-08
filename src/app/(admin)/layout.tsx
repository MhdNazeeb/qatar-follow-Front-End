"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../../components/ui/app-sidebar"

import "../globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { getLocalData } from "@/utils/locallStorage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ClientLayoutWrapper from "@/layout/ClientLayoutWrapper.tsx";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();
  const [user, setUser] = useState<unknown>(null);

  useEffect(() => {
    const storedUser = getLocalData("user");
    if (!storedUser) {
      router.push("/login");
    } else {
      setUser(storedUser);
    }
  }, [router]);

  return (
    <html lang="en">
      <body
      >
        <ClientLayoutWrapper >
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}