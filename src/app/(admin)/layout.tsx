"use client"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../../components/ui/app-sidebar"

import "../globals.css";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ToastProvider } from "@/providers/ToastProvider";
import { getLocalData } from "@/utils/locallStorage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser: any = getLocalData("user");
    console.log("Stored User:", storedUser);

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
        <ReactQueryProvider>
          <ToastProvider>
            <SidebarProvider>
              <AppSidebar />
              <SidebarTrigger />
              {children}
            </SidebarProvider>
          </ToastProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
